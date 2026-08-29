import type { RobotPart } from "@/types/robot";
import { getSimulation } from "./Simulation";
import { getSimulationState } from "./state/SimulationState";

let wired = false;

/** Attach Simulation ticks to Simulation State once per app lifetime. */
export function ensureSimulationStateWired(): void {
  if (wired) return;
  wired = true;
  getSimulation().onTick((tick) => {
    getSimulationState().applyTick(tick);
  });
}

export function beginSimulationSession(parts: RobotPart[]): void {
  ensureSimulationStateWired();
  getSimulationState().hydrate(parts);
  getSimulation().start();
}

export function resumeSimulationSession(): void {
  ensureSimulationStateWired();
  getSimulation().resume();
}

export function pauseSimulationSession(): void {
  getSimulation().pause();
}

export function stopSimulationSession(): void {
  getSimulation().stop();
}

export function resetSimulationSession(parts: RobotPart[]): void {
  ensureSimulationStateWired();
  getSimulation().reset();
  getSimulationState().hydrate(parts);
}

export function stepSimulationSession(): void {
  ensureSimulationStateWired();
  getSimulation().stepOnce();
}

export function leaveSimulationSession(): void {
  getSimulation().reset();
  getSimulationState().clear();
}
