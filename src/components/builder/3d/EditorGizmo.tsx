// src/components/builder/3d/EditorGizmo.tsx
"use client";

import { TransformControls } from "@react-three/drei";
import { useRobotStore } from "@/store/useRobotStore";

export default function EditorGizmo() {
  const { selectedPartId, parts, updateTransform, transformMode, mode } =
    useRobotStore();
  const selectedPart = parts.find((p) => p.id === selectedPartId);

  if (mode !== "build" || !selectedPart) return null;

  return (
    <TransformControls
      mode={transformMode}
      position={selectedPart.position}
      rotation={selectedPart.rotation as [number, number, number]}
      onObjectChange={(e) => {
        const target = (e as any)?.target;
        if (target && target.object) {
          const { position, rotation } = target.object;

          updateTransform(selectedPart.id, {
            position: [position.x, position.y, position.z],
            rotation: [rotation.x, rotation.y, rotation.z],
          });
        }
      }}
    >
      <group />
    </TransformControls>
  );
}
