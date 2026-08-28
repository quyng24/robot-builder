"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRapier, interactionGroups } from "@react-three/rapier";
import { RobotPart } from "@/types/robot";
import { useRobotStore } from "@/store/useRobotStore";

interface SensorProps {
  part: RobotPart;
  chassis: RobotPart;
}

export default function Sensor3D({ part, chassis }: SensorProps) {
  const mode = useRobotStore((state) => state.mode);
  const setIsBlocked = useRobotStore((state) => state.setIsBlocked);

  const sensorRef = useRef<THREE.Mesh>(null!);
  const sensorMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const laserMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  const { rapier, world } = useRapier();
  const sensorRange = Number(part.properties.range) || 5;

  const { localPos, localEuler } = useMemo(() => {
    const chassisPos = new THREE.Vector3(...chassis.position);
    const chassisQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(...(chassis.rotation as [number, number, number])),
    );

    const partPos = new THREE.Vector3(...part.position);
    const partQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(...(part.rotation as [number, number, number])),
    );

    const pos = partPos
      .clone()
      .sub(chassisPos)
      .applyQuaternion(chassisQuat.clone().invert());
    const quat = partQuat.clone().premultiply(chassisQuat.clone().invert());
    const euler = new THREE.Euler().setFromQuaternion(quat);

    return { localPos: pos, localEuler: euler };
  }, [part, chassis]);

  useFrame(() => {
    if (mode === "build") {
      setIsBlocked(false);
      return;
    }

    if (sensorRef.current && sensorMatRef.current && laserMatRef.current) {
      const pos = new THREE.Vector3();
      sensorRef.current.getWorldPosition(pos);

      const sensorQuaternion = new THREE.Quaternion();
      sensorRef.current.getWorldQuaternion(sensorQuaternion);

      const forward = new THREE.Vector3(0, 0, 1)
        .applyQuaternion(sensorQuaternion)
        .normalize();

      const ray = new rapier.Ray(
        { x: pos.x, y: pos.y, z: pos.z },
        { x: forward.x, y: forward.y, z: forward.z },
      );

      const hit = world.castRay(
        ray,
        sensorRange,
        true,
        undefined,
        interactionGroups(4, [3]),
      );

      if (hit) {
        setIsBlocked(true);
        sensorMatRef.current.color.set("#ef4444");
        laserMatRef.current.color.set("#ef4444");
      } else {
        setIsBlocked(false);
        sensorMatRef.current.color.set("#10b981");
        laserMatRef.current.color.set("#10b981");
      }
    }
  });

  return (
    <mesh
      ref={sensorRef}
      position={[localPos.x, localPos.y, localPos.z]}
      rotation={[localEuler.x, localEuler.y, localEuler.z]}
    >
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial ref={sensorMatRef} color="#94a3b8" />

      <mesh position={[0, 0, sensorRange / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, sensorRange]} />
        <meshBasicMaterial
          ref={laserMatRef}
          color="#10b981"
          transparent
          opacity={0.5}
        />
      </mesh>
    </mesh>
  );
}
