"use client";
import { useRobotStore } from "@/store/useRobotStore";
import {
  BatteryCharging,
  Box,
  Camera,
  CircuitBoard,
  Cpu,
  Disc,
  Radio,
  Square,
  Wifi,
  Zap,
} from "lucide-react";

export default function RobotTree() {
  const { parts, selectPart, selectedPartId } = useRobotStore();

  const getPartIcon = (type: string) => {
    switch (type) {
      case "chassis":
        return <Box size={14} />;
      case "wheel":
        return <Disc size={14} />;
      case "motor":
        return <Zap size={14} />;
      case "sensor":
        return <Radio size={14} />;
      case "wall":
        return <Box size={14} />;
      case "battery":
        return <BatteryCharging size={14} />;
      case "camera":
        return <Camera size={14} />;
      case "controller":
        return <Cpu size={14} />;
      case "antenna":
        return <Wifi size={14} />;
      case "frame":
        return <Square size={14} />;
      case "pcb":
        return <CircuitBoard size={14} />;
      default:
        return <Box size={14} />;
    }
  };
  return (
    <div className="flex-1 flex flex-col border-b border-slate-800 overflow-hidden">
      <div className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
        Cấu trúc Robot (Tree)
      </div>

      <div className="flex-1 p-2 overflow-y-auto font-mono text-xs text-slate-300 space-y-1">
        {parts.length === 0 && (
          <div className="text-center text-slate-600 italic mt-4">
            Chưa có linh kiện nào
          </div>
        )}
        {parts.map((part) => (
          <div
            key={part.id}
            onClick={() => selectPart(part.id)}
            className={`flex items-center gap-2 p-1.5 rounded cursor-pointer transition-colors ${selectedPartId === part.id ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40" : "hover:bg-slate-800 text-slate-400"}`}
          >
            <span
              className={
                selectedPartId === part.id
                  ? "text-indigo-400"
                  : "text-slate-500"
              }
            >
              {getPartIcon(part.type)}
            </span>

            <span className="truncate">{part.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
