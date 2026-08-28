import React, { forwardRef } from "react";
import {
  RigidBody,
  RapierRigidBody,
  CuboidCollider,
  interactionGroups,
} from "@react-three/rapier";
import { RobotPart } from "@/types/robot";
import { useRobotStore } from "@/store/useRobotStore";

interface Props {
  part: RobotPart;
  children?: React.ReactNode;
}

const Chassis3D = forwardRef<RapierRigidBody, Props>(
  ({ part, children }, ref) => {
    const mode = useRobotStore((state) => state.mode);
    const selectPart = useRobotStore((state) => state.selectPart);
    const bodyType = mode === "build" ? "kinematicPosition" : "dynamic";

    return (
      <RigidBody
        ref={ref}
        type={bodyType}
        position={part.position}
        rotation={part.rotation as any}
        mass={15}
        collisionGroups={interactionGroups(1, [0, 3])}
        colliders={false}
      >
        <CuboidCollider args={[1, 0.25, 2]} restitution={0} />

        <mesh
          onClick={(e) => {
            e.stopPropagation();
            if (mode === "build") selectPart(part.id);
          }}
        >
          <boxGeometry args={[2, 0.5, 4]} />
          <meshStandardMaterial color={part.properties.color || "#3b82f6"} />
        </mesh>

        {children}
      </RigidBody>
    );
  },
);

Chassis3D.displayName = "Chassis3D";

export default Chassis3D;
