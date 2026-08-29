import React, { useRef } from "react";
import { interactionGroups, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { usePublishRigidBody } from "@/simulation/bridge/usePublishRigidBody";
import { RobotPart } from "@/types/robot";
import { useRobotStore } from "@/store/useRobotStore";

interface Props {
  part: RobotPart;
}

const Box3D: React.FC<Props> = ({ part }) => {
  const mode = useRobotStore((state: any) => state.mode);
  const selectPart = useRobotStore(state => state.selectPart);
  const isStatic = part.properties.isStatic || false;
  const isWall = part.type === "wall";
  const bodyType =
    mode === "build" ? "kinematicPosition" : isStatic ? "fixed" : "dynamic";
  const bodyRef = useRef<RapierRigidBody>(null);
  usePublishRigidBody(part.id, part.type, bodyRef);

  return (
    <RigidBody
      ref={bodyRef}
      type={bodyType}
      position={part.position}
      rotation={part.rotation}
      colliders="cuboid"
      name={part.name}
      userData={{ id: part.id, type: part.type }}
      collisionGroups={
        isWall ? interactionGroups(3, [1, 2, 4]) : undefined
      }
      restitution={isWall ? 0 : undefined}
    >
      <mesh
        scale={part.scale}
        castShadow
        receiveShadow
        onClick={e => {
          e.stopPropagation();
          if (mode === 'build') selectPart(part.id)
        }}
      >
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
