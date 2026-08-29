import React from "react";
import { RigidBody } from "@react-three/rapier";
import { RobotPart } from "@/types/robot";
import { useRobotStore } from "@/store/useRobotStore";
import WheelVisual3D from "./WheelVisual3D";

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
      <WheelVisual3D
        part={part}
        onClick={(e) => {
          e.stopPropagation();
          if (mode === "build") selectPart(part.id);
        }}
      />
    </RigidBody>
  );
};

export default Wheel3D;
