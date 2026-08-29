"use client";

import { useEffect, useState } from "react";
import { getSimulation } from "./Simulation";
import { getSimulationState } from "./state/SimulationState";
import { ensureSimulationStateWired } from "./session";
import type { SimulationSnapshot, SimulationStatus } from "./types";
import type { SimulationWorldSnapshot } from "./state/types";

export function useSimulationStatus(): SimulationStatus {
  const [status, setStatus] = useState<SimulationStatus>(() =>
    getSimulation().getStatus(),
  );

  useEffect(() => {
    return getSimulation().onStatusChange(setStatus);
  }, []);

  return status;
}

export function useSimulationGeneration(): number {
  const [generation, setGeneration] = useState(() =>
    getSimulation().getGeneration(),
  );

  useEffect(() => {
    return getSimulation().onGenerationChange(setGeneration);
  }, []);

  return generation;
}

export function useSimulationSnapshot(): SimulationSnapshot {
  const [snapshot, setSnapshot] = useState<SimulationSnapshot>(() =>
    getSimulation().getSnapshot(),
  );

  useEffect(() => {
    const sim = getSimulation();
    const sync = () => setSnapshot(sim.getSnapshot());
    const unsubStatus = sim.onStatusChange(sync);
    const unsubTick = sim.onTick(sync);
    const unsubGen = sim.onGenerationChange(sync);
    return () => {
      unsubStatus();
      unsubTick();
      unsubGen();
    };
  }, []);

  return snapshot;
}

/** Receives the completed, atomic world snapshot for every simulation tick. */
export function useSimulationWorld(): SimulationWorldSnapshot {
  const [world, setWorld] = useState<SimulationWorldSnapshot>(() =>
    getSimulationState().getSnapshot(),
  );

  useEffect(() => {
    ensureSimulationStateWired();
    const simulationState = getSimulationState();
    const sync = (snapshot: SimulationWorldSnapshot) => setWorld(snapshot);
    sync(simulationState.getSnapshot());
    const unsubscribe = simulationState.onChange(sync);
    return () => {
      unsubscribe();
    };
  }, []);

  return world;
}
