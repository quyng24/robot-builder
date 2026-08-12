export type PartType = 'chassis' | 'wheel' | 'motor' | 'sensor';

export type Vector3D = [number, number, number];

export interface CatalogPart {
  type: PartType;
  defaultName: string;
  defaultProperties: Record<string, any>;
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