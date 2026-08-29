import type { PartType, Vector3D } from "@/types/robot";
import type { SimulationTick } from "../types";

export interface BodyState {
  id: string;
  type: PartType;
  position: Vector3D;
  rotation: Vector3D;
  linearVelocity: Vector3D;
  angularVelocity: Vector3D;
}

export interface SensorReading {
  id: string;
  range: number;
  /** Hit distance in meters, or null when the ray misses. */
  distance: number | null;
  blocked: boolean;
}

export interface MotorCommand {
  id: string;
  /** Requested angular speed from the controller. */
  targetSpeed: number;
  /** Speed actually applied after sensor/motor safety checks. */
  appliedSpeed: number;
  enabled: boolean;
}

export interface SimulationWorldSnapshot {
  tick: SimulationTick | null;
  robotBlocked: boolean;
  bodies: Record<string, BodyState>;
  sensors: Record<string, SensorReading>;
  motors: Record<string, MotorCommand>;
}

export type WorldListener = (snapshot: SimulationWorldSnapshot) => void;
