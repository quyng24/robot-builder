"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  RigidBody,
  RapierRigidBody,
  useRevoluteJoint,
  interactionGroups,
  useRapier,
  CuboidCollider
} from "@react-three/rapier";
import { RobotPart } from "@/types/robot";

const DEFAULT_WALL_SIZE: [number, number, number] = [10, 3, 1];

function getWallSize(wall: RobotPart): [number, number, number] {
  const size = wall.properties.size;
  if (
    Array.isArray(size) &&
    size.length === 3 &&
    size.every((dimension) => typeof dimension === "number")
  ) {
    return size as [number, number, number];
  }

  return DEFAULT_WALL_SIZE;
}

function SimulatedWheel({
  wheel,
  chassisRef,
  chassis,
  robotControl
}: {
  wheel: RobotPart;
  chassisRef: React.RefObject<RapierRigidBody>;
  chassis: RobotPart;
  robotControl: React.MutableRefObject<{ isBlocked: boolean }>
}) {
  const wheelRef = useRef<RapierRigidBody>(null!);

  const localAnchor = useMemo(() => {
    const chassisPos = new THREE.Vector3(...chassis.position);
    const chassisQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(...(chassis.rotation as [number, number, number])));
    const wheelPos = new THREE.Vector3(...wheel.position);
    return wheelPos.sub(chassisPos).applyQuaternion(chassisQuat.invert());
  }, [chassis, wheel]);

  const joint = useRevoluteJoint(chassisRef, wheelRef, [
    [localAnchor.x, localAnchor.y, localAnchor.z],
    [0, 0, 0],
    [1, 0, 0],
  ]);

  useFrame(() => {
    if (joint.current) {
      const targetSpeed = robotControl.current.isBlocked ? 0 : 15;
      joint.current.configureMotorVelocity(
        targetSpeed,
        robotControl.current.isBlocked ? 200 : 50,
      );
    }
  });

  return (
    <RigidBody
      ref={wheelRef} position={wheel.position} rotation={wheel.rotation as any} colliders="hull" mass={2}
      collisionGroups={interactionGroups(2, [0, 3])}
      restitution={0}
    >
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.5, 32]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </RigidBody>
  );
}

export default function SimulatedRobot({ parts }: { parts: RobotPart[] }) {
  const chassisRef = useRef<RapierRigidBody>(null!);

  const sensorRef = useRef<THREE.Mesh>(null);
  const sensorMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const laserMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const { rapier, world } = useRapier();
  const robotControl = useRef({ isBlocked: false });

  const chassis = parts.find((p) => p.type === "chassis");
  const wheels = parts.filter((p) => p.type === "wheel");
  const walls = parts.filter((p) => p.type === "wall");
  const sensor = parts.find((p) => p.type === "sensor");
  const sensorRange = Number(sensor?.properties.range) || 5;
  const staticParts = parts.filter(
    (p) =>
      p.type !== "chassis" && p.type !== "wheel" && p.type !== "wall",
  );

  useFrame(() => {
    if (sensorRef.current && sensorMatRef.current && laserMatRef.current && chassisRef.current) {

      const pos = new THREE.Vector3();
      sensorRef.current.getWorldPosition(pos);

      const sensorQuaternion = new THREE.Quaternion();
      sensorRef.current.getWorldQuaternion(sensorQuaternion);
      const forward = new THREE.Vector3(0, 0, 1)
        .applyQuaternion(sensorQuaternion)
        .normalize();

      const ray = new rapier.Ray(
        { x: pos.x, y: pos.y, z: pos.z },
        { x: forward.x, y: forward.y, z: forward.z }
      );

      // The fourth argument is filterFlags; collision groups belong in the fifth.
      // Group 4 is the query-only sensor group and it detects wall group 3.
      const hit = world.castRay(
        ray,
        sensorRange,
        true,
        undefined,
        interactionGroups(4, [3]),
      );

      if (hit) {
        robotControl.current.isBlocked = true;
        sensorMatRef.current.color.set('#ef4444');
        laserMatRef.current.color.set('#ef4444');
      } else {
        robotControl.current.isBlocked = false;
        sensorMatRef.current.color.set('#10b981');
        laserMatRef.current.color.set('#10b981');
      }
    }
  });

  if (!chassis) return null;

  return (
    <>
      <RigidBody
        ref={chassisRef}
        position={chassis.position}
        rotation={chassis.rotation as any}
        mass={15}
        collisionGroups={interactionGroups(1, [0, 3])}
        colliders={false}
      >
        <CuboidCollider
          args={[1, 0.25, 2]}
          collisionGroups={interactionGroups(1, [0, 3])}
          restitution={0}
        />

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

          const isSensor = part.type === 'sensor';

          return (
            <mesh
              key={part.id}
              ref={isSensor ? sensorRef : null}
              position={[localPos.x, localPos.y, localPos.z]}
              rotation={[localEuler.x, localEuler.y, localEuler.z]}
            >
              {part.type === 'motor' ? <boxGeometry args={[0.6, 0.6, 0.8]} /> : <sphereGeometry args={[0.3, 16, 16]} />}
              <meshStandardMaterial ref={isSensor ? sensorMatRef : null} color={part.type === 'motor' ? '#10b981' : '#94a3b8'} />

              {isSensor && (
                <mesh
                  position={[0, 0, sensorRange / 2]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <cylinderGeometry args={[0.02, 0.02, sensorRange]} />
                  <meshBasicMaterial ref={laserMatRef} color="#10b981" transparent opacity={0.5} />
                </mesh>
              )}
            </mesh>
          );
        })}
      </RigidBody>

      {walls.map((wall) => {
        const [width, height, depth] = getWallSize(wall);

        return (
          <RigidBody
            key={wall.id}
            type="fixed"
            position={wall.position}
            rotation={wall.rotation as [number, number, number]}
            colliders={false}
          >
            <CuboidCollider
              args={[width / 2, height / 2, depth / 2]}
              collisionGroups={interactionGroups(3, [1, 2, 4])}
              restitution={0}
            />
            <mesh>
              <boxGeometry args={[width, height, depth]} />
              <meshStandardMaterial
                color={String(wall.properties.color || "#ef4444")}
              />
            </mesh>
          </RigidBody>
        );
      })}

      {wheels.map((wheel) => (
        <SimulatedWheel
          key={wheel.id}
          wheel={wheel}
          chassis={chassis}
          chassisRef={chassisRef}
          robotControl={robotControl}
        />
      ))}
    </>
  );
}
