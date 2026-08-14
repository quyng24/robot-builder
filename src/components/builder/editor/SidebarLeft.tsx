"use client";
import {
  Box,
  Disc,
  Zap,
  Radio,
  BatteryCharging,
  Camera,
  Cpu,
  Wifi,
  Square,
  CircuitBoard,
  LucideIcon,
} from "lucide-react";
import { useRobotStore } from "@/store/useRobotStore";
import { PART_CATALOG } from "@/lib/catalog";

const ICON_MAP: Record<string, { icon: LucideIcon; color: string }> = {
  chassis: { icon: Box, color: "text-indigo-400" },
  wheel: { icon: Disc, color: "text-amber-400" },
  motor: { icon: Zap, color: "text-emerald-400" },
  sensor: { icon: Radio, color: "text-rose-400" },
  battery: { icon: BatteryCharging, color: "text-slate-400" },
  camera: { icon: Camera, color: "text-black" },
  controller: { icon: Cpu, color: "text-indigo-400" },
  antenna: { icon: Wifi, color: "text-cyan-400" },
  frame: { icon: Square, color: "text-gray-400" },
  pcb: { icon: CircuitBoard, color: "text-green-500" },
};

export default function SidebarLeft() {
  const addPart = useRobotStore((state) => state.addPart);

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col">
      <div className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
        Component library
      </div>

      <div className="p-3 grid grid-cols-2 gap-2 overflow-y-auto">
        {Object.values(PART_CATALOG).map((part) => {
          const Icon = ICON_MAP[part.type]?.icon || Box;
          const color = ICON_MAP[part.type]?.color || "text-slate-400";

          return (
            <div
              key={part.type}
              onClick={() => addPart(part.type)}
              className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition group"
            >
              <Icon
                className={`${color} group-hover:scale-110 transition`}
                size={24}
              />
              <span className="text-xs">{part.defaultName}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
