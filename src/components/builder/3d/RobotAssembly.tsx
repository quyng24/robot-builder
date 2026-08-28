"use client";

import { useRef } from "react";
import { RapierRigidBody } from "@react-three/rapier";
import { RobotPart } from "@/types/robot";
import Box3D from "./parts/Box3D";
import Chassis3D from "./parts/Chassis3D";
import Sensor3D from "./parts/Sensor3D";
import SimulatedWheel3D from "./SimulatedWheel3D";
import Wheel3D from "./parts/Wheel3D";
import { useRobotStore } from "@/store/useRobotStore";

export default function RobotAssembly({ parts }: { parts: RobotPart[] }) {
  const chassisRef = useRef<RapierRigidBody>(null!);
  const mode = useRobotStore((state) => state.mode);

  const chassis = parts.find((p) => p.type === "chassis");
  const wheels = parts.filter((p) => p.type === "wheel");
  const walls = parts.filter((p) => p.type === "wall");
  const sensor = parts.find((p) => p.type === "sensor");
  const staticParts = parts.filter(
    (p) => !["chassis", "wheel", "wall", "sensor"].includes(p.type),
  );
  return (
    <>
      {walls.map((wall) => {
        <Box3D key={`${wall.id}-${mode}`} part={wall} />;
      })}

      {chassis && (
        <Chassis3D
          key={`${chassis.id}-${mode}`}
          part={chassis}
          ref={chassisRef}
        >
          {sensor && <Sensor3D part={sensor} chassis={chassis} />}

          {staticParts.map((part) => (
            <mesh
              key={part.id}
              position={part.position}
              rotation={part.rotation as any}
            >
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial color="#94a3b8" />
            </mesh>
          ))}
        </Chassis3D>
      )}

      {wheels.map((wheel) => {
        if (mode === "build" || !chassis)
          return <Wheel3D key={wheel.id} part={wheel} />;
        return (
          <SimulatedWheel3D
            key={wheel.id}
            part={wheel}
            chassis={chassis}
            chassisRef={chassisRef}
          />
        );
      })}
    </>
  );
}
