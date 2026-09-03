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
  distance: number | null;
  blocked: boolean;
}

export interface ControllerInput {
  linear: number;
  angular: number;
  manualBrake: boolean;
}

export interface MotorCommand {
  id: string;
  targetSpeed: number;
  appliedSpeed: number;
  enabled: boolean;
  actualSpeed?: number;
  actualTorque?: number;
}

export interface SimulationWorldSnapshot {
  tick: SimulationTick | null;
  autoBraking: boolean;
  controllerInput: ControllerInput;
  bodies: Record<string, BodyState>;
  sensors: Record<string, SensorReading>;
  motors: Record<string, MotorCommand>;
}

export type WorldListener = (snapshot: SimulationWorldSnapshot) => void;
