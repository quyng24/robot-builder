import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  RigidBody,
  RapierRigidBody,
  useRevoluteJoint,
  interactionGroups,
} from "@react-three/rapier";
import { useRobotStore } from "@/store/useRobotStore";
import { RobotPart } from "@/types/robot";

interface Props {
  part: RobotPart;
  chassis: RobotPart;
  chassisRef: React.RefObject<RapierRigidBody>;
}

export default function SimulatedWheel3D({ part, chassis, chassisRef }: Props) {
  const isBlocked = useRobotStore((state) => state.isBlocked);
  const mode = useRobotStore((state) => state.mode);

  const wheelRef = useRef<RapierRigidBody>(null!);

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

  useFrame(() => {
    if (mode === "build") return;

    if (joint.current) {
      const targetSpeed = isBlocked ? 0 : 15;
      joint.current.configureMotorVelocity(targetSpeed, isBlocked ? 200 : 50);
    }
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
      <mesh
        scale={part.scale}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
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
}
