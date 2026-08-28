import { CatalogPart } from "@/types/robot";

export const PART_CATALOG: Record<string, CatalogPart> = {
  chassis: {
    type: 'chassis',
    defaultName: 'Chassis',
    category: 'robot',
    defaultPosition: [2, 0.5, 3],
    defaultProperties: { color: '#cccccc', mass: 10, isKinematic: false },
  },
  wheel: {
    type: 'wheel',
    defaultName: 'Wheel',
    category: 'robot',
    defaultPosition: [0.5, 0.5, 0.2],
    defaultProperties: { color: '#333333', motorTorque: 5, maxSpeed: 10 },
  },
  sensor: {
    type: 'sensor',
    defaultName: 'Distance Sensor',
    category: 'robot',
    defaultPosition: [0.2, 0.2, 0.2],
     defaultProperties: { color: '#ff0000', range: 5 },
  },
  wall: {
     type: 'wall',
    defaultName: 'Brick Wall',
    category: 'environment',
    defaultPosition: [5, 2, 0.5],
    defaultProperties: { color: '#8b4513', isStatic: true },
  },
  box: {
    type: 'box',
    defaultName: 'Box',
    category: 'basic',
    defaultPosition: [1, 1, 1],
    defaultProperties: { color: '#ef4444' }
  },
};
