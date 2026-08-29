import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  RigidBody,
  RapierRigidBody,
  useRevoluteJoint,
  interactionGroups,
  useBeforePhysicsStep,
} from "@react-three/rapier";
import { getSimulationState } from "@/simulation";
import { usePublishRigidBody } from "@/simulation/bridge/usePublishRigidBody";
import { useRobotStore } from "@/store/useRobotStore";
import { RobotPart } from "@/types/robot";
import WheelVisual3D from "./parts/WheelVisual3D";

interface Props {
  part: RobotPart;
  chassis: RobotPart;
  chassisRef: React.RefObject<RapierRigidBody>;
}

export default function SimulatedWheel3D({ part, chassis, chassisRef }: Props) {
  const mode = useRobotStore((state) => state.mode);

  const wheelRef = useRef<RapierRigidBody>(null!);
  usePublishRigidBody(part.id, part.type, wheelRef);

  const localAnchor = useMemo(() => {
    const chassisPos = new THREE.Vector3(...chassis.position);
    const chassisQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(...(chassis.rotation as [number, number, number])),
    );
    const wheelPos = new THREE.Vector3(...part.position);
    return wheelPos.sub(chassisPos).applyQuaternion(chassisQuat.invert());
  }, [chassis, part]);

  const joint = useRevoluteJoint(chassisRef, wheelRef, [
    [localAnchor.x, localAnchor.y, localAnchor.z],
    [0, 0, 0],
    [1, 0, 0],
  ]);

  useBeforePhysicsStep(() => {
    if (mode === "build") return;

    const world = getSimulationState();
    const blocked = world.isRobotBlocked();
    const motor = world.getMotor(part.id);

    const requestedSpeed =
      motor?.targetSpeed ?? (Number(part.properties.maxSpeed) || 15);
    const motorEnabled = motor?.enabled ?? true;
    const appliedSpeed = !motorEnabled || blocked ? 0 : requestedSpeed;

    if (joint.current) {
      joint.current.configureMotorVelocity(appliedSpeed, blocked ? 200 : 50);
    }

    world.upsertMotor({
      id: part.id,
      targetSpeed: requestedSpeed,
      appliedSpeed,
      enabled: motorEnabled,
    });
  });

  const bodyType = mode === "build" ? "kinematicPosition" : "dynamic";

  return (
    <RigidBody
      ref={wheelRef}
      type={bodyType}
      position={part.position}
      rotation={part.rotation as any}
      colliders="hull"
      mass={2}
      collisionGroups={interactionGroups(2, [0, 3])}
      restitution={0}
      friction={1.5}
    >
      <WheelVisual3D part={part} />
    </RigidBody>
  );
}
