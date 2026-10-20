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
  const selectPart = useRobotStore((state) => state.selectPart);
  const generation = useSimulationGeneration();

  const chassis = parts.find((p) => p.type === "chassis");
  const wheels = parts.filter((p) => p.type === "wheel");
  const walls = parts.filter((p) => p.type === "wall");
  const sensors = parts.filter((p) => p.type === "sensor");
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
          {sensors.map((sensor) => (
            <Sensor3D
              key={`${sensor.id}-${mode}-${generation}`}
              part={sensor}
              chassis={chassis}
              chassisRef={chassisRef}
            />
          ))}
        </Chassis3D>
      )}

      {/* Render unattached sensors if there is no chassis (build mode) */}
      {!chassis &&
        sensors.map((sensor) => (
          <mesh
            key={`${sensor.id}-${mode}-${generation}`}
            position={sensor.position}
            rotation={sensor.rotation}
            onClick={(e) => {
              e.stopPropagation();
              if (mode === "build") selectPart(sensor.id);
            }}
          >
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color={sensor.properties.color || "#94a3b8"}
            />
            <mesh
              position={[0, 0, (Number(sensor.properties.range) || 5) / 2]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry
                args={[0.02, 0.02, Number(sensor.properties.range) || 5]}
              />
              <meshBasicMaterial color="#10b981" transparent opacity={0.5} />
            </mesh>
          </mesh>
        ))}

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
