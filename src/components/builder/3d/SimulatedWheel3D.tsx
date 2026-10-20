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

    // Xác định driveSide:
    // 1. Nếu đã cấu hình 'left' hoặc 'right': dùng trực tiếp.
    // 2. Nếu chưa có motorConfig hoặc 'none': tự động nhận diện theo toạ độ localAnchor.x (< 0 là left, >= 0 là right)
    const configuredSide = part.motorConfig?.driveSide;
    const driveSide: "left" | "right" | "none" =
      configuredSide && configuredSide !== "none"
        ? configuredSide
        : localAnchor.x < 0
          ? "left"
          : "right";

    const isEnabled = part.motorConfig?.isEnable ?? true;
    const maxSpeed =
      part.motorConfig?.maxSpeed ?? Number(part.properties?.maxSpeed) ?? 15;
    const maxTorque =
      part.motorConfig?.maxTorque ?? Number(part.properties?.motorTorque) ?? 50;

    // Kiểm tra xem người dùng có đang can thiệp bàn phím không
    const hasManualInput =
      input.linear !== 0 || input.angular !== 0 || input.manualBrake;

    let driveRatio = 0;
    if (hasManualInput) {
      if (driveSide === "left") {
        driveRatio = clamp(input.linear + input.angular, -1.0, 1.0);
      } else if (driveSide === "right") {
        driveRatio = clamp(input.linear - input.angular, -1.0, 1.0);
      } else {
        driveRatio = clamp(input.linear, -1.0, 1.0);
      }
    } else {
      // Chế độ mô phỏng tự hành mặc định khi không có phím nhấn:
      // Xe tự động chạy tiến tới, gặp vật cản thì phanh
      driveRatio = isEnabled ? 1.0 : 0;
    }

    const requestedSpeed = isEnabled ? driveRatio * maxSpeed : 0;
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
      enabled: isEnabled,
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
