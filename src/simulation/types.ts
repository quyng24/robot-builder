export type SimulationStatus = "idle" | "running" | "paused" | "stopped";

/**
 * One logic/physics step emitted by Simulation.
 * The next layer (Simulation State) will apply this to the robot model.
 * The renderer must not own this clock.
 */
export interface SimulationTick {
  /** Sequential step index, starting at 0 for each session. */
  step: number;
  /** Seconds since the session started (paused time excluded). */
  elapsed: number;
  /** Fixed timestep in seconds (1 / tickRate). */
  dt: number;
}

export interface SimulationSnapshot {
  status: SimulationStatus;
  step: number;
  elapsed: number;
  tickRate: number;
  generation: number;
}

export type TickListener = (tick: SimulationTick) => void;
export type StatusListener = (status: SimulationStatus) => void;
export type GenerationListener = (generation: number) => void;

export interface SimulationClock {
  now: () => number;
  schedule: (callback: FrameRequestCallback) => number;
  cancel: (handle: number) => void;
}

export interface SimulationOptions {
  /** Logic ticks per second. Default 60. */
  tickRate?: number;
  /**
   * Cap on how many logic steps run in one animation frame.
   * Prevents a spiral of death after a long tab-background pause.
   */
  maxSubSteps?: number;
  clock?: SimulationClock;
}
