"use client";

import { useRapier } from "@react-three/rapier";
import { useEffect } from "react";
import { getSimulation } from "../Simulation";
import { getSimulationState } from "../state/SimulationState";

/**
 * Simulation owns the fixed clock. Rapier stays paused and is advanced exactly
 * once for each emitted tick, then the completed world snapshot is published.
 */
export default function SimulationStepper() {
  const { step } = useRapier();

  useEffect(() => {
    return getSimulation().onTick((tick) => {
      const simulationState = getSimulationState();
      simulationState.applyTick(tick);
      step(tick.dt);
      simulationState.completeTick(tick);
    });
  }, [step]);

  return null;
}
