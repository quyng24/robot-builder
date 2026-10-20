"use client";

import { useRobotStore } from "@/store/useRobotStore";
import { RobotPart } from "@/types/robot";
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
  Trash2,
  CornerDownRight,
  Link as LinkIcon,
} from "lucide-react";

export default function RobotTree() {
  const { parts, selectPart, selectedPartId, removePart, setParent } =
    useRobotStore();

  const getPartIcon = (type: string) => {
    switch (type) {
      case "chassis":
        return <Box size={14} className="text-indigo-400" />;
      case "wheel":
        return <Disc size={14} className="text-amber-400" />;
      case "motor":
        return <Zap size={14} className="text-emerald-400" />;
      case "sensor":
        return <Radio size={14} className="text-rose-400" />;
      case "wall":
        return <Box size={14} className="text-orange-400" />;
      case "battery":
        return <BatteryCharging size={14} className="text-slate-400" />;
      case "camera":
        return <Camera size={14} className="text-blue-400" />;
      case "controller":
        return <Cpu size={14} className="text-indigo-400" />;
      case "antenna":
        return <Wifi size={14} className="text-cyan-400" />;
      case "frame":
        return <Square size={14} className="text-gray-400" />;
      case "pcb":
        return <CircuitBoard size={14} className="text-green-500" />;
      default:
        return <Box size={14} className="text-slate-400" />;
    }
  };

  const getPartBadge = (part: RobotPart) => {
    if (part.type === "chassis") {
      return (
        <span className="text-[9px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-400 rounded border border-indigo-500/30">
          Chassis
        </span>
      );
    }
    if (part.type === "sensor") {
      return (
        <span className="text-[9px] px-1.5 py-0.2 bg-rose-500/20 text-rose-400 rounded border border-rose-500/30">
          LIDAR
        </span>
      );
    }
    if (part.type === "wheel") {
      const drive = part.motorConfig?.driveSide;
      if (drive === "left") {
        return (
          <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
            Motor L
          </span>
        );
      }
      if (drive === "right") {
        return (
          <span className="text-[9px] px-1.5 py-0.2 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30">
            Motor R
          </span>
        );
      }
      return (
        <span className="text-[9px] px-1.5 py-0.2 bg-slate-700 text-slate-400 rounded">
          Free
        </span>
      );
    }
    return null;
  };

  // Xây dựng cây quan hệ cha - con
  const partMap = new Map<string, RobotPart>();
  parts.forEach((p) => partMap.set(p.id, p));

  const rootParts: RobotPart[] = [];
  const childrenMap = new Map<string, RobotPart[]>();

  parts.forEach((part) => {
    if (part.parentId && partMap.has(part.parentId)) {
      const list = childrenMap.get(part.parentId) || [];
      list.push(part);
      childrenMap.set(part.parentId, list);
    } else {
      rootParts.push(part);
    }
  });

  const renderPartRow = (part: RobotPart, depth = 0) => {
    const isSelected = selectedPartId === part.id;
    const children = childrenMap.get(part.id) || [];
    const possibleParents = parts.filter(
      (p) => p.id !== part.id && p.type === "chassis",
    );

    return (
      <div key={part.id} className="space-y-0.5">
        <div
          onClick={() => selectPart(part.id)}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          className={`group flex items-center justify-between p-1.5 rounded cursor-pointer transition-colors text-xs font-mono ${
            isSelected
              ? "bg-indigo-600/30 text-indigo-200 border border-indigo-500/40"
              : "hover:bg-slate-800 text-slate-300"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {depth > 0 && (
              <CornerDownRight size={12} className="text-slate-600 shrink-0" />
            )}
            <span className="shrink-0">{getPartIcon(part.type)}</span>
            <span className="truncate">{part.name}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            {getPartBadge(part)}

            {/* Quick action: Link to chassis */}
            {part.type !== "chassis" && possibleParents.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setParent(
                    part.id,
                    part.parentId ? null : possibleParents[0].id,
                  );
                }}
                title={
                  part.parentId
                    ? "Gỡ khỏi linh kiện cha"
                    : `Gắn vào ${possibleParents[0].name}`
                }
                className={`p-1 rounded hover:bg-slate-700 transition ${
                  part.parentId
                    ? "text-indigo-400"
                    : "text-slate-500 opacity-0 group-hover:opacity-100"
                }`}
              >
                <LinkIcon size={12} />
              </button>
            )}

            {/* Delete button on hover */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removePart(part.id);
              }}
              title="Xóa linh kiện"
              className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {/* Render con */}
        {children.map((child) => renderPartRow(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="h-64 flex flex-col border-b border-slate-800 overflow-hidden">
      <div className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
        <span>Cấu trúc Robot</span>
        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">
          {parts.length} linh kiện
        </span>
      </div>

      <div className="flex-1 p-2 overflow-y-auto space-y-1">
        {parts.length === 0 ? (
          <div className="text-center text-slate-600 italic text-xs mt-6">
            Chưa có linh kiện nào trong bản vẽ.
          </div>
        ) : (
          rootParts.map((part) => renderPartRow(part, 0))
        )}
      </div>
    </div>
  );
}
