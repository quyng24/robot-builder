import React from "react";
import { RigidBody } from "@react-three/rapier";
import { RobotPart } from "@/types/robot";
import { useRobotStore } from "@/store/useRobotStore";

interface Props {
  part: RobotPart;
}

const Box3D: React.FC<Props> = ({ part }) => {
  const mode = useRobotStore((state: any) => state.mode);
  const isStatic = part.properties.isStatic || false;
  const bodyType = isStatic
    ? "fixed"
    : mode === "build"
      ? "kinematicPosition"
      : "dynamic";

  return (
    <RigidBody
      type={bodyType}
      position={part.position}
      rotation={part.rotation}
      colliders="cuboid"
      name={part.name}
      userData={{ id: part.id, type: part.type }}
    >
      <mesh scale={part.scale} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={part.properties.color || "#aaaaaa"}
          roughness={0.7}
        />
      </mesh>
    </RigidBody>
  );
};

export default Box3D;
