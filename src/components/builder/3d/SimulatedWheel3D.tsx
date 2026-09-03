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

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

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
    const input = world.getControllerInput();
    const driveSide = part.motorConfig?.driveSide || "none";
    const maxSpeed =
      part.motorConfig?.maxSpeed ?? Number(part.properties?.maxSpeed) ?? 15;
    const maxTorque = part.motorConfig?.maxTorque ?? 50;

    let driveRatio = 0;
    if (driveSide === "left") {
      driveRatio = clamp(input.linear + input.angular, -1.0, 1.0);
    } else if (driveSide === "right") {
      driveRatio = clamp(input.linear - input.angular, -1.0, 1.0);
    }

    const requestedSpeed = driveRatio * maxSpeed;
    const isBraking = blocked || input.manualBrake;
    const appliedSpeed = isBraking ? 0 : requestedSpeed;

    if (joint.current) {
      joint.current.configureMotorVelocity(
        appliedSpeed,
        isBraking ? 200 : maxTorque,
      );
    }

    world.upsertMotor({
      id: part.id,
      targetSpeed: requestedSpeed,
      appliedSpeed: appliedSpeed,
      enabled: driveSide !== "none",
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
