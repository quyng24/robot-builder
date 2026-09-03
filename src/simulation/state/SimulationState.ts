import type { RobotPart, Vector3D } from "@/types/robot";
import type { SimulationTick } from "../types";
import type {
  BodyState,
  ControllerInput,
  MotorCommand,
  SensorReading,
  SimulationWorldSnapshot,
  WorldListener,
} from "./types";

const ZERO: Vector3D = [0, 0, 0];

function cloneVec(v: Vector3D): Vector3D {
  return [v[0], v[1], v[2]];
}

/**
 * Snapshot of the simulated world after each Simulation tick.
 *
 * Robot Data Model → Simulation → **Simulation State** → Three.js Renderer
 *
 * Physics adapters write poses and sensor hits here. The renderer (later)
 * should read this object instead of Rapier or Zustand.
 */
export class SimulationState {
  private tick: SimulationTick | null = null;
  private autoBraking = false;
  private controllerInput: ControllerInput = {
    linear: 0,
    angular: 0,
    manualBrake: false,
  }
  private readonly bodies = new Map<string, BodyState>();
  private readonly sensors = new Map<string, SensorReading>();
  private readonly motors = new Map<string, MotorCommand>();
  private readonly listeners = new Set<WorldListener>();

  hydrate(parts: RobotPart[]): void {
    this.bodies.clear();
    this.sensors.clear();
    this.motors.clear();
    this.autoBraking = false;
    this.controllerInput = {linear: 0, angular: 0, manualBrake: false};
    this.tick = { step: 0, elapsed: 0, dt: 0 };

    for (const part of parts) {
      this.bodies.set(part.id, {
        id: part.id,
        type: part.type,
        position: cloneVec(part.position),
        rotation: cloneVec(part.rotation),
        linearVelocity: cloneVec(ZERO),
        angularVelocity: cloneVec(ZERO),
      });

      if (part.type === "sensor") {
        this.sensors.set(part.id, {
          id: part.id,
          range: Number(part.properties?.range) || 5,
          distance: null,
          blocked: false,
        });
      }

      if (part.type === "wheel") {
        this.motors.set(part.id, {
          id: part.id,
          targetSpeed: 0,
          appliedSpeed: 0,
          enabled: part.motorConfig?.driveSide !== "none",
        });
      }
    }

    this.notify();
  }

  applyTick(tick: SimulationTick): void {
    this.tick = { ...tick };
  }

  /**
   * Publishes one coherent world snapshot after Rapier completed this tick.
   * Body, sensor, and motor adapters stage their values before this method.
   */
  completeTick(tick: SimulationTick): void {
    this.tick = { ...tick };
    this.notify();
  }

  upsertBody(body: BodyState): void {
    this.bodies.set(body.id, {
      ...body,
      position: cloneVec(body.position),
      rotation: cloneVec(body.rotation),
      linearVelocity: cloneVec(body.linearVelocity),
      angularVelocity: cloneVec(body.angularVelocity),
    });
  }

  upsertSensor(reading: SensorReading): void {
    this.sensors.set(reading.id, { ...reading });
  }

  upsertMotor(command: MotorCommand): void {
    this.motors.set(command.id, { ...command });
  }

  setControllerInput(input: Partial<ControllerInput>): void {
    this.controllerInput = {...this.controllerInput, ...input};
  }

  getControllerInput(): ControllerInput {
    return { ...this.controllerInput };
  }
  
  setRobotBlocked(blocked: boolean): void {
    this.autoBraking = blocked;
  }

  getBody(id: string): BodyState | undefined {
    return this.bodies.get(id);
  }

  getSensor(id: string): SensorReading | undefined {
    return this.sensors.get(id);
  }

  getMotor(id: string): MotorCommand | undefined {
    return this.motors.get(id);
  }

  isRobotBlocked(): boolean {
    return this.autoBraking;
  }

  getSnapshot(): SimulationWorldSnapshot {
    const bodies: Record<string, BodyState> = {};
    const sensors: Record<string, SensorReading> = {};
    const motors: Record<string, MotorCommand> = {};

    for (const [id, body] of this.bodies) {
      bodies[id] = {
        ...body,
        position: cloneVec(body.position),
        rotation: cloneVec(body.rotation),
        linearVelocity: cloneVec(body.linearVelocity),
        angularVelocity: cloneVec(body.angularVelocity),
      };
    }
    for (const [id, sensor] of this.sensors) {
      sensors[id] = { ...sensor };
    }
    for (const [id, motor] of this.motors) {
      motors[id] = { ...motor };
    }

    return {
      tick: this.tick ? { ...this.tick } : null,
      autoBraking: this.autoBraking,
      controllerInput: {...this.controllerInput},
      bodies,
      sensors,
      motors,
    };
  }

  onChange(listener: WorldListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  clear(): void {
    this.tick = null;
    this.autoBraking = false;
    this.controllerInput = { linear: 0, angular: 0, manualBrake: false};
    this.bodies.clear();
    this.sensors.clear();
    this.motors.clear();
    this.notify();
  }

  private notify(): void {
    if (this.listeners.size === 0) return;
    const snapshot = this.getSnapshot();
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }
}

let world: SimulationState | null = null;

export function getSimulationState(): SimulationState {
  if (!world) {
    world = new SimulationState();
  }
  return world;
}

export function resetSimulationStateSingleton(): void {
  world?.clear();
  world = null;
}
