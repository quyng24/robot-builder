"use client";

import { useRef } from "react";
import { RapierRigidBody } from "@react-three/rapier";
import { RobotPart } from "@/types/robot";
import Box3D from "./parts/Box3D";
import Chassis3D from "./parts/Chassis3D";
import Sensor3D from "./parts/Sensor3D";
import SimulatedWheel3D from "./SimulatedWheel3D";
import Wheel3D from "./parts/Wheel3D";
import { useSimulationGeneration } from "@/simulation";
import { useRobotStore } from "@/store/useRobotStore";

export default function RobotAssembly({ parts }: { parts: RobotPart[] }) {
  const chassisRef = useRef<RapierRigidBody>(null!);
  const mode = useRobotStore((state) => state.mode);
  const generation = useSimulationGeneration();

  const chassis = parts.find((p) => p.type === "chassis");
  const wheels = parts.filter((p) => p.type === "wheel");
  const walls = parts.filter((p) => p.type === "wall");
  const sensor = parts.find((p) => p.type === "sensor");
  const staticParts = parts.filter(
    (p) => !["chassis", "wheel", "wall", "sensor"].includes(p.type),
  );
  return (
    <>
      {walls.map((wall) => (
        <Box3D key={`${wall.id}-${mode}-${generation}`} part={wall} />
      ))}

      {staticParts.map((part) => (
        <Box3D key={`${part.id}-${mode}-${generation}`} part={part} />
      ))}

      {chassis && (
        <Chassis3D
          key={`${chassis.id}-${mode}-${generation}`}
          part={chassis}
          ref={chassisRef}
        >
          {sensor && (
            <Sensor3D
              part={sensor}
              chassis={chassis}
              chassisRef={chassisRef}
            />
          )}
        </Chassis3D>
      )}

      {wheels.map((wheel) => {
        if (mode === "build" || !chassis)
          return <Wheel3D key={`${wheel.id}-${generation}`} part={wheel} />;
        return (
          <SimulatedWheel3D
            key={`${wheel.id}-${generation}`}
            part={wheel}
            chassis={chassis}
            chassisRef={chassisRef}
          />
        );
      })}
    </>
  );
}
