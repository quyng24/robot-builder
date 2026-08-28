"use client";

import { useRef } from "react";
import * as THREE from "three";
import { TransformControls } from "@react-three/drei";
import { useRobotStore } from "@/store/useRobotStore";
import { RobotPart } from "@/types/robot";

export default function RobotPart3D({ part }: { part: RobotPart }) {
  const groupRef = useRef<THREE.Group>(null);
  const { transformMode, selectedPartId, selectPart, updateTransform } =
    useRobotStore();

  const isSelected = selectedPartId === part.id;

  const renderGeometry = () => {
    switch (part.type) {
      case "chassis":
        return <boxGeometry args={[2, 0.5, 4]} />;
      case "wheel":
        return <cylinderGeometry args={[0.5, 0.5, 0.5, 32]} />;
      case "sensor":
        return <sphereGeometry args={[0.3, 16, 16]} />;
      case "wall":
        return <boxGeometry args={[10, 3, 1]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  const getColor = () => {
    switch (part.type) {
      case "chassis":
        return "#3b82f6"; // Blue
      case "wheel":
        return "#fbbf24"; // Yellow
      case "sensor":
        return "#f43f5e"; // Rose
      case "wall":
        return "#ef4444"; // Red
      default:
        return "#cccccc"; // Neutral Gray
    }
  };

  return (
    <>
      <group
        ref={groupRef}
        position={part.position}
        rotation={part.rotation}
        onClick={(e) => {
          e.stopPropagation();
          selectPart(part.id);
        }}
      >
        {part.type === "wheel" ? (
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.5, 0.5, 0.5, 32]} />
            <meshStandardMaterial color={getColor()} />
            {isSelected && (
              <meshBasicMaterial
                color="#ffffff"
                wireframe
                opacity={0.5}
                transparent
              />
            )}
          </mesh>
        ) : (
          <mesh>
            {renderGeometry()}
            <meshStandardMaterial color={getColor()} />
            {isSelected && (
              <meshBasicMaterial
                color="#ffffff"
                wireframe
                opacity={0.5}
                transparent
              />
            )}
          </mesh>
        )}
      </group>

      {isSelected && (
        <TransformControls
          object={groupRef as React.RefObject<THREE.Object3D>}
          mode={transformMode}
          onMouseUp={() => {
            // TransformControls moves the group, so persist the group's transform.
            // Reading from an unattached mesh ref left the store at its original values,
            // which made parts jump back when the simulation scene remounted.
            if (groupRef.current) {
              if (transformMode === "translate") {
                const { x, y, z } = groupRef.current.position;
                updateTransform(part.id, {
                  position: [
                    parseFloat(x.toFixed(2)),
                    parseFloat(y.toFixed(2)),
                    parseFloat(z.toFixed(2)),
                  ],
                });
              } else if (transformMode === "rotate") {
                const { x, y, z } = groupRef.current.rotation;
                updateTransform(part.id, {
                  rotation: [
                    parseFloat(x.toFixed(2)),
                    parseFloat(y.toFixed(2)),
                    parseFloat(z.toFixed(2)),
                  ],
                });
              }
            }
          }}
        />
      )}
    </>
  );
}
