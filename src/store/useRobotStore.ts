import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { RobotPart, PartType, Vector3D } from '@/types/robot';
import { PART_CATALOG } from '@/lib/catalog';

interface RobotState {
  mode: 'build' | 'simulate';
  parts: RobotPart[];
  selectedPartId: string | null;
  transformMode: 'translate' | 'rotate';

  setMode: (mode: 'build' | 'simulate') => void;
  setTransformMode: (mode: 'translate' | 'rotate') => void;
  selectPart: (id: string | null) => void;
  
  addPart: (type: PartType) => void;
  removePart: (id: string) => void;
  updateName: (id: string, name: string) => void;
  updateTransform: (id: string, transform: { position?: Vector3D; rotation?: Vector3D; scale?: Vector3D }) => void;
  updateProperties: (id: string, properties: Record<string, any>) => void;
  setParent: (childId: string, parentId: string | null) => void;
}

export const useRobotStore = create<RobotState>((set, get) => ({
  mode: 'build',
  parts: [],
  selectedPartId: null,
  transformMode: 'translate',

  setMode: (mode) => set({ mode }),

  setTransformMode: (mode: any) => set({transformMode: mode}),
  
  selectPart: (id) => set({ selectedPartId: id }),

  addPart: (type) => {
    const catalogItem = PART_CATALOG[type];
    if (!catalogItem) return;

    const newPart: RobotPart = {
      id: uuidv4(),
      type: catalogItem.type,
      name: `${catalogItem.defaultName} ${get().parts.filter(p => p.type === type).length + 1}`,
      position: [0, 1, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      parentId: null, //get().selectedPartId || null, 
      properties: { ...catalogItem.defaultProperties },
    };

    set((state) => ({
      parts: [...state.parts, newPart],
      selectedPartId: newPart.id
    }));
  },

  removePart: (id) => {
    const getAllChildrenIds = (parentId: string, partsList: RobotPart[]): string[] => {
      const children = partsList.filter(p => p.parentId === parentId);
      let ids = children.map(c => c.id);
      children.forEach(c => {
        ids = [...ids, ...getAllChildrenIds(c.id, partsList)];
      });
      return ids;
    };

    set((state) => {
      const idsToRemove = [id, ...getAllChildrenIds(id, state.parts)];
      return {
        parts: state.parts.filter(p => !idsToRemove.includes(p.id)),
        selectedPartId: state.selectedPartId === id ? null : state.selectedPartId,
      };
    });
  },

  updateName: (id, name) => {
    set((state) => ({parts: state.parts.map(part => part.id === id ? { ...part, name } : part)}));
    },

  updateTransform: (id, transform) => {
    set((state) => ({
      parts: state.parts.map(part => 
        part.id === id ? { ...part, ...transform } : part
      )
    }));
  },

  updateProperties: (id, newProps) => {
    set((state) => ({
      parts: state.parts.map(part => 
        part.id === id 
          ? { ...part, properties: { ...part.properties, ...newProps } }
          : part
      )
    }));
  },

  setParent: (childId, parentId) => {
    set((state) => ({
      parts: state.parts.map(part => 
        part.id === childId ? { ...part, parentId } : part
      )
    }));
  }
}));