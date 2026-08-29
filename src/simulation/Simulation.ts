import type {
  GenerationListener,
  SimulationClock,
  SimulationOptions,
  SimulationSnapshot,
  SimulationStatus,
  SimulationTick,
  StatusListener,
  TickListener,
} from "./types";

const DEFAULT_TICK_RATE = 60;
const DEFAULT_MAX_SUB_STEPS = 5;

function browserClock(): SimulationClock {
  return {
    now: () =>
      typeof performance !== "undefined" ? performance.now() : Date.now(),
    schedule: (callback) =>
      typeof requestAnimationFrame !== "undefined"
        ? requestAnimationFrame(callback)
        : 0,
    cancel: (handle) => {
      if (typeof cancelAnimationFrame !== "undefined") {
        cancelAnimationFrame(handle);
      }
    },
  };
}

/**
 * Session controller for the simulation core.
 *
 * Robot Data Model → **Simulation** → Simulation State → Three.js Renderer
 *
 * This class owns time and lifecycle only. It does not read parts, run physics,
 * or touch Three.js. Later layers subscribe to ticks and write Simulation State.
 */
export class Simulation {
  private readonly tickRate: number;
  private readonly dt: number;
  private readonly maxSubSteps: number;
  private readonly clock: SimulationClock;

  private status: SimulationStatus = "idle";
  private step = 0;
  private elapsed = 0;
  private accumulator = 0;
  private lastNow = 0;
  private frameHandle: number | null = null;
  private generation = 0;

  private readonly tickListeners = new Set<TickListener>();
  private readonly statusListeners = new Set<StatusListener>();
  private readonly generationListeners = new Set<GenerationListener>();

  constructor(options: SimulationOptions = {}) {
    this.tickRate = options.tickRate ?? DEFAULT_TICK_RATE;
    this.dt = 1 / this.tickRate;
    this.maxSubSteps = options.maxSubSteps ?? DEFAULT_MAX_SUB_STEPS;
    this.clock = options.clock ?? browserClock();
  }

  getStatus(): SimulationStatus {
    return this.status;
  }

  isRunning(): boolean {
    return this.status === "running";
  }

  getSnapshot(): SimulationSnapshot {
    return {
      status: this.status,
      step: this.step,
      elapsed: this.elapsed,
      tickRate: this.tickRate,
      generation: this.generation,
    };
  }

  getGeneration(): number {
    return this.generation;
  }

  /**
   * Begin a new session from t = 0.
   * If already paused, resumes instead of resetting.
   */
  start(): void {
    if (this.status === "running") return;
    if (this.status === "paused") {
      this.resume();
      return;
    }

    this.bumpGeneration();
    this.resetTime();
    this.setStatus("running");
    this.beginLoop();
  }

  pause(): void {
    if (this.status !== "running") return;
    this.stopLoop();
    this.setStatus("paused");
  }

  resume(): void {
    if (this.status !== "paused") return;
    this.setStatus("running");
    this.beginLoop();
  }

  /**
   * End the session. Time stays at the last tick so UI can show a final snapshot.
   * Call start() to open a fresh session.
   */
  stop(): void {
    if (this.status === "idle" || this.status === "stopped") {
      this.stopLoop();
      return;
    }
    this.stopLoop();
    this.setStatus("stopped");
  }

  /**
   * Return to t = 0 without starting the loop.
   */
  reset(): void {
    this.stopLoop();
    this.bumpGeneration();
    this.resetTime();
    this.setStatus("idle");
  }

  /**
   * Advance exactly one fixed timestep while paused (or idle).
   * Useful for debugging before a full renderer exists.
   */
  stepOnce(): SimulationTick | null {
    if (this.status === "running") return null;
    if (this.status === "idle" || this.status === "stopped") {
      this.setStatus("paused");
    }
    return this.emitTick();
  }

  onTick(listener: TickListener): () => void {
    this.tickListeners.add(listener);
    return () => {
      this.tickListeners.delete(listener);
    };
  }

  onStatusChange(listener: StatusListener): () => void {
    this.statusListeners.add(listener);
    return () => {
      this.statusListeners.delete(listener);
    };
  }

  onGenerationChange(listener: GenerationListener): () => void {
    this.generationListeners.add(listener);
    return () => {
      this.generationListeners.delete(listener);
    };
  }

  dispose(): void {
    this.stopLoop();
    this.tickListeners.clear();
    this.statusListeners.clear();
    this.generationListeners.clear();
    this.status = "idle";
  }

  private bumpGeneration(): void {
    this.generation += 1;
    for (const listener of this.generationListeners) {
      listener(this.generation);
    }
  }

  private resetTime(): void {
    this.step = 0;
    this.elapsed = 0;
    this.accumulator = 0;
    this.lastNow = this.clock.now();
  }

  private beginLoop(): void {
    this.stopLoop();
    this.lastNow = this.clock.now();
    this.accumulator = 0;
    this.frameHandle = this.clock.schedule(this.onAnimationFrame);
  }

  private stopLoop(): void {
    if (this.frameHandle !== null) {
      this.clock.cancel(this.frameHandle);
      this.frameHandle = null;
    }
  }

  private onAnimationFrame = (): void => {
    this.frameHandle = this.clock.schedule(this.onAnimationFrame);
    if (this.status !== "running") return;

    const now = this.clock.now();
    const frameDelta = Math.min((now - this.lastNow) / 1000, 0.25);
    this.lastNow = now;
    this.accumulator += frameDelta;

    let subSteps = 0;
    while (this.accumulator >= this.dt && subSteps < this.maxSubSteps) {
      this.emitTick();
      this.accumulator -= this.dt;
      subSteps += 1;
    }

    if (subSteps === this.maxSubSteps) {
      this.accumulator = 0;
    }
  };

  private emitTick(): SimulationTick {
    const tick: SimulationTick = {
      step: this.step,
      elapsed: this.elapsed,
      dt: this.dt,
    };
    this.step += 1;
    this.elapsed += this.dt;

    for (const listener of this.tickListeners) {
      listener(tick);
    }
    return tick;
  }

  private setStatus(status: SimulationStatus): void {
    if (this.status === status) return;
    this.status = status;
    for (const listener of this.statusListeners) {
      listener(status);
    }
  }
}

let session: Simulation | null = null;

/** One shared session for the builder. Renderer and physics will share this. */
export function getSimulation(): Simulation {
  if (!session) {
    session = new Simulation();
  }
  return session;
}

export function resetSimulationSingleton(): void {
  session?.dispose();
  session = null;
}
