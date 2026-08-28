import React from "react";
import { RigidBody } from "@react-three/rapier";
import { RobotPart } from "@/types/robot";
import { useRobotStore } from "@/store/useRobotStore";

interface Props {
  part: RobotPart;
}

const Wheel3D: React.FC<Props> = ({ part }) => {
  const mode = useRobotStore((state) => state.mode);
  const selectPart = useRobotStore((state) => state.selectPart);
  const bodyType = mode === "build" ? "kinematicPosition" : "dynamic";

  return (
    <RigidBody
      type={bodyType}
      position={part.position}
      rotation={part.rotation as any}
      colliders="hull"
      name={part.name}
      userData={{ id: part.id, type: part.type }}
      friction={1.5}
    >
      <mesh
        scale={part.scale}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          if (mode === "build") selectPart(part.id);
        }}
      >
        <cylinderGeometry args={[1, 1, 1, 32]} />
        <meshStandardMaterial
          color={part.properties.color || "#333333"}
          roughness={0.9}
        />

        <mesh position={[0.5, 0, 0]}>
          <boxGeometry args={[0.1, 1.01, 0.1]} />
          <meshBasicMaterial color="red" />
        </mesh>
      </mesh>
    </RigidBody>
  );
};

export default Wheel3D;
