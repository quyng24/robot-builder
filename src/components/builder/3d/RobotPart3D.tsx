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
      case "motor":
        return <boxGeometry args={[0.6, 0.6, 0.8]} />;
      case "sensor":
        return <sphereGeometry args={[0.3, 16, 16]} />;
      case "wall":
        return <boxGeometry args={[10, 3, 1]} />;
      case "battery":
        return <boxGeometry args={[1, 0.5, 2]} />;
      case "camera":
        return <boxGeometry args={[0.8, 0.6, 0.6]} />;
      case "controller":
        return <boxGeometry args={[1, 0.4, 1]} />;
      case "antenna":
        return <cylinderGeometry args={[0.05, 0.05, 1, 16]} />;
      case "frame":
        return <boxGeometry args={[2, 0.2, 2]} />;
      case "pcb":
        return <planeGeometry args={[1, 0.5]} />;
      case "cone":
        return <coneGeometry args={[0.5, 1, 32]} />;
      case "torus":
        return <torusGeometry args={[0.5, 0.2, 16, 100]} />;
      case "capsule":
        return <capsuleGeometry args={[0.4, 1, 8, 16]} />;
      case "ring":
        return <ringGeometry args={[0.3, 0.5, 32]} />;
      case "plane":
        return <planeGeometry args={[2, 2]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[0.5, 0]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.5, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.5, 0]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[0.5, 0]} />;
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
      case "motor":
        return "#10b981"; // Green
      case "sensor":
        return "#f43f5e"; // Rose
      case "wall":
        return "#ef4444"; // Red
      case "battery":
        return "#374151"; // Gray
      case "camera":
        return "#000000"; // Black
      case "controller":
        return "#6366f1"; // Indigo
      case "antenna":
        return "#22d3ee"; // Cyan
      case "frame":
        return "#9ca3af"; // Light Gray
      case "pcb":
        return "#16a34a"; // Green
      case "cone":
        return "#8b5cf6"; // Purple
      case "torus":
        return "#ef4444"; // Red
      case "capsule":
        return "#14b8a6"; // Teal
      case "ring":
        return "#eab308"; // Amber
      case "plane":
        return "#64748b"; // Slate Gray
      case "dodecahedron":
        return "#22c55e"; // Emerald
      case "icosahedron":
        return "#0ea5e9"; // Sky Blue
      case "octahedron":
        return "#9333ea"; // Violet
      case "tetrahedron":
        return "#f59e0b"; // Orange
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
