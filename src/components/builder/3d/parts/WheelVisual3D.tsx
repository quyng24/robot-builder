import { ThreeEvent } from "@react-three/fiber";
import { RobotPart } from "@/types/robot";

const DEFAULT_WHEEL_RADIUS = 0.5;
const DEFAULT_WHEEL_WIDTH = 0.4;

type WheelVisual3DProps = {
  part: RobotPart;
  onClick?: (event: ThreeEvent<MouseEvent>) => void;
};

function getPositiveDimension(value: unknown, fallback: number) {
  return typeof value === "number" && value > 0 ? value : fallback;
}

/**
 * Shared wheel mesh for editor and simulation.
 * Rapier generates the hull collider from this mesh, so both modes always use
 * the same radius, width, scale, and rotation.
 */
export default function WheelVisual3D({
  part,
  onClick,
}: WheelVisual3DProps) {
  const radius = getPositiveDimension(
    part.properties.radius,
    DEFAULT_WHEEL_RADIUS,
  );
  const width = getPositiveDimension(
    part.properties.width,
    DEFAULT_WHEEL_WIDTH,
  );

  return (
    <mesh
      scale={part.scale}
      rotation={[0, 0, Math.PI / 2]}
      castShadow
      receiveShadow
      onClick={onClick}
    >
      <cylinderGeometry args={[radius, radius, width, 32]} />
      <meshStandardMaterial
        color={part.properties.color || "#333333"}
        roughness={0.9}
      />

      <mesh position={[radius, 0, 0]}>
        <boxGeometry args={[0.06, width + 0.02, 0.06]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </mesh>
  );
}
