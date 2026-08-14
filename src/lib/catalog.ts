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
  },
  wall: {
    type: 'wall',
    defaultName: 'Wall',
    defaultPosition: [0, 1.5, 15],
    defaultProperties: {
      size: [10, 3, 1],
      color: '#ef4444'
    }
  },
  battery: {
    type: 'battery',
    defaultName: 'Li-ion Battery',
    defaultProperties: {
      capacity: 5000,
      voltage: 12,
      weight: 1.2,
      color: '#374151'
    }
  },
  camera: {
    type: 'camera',
    defaultName: 'HD Camera',
    defaultProperties: {
      resolution: '1920x1080',
      fov: 90,
      range: 20,
      color: '#000000'
    }
  },
  controller: {
    type: 'controller',
    defaultName: 'Main Controller',
    defaultProperties: {
      cpu: 'ARM Cortex-M4',
      memory: 256,
      ports: 6,
      color: '#6366f1'
    }
  },
  antenna: {
    type: 'antenna',
    defaultName: 'Signal Antenna',
    defaultProperties: {
      frequency: 2.4,
      gain: 5,
      color: '#22d3ee'
    }
  },
  frame: {
    type: 'frame',
    defaultName: 'Support Frame',
    defaultProperties: {
      material: 'Aluminum',
      weight: 2,
      color: '#9ca3af'
    }
  },
  pcb: {
    type: 'pcb',
    defaultName: 'Circuit Board',
    defaultProperties: {
      layers: 4,
      size: [10, 5],
      color: '#16a34a'
    }
  }
};
