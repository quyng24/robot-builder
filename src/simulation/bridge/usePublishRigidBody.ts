"use client";

import { useAfterPhysicsStep } from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import { useRef, type RefObject } from "react";
import * as THREE from "three";
import type { PartType } from "@/types/robot";
import { getSimulationState } from "../state/SimulationState";

export function usePublishRigidBody(
  id: string,
  type: PartType,
  bodyRef: RefObject<RapierRigidBody | null>,
) {
  const euler = useRef(new THREE.Euler());
  const quat = useRef(new THREE.Quaternion());

  useAfterPhysicsStep(() => {
    const body = bodyRef.current;
    if (!body) return;

    const translation = body.translation();
    const rotation = body.rotation();
    const linvel = body.linvel();
    const angvel = body.angvel();

    quat.current.set(rotation.x, rotation.y, rotation.z, rotation.w);
    euler.current.setFromQuaternion(quat.current);

    getSimulationState().upsertBody({
      id,
      type,
      position: [translation.x, translation.y, translation.z],
      rotation: [euler.current.x, euler.current.y, euler.current.z],
      linearVelocity: [linvel.x, linvel.y, linvel.z],
      angularVelocity: [angvel.x, angvel.y, angvel.z],
    });
  });
}
