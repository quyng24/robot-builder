import { RobotPart } from "@/types/robot";
import React from "react";
import Chassis3D from "./parts/Chassis3D";
import Box3D from "./parts/Box3D";
import Wheel3D from "./parts/Wheel3D";

interface PartRendererProps {
  part: RobotPart;
}

export const PartRenderer: React.FC<PartRendererProps> = ({ part }) => {
  // Logic Map: Tùy theo part.type mà render ra Component Three.js tương ứng
  switch (part.type) {
    case "chassis":
      return <Chassis3D part={part} />;
    case "wheel":
      return <Wheel3D part={part} />;
    case "sensor":
      // return <Sensor3D part={part} />;
      return <Box3D part={part} />; // Tạm dùng box nếu chưa làm component sensor
    case "wall":
    case "box":
      return <Box3D part={part} />;
    default:
      console.warn(`Unknown part type: ${part.type}`);
      return null;
  }
};
