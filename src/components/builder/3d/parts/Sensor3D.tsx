"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  interactionGroups,
  RapierRigidBody,
  useAfterPhysicsStep,
  useRapier,
} from "@react-three/rapier";
import { getSimulationState } from "@/simulation";
import { RobotPart } from "@/types/robot";
import { useRobotStore } from "@/store/useRobotStore";

interface SensorProps {
  part: RobotPart;
  chassis: RobotPart;
  chassisRef: React.RefObject<RapierRigidBody>;
}

export default function Sensor3D({
  part,
  chassis,
  chassisRef,
}: SensorProps) {
  const mode = useRobotStore((state) => state.mode);
  const setIsBlocked = useRobotStore((state) => state.setIsBlocked);
  const selectPart = useRobotStore(state => state.selectPart);

  const sensorRef = useRef<THREE.Mesh>(null!);
  const sensorMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const laserMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const chassisQuaternion = useRef(new THREE.Quaternion());
  const localQuaternion = useRef(new THREE.Quaternion());
  const sensorWorldPosition = useRef(new THREE.Vector3());
  const sensorWorldQuaternion = useRef(new THREE.Quaternion());

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

  useAfterPhysicsStep(() => {
    if (mode === "build") {
      setIsBlocked(false);
      return;
    }

    const chassisBody = chassisRef.current;
    if (!chassisBody || !sensorMatRef.current || !laserMatRef.current) return;

    const chassisPosition = chassisBody.translation();
    const chassisRotation = chassisBody.rotation();
    chassisQuaternion.current.set(
      chassisRotation.x,
      chassisRotation.y,
      chassisRotation.z,
      chassisRotation.w,
    );
    localQuaternion.current.setFromEuler(localEuler);
    sensorWorldQuaternion.current
      .copy(chassisQuaternion.current)
      .multiply(localQuaternion.current);
    sensorWorldPosition.current
      .copy(localPos)
      .applyQuaternion(chassisQuaternion.current)
      .add({
        x: chassisPosition.x,
        y: chassisPosition.y,
        z: chassisPosition.z,
      });

    const forward = new THREE.Vector3(0, 0, 1)
      .applyQuaternion(sensorWorldQuaternion.current)
      .normalize();

    const ray = new rapier.Ray(
      {
        x: sensorWorldPosition.current.x,
        y: sensorWorldPosition.current.y,
        z: sensorWorldPosition.current.z,
      },
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
      const distance = hit.timeOfImpact;
      setIsBlocked(true);
      getSimulationState().setRobotBlocked(true);
      getSimulationState().upsertSensor({
        id: part.id,
        range: sensorRange,
        distance,
        blocked: true,
      });
      sensorMatRef.current.color.set("#ef4444");
      laserMatRef.current.color.set("#ef4444");
    } else {
      setIsBlocked(false);
      getSimulationState().setRobotBlocked(false);
      getSimulationState().upsertSensor({
        id: part.id,
        range: sensorRange,
        distance: null,
        blocked: false,
      });
      sensorMatRef.current.color.set("#10b981");
      laserMatRef.current.color.set("#10b981");
    }
  });

  return (
    <mesh
      ref={sensorRef}
      position={[localPos.x, localPos.y, localPos.z]}
      rotation={[localEuler.x, localEuler.y, localEuler.z]}
      onClick={(e) => {
        e.stopPropagation();
        if (mode === 'build') selectPart(part.id)
      }}
    >
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial ref={sensorMatRef} color="#94a3b8" />

      <mesh
        position={[0, 0, sensorRange / 2]}
        rotation={[Math.PI / 2, 0, 0]}
      >
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
