"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  RigidBody,
  RapierRigidBody,
  useRevoluteJoint,
  interactionGroups,
} from "@react-three/rapier";
import { RobotPart } from "@/types/robot";

function SimulatedWheel({
  wheel,
  chassisRef,
  chassis,
}: {
  wheel: RobotPart;
  chassisRef: React.RefObject<RapierRigidBody>;
  chassis: RobotPart;
}) {
  const wheelRef = useRef<RapierRigidBody>(null);

  const localAnchor = useMemo(() => {
    const chassisPos = new THREE.Vector3(...chassis.position);
    const chassisQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(...(chassis.rotation as [number, number, number])),
    );
    const wheelPos = new THREE.Vector3(...wheel.position);

    return wheelPos.sub(chassisPos).applyQuaternion(chassisQuat.invert());
  }, [chassis, wheel]);

  const joint = useRevoluteJoint(chassisRef, wheelRef, [
    [localAnchor.x, localAnchor.y, localAnchor.z],
    [0, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
  ]);

  useFrame(() => {
    if (joint.current) {
      joint.current.configureMotorVelocity(15, 2);
    }
  });

  return (
    <RigidBody
      ref={wheelRef}
      position={wheel.position}
      rotation={wheel.rotation as any}
      colliders="hull"
      mass={2}
      collisionGroups={interactionGroups(2, [0])}
    >
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.5, 32]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </RigidBody>
  );
}

export default function SimulatedRobot({ parts }: { parts: RobotPart[] }) {
  const chassisRef = useRef<RapierRigidBody>(null);

  const chassis = parts.find((p) => p.type === "chassis");
  const wheels = parts.filter((p) => p.type === "wheel");
  const staticParts = parts.filter(
    (p) => p.type !== "chassis" && p.type !== "wheel",
  );

  if (!chassis) return null;

  return (
    <>
      <RigidBody
        ref={chassisRef}
        position={chassis.position}
        rotation={chassis.rotation as any}
        mass={15}
        collisionGroups={interactionGroups(1, [0])}
      >
        <mesh>
          <boxGeometry args={[2, 0.5, 4]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>

        {staticParts.map((part) => {
          const chassisPos = new THREE.Vector3(...chassis.position);
          const chassisQuat = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(...(chassis.rotation as [number, number, number])),
          );

          const partPos = new THREE.Vector3(...part.position);
          const partQuat = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(...(part.rotation as [number, number, number])),
          );

          const localPos = partPos
            .clone()
            .sub(chassisPos)
            .applyQuaternion(chassisQuat.clone().invert());

          const localQuat = partQuat
            .clone()
            .premultiply(chassisQuat.clone().invert());
          const localEuler = new THREE.Euler().setFromQuaternion(localQuat);

          return (
            <mesh
              key={part.id}
              position={[localPos.x, localPos.y, localPos.z]}
              rotation={[localEuler.x, localEuler.y, localEuler.z]}
            >
              {part.type === "motor" ? (
                <boxGeometry args={[0.6, 0.6, 0.8]} />
              ) : (
                <sphereGeometry args={[0.3, 16, 16]} />
              )}
              <meshStandardMaterial
                color={part.type === "motor" ? "#10b981" : "#f43f5e"}
              />
            </mesh>
          );
        })}
      </RigidBody>

      {wheels.map((wheel) => (
        <SimulatedWheel
          key={wheel.id}
          wheel={wheel}
          chassis={chassis}
          chassisRef={chassisRef}
        />
      ))}
    </>
  );
}
