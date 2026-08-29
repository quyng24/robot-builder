"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import { useRobotStore } from "@/store/useRobotStore";
import SimulationStepper from "@/simulation/bridge/SimulationStepper";
import { Suspense } from "react";
import { interactionGroups, Physics, RigidBody } from "@react-three/rapier";
import RobotAssembly from "./RobotAssembly";
import EditorGizmo from "./EditorGizmo";

export default function Scene3D() {
  const { parts, selectPart } = useRobotStore();

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        onPointerMissed={() => selectPart(null)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
          <Environment preset="city" />

          <Physics paused>
            <SimulationStepper />
            <RigidBody
              type="fixed"
              position={[0, -0.05, 0]}
              collisionGroups={interactionGroups(0, [1, 2])}
            >
              <mesh receiveShadow>
                <boxGeometry args={[50, 0.1, 50]} />
                <meshStandardMaterial
                  color="#0f172a"
                  opacity={0.5}
                  transparent
                />
              </mesh>
            </RigidBody>

            <RobotAssembly parts={parts} />
          </Physics>

          <EditorGizmo />

          <Grid
            infiniteGrid
            fadeDistance={30}
            sectionColor="#475569"
            cellColor="#1e293b"
            position={[0, 0, 0]}
          />
          <OrbitControls makeDefault />
        </Suspense>
      </Canvas>
    </div>
  );
}
