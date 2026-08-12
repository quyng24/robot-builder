import { CatalogPart } from "@/types/robot";

export const PART_CATALOG: Record<string, CatalogPart> = {
  chassis: {
    type: 'chassis',
    defaultName: 'Chassis',
    defaultProperties: {
      mass: 10,
      color: '#3b82f6',
      size: [2, 0.5, 4]
    }
  },
  motor: {
    type: 'motor',
    defaultName: 'DC motor',
    defaultProperties: {
      maxTorque: 50,
      maxSpeed: 10,
      motorEnabled: true
    }
  },
  wheel: {
    type: 'wheel',
    defaultName: 'Wheel',
    defaultProperties: {
      radius: 0.5,
      friction: 0.8,
      color: '#fbbf24'
    }
  },
  sensor: {
    type: 'sensor',
    defaultName: 'KC sensor',
    defaultProperties: {
      range: 5,
      fov: 30
    }
  }
};