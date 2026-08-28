export type PartType =
  | 'chassis'
  | 'wheel'
  | 'sensor'
  | 'wall'
  | 'box';

export type Vector3D = [number, number, number];

export interface CatalogPart {
  type: PartType;
  defaultName: string;
  category: 'robot' | 'environment' | 'basic';
  defaultProperties: Record<string, any>;
  defaultPosition?: Vector3D;
}

export interface RobotPart {
  id: string;
  type: PartType;
  name: string;
  position: Vector3D;
  rotation: Vector3D;
  scale: Vector3D;
  parentId: string | null;
  properties: Record<string, any>;
}
