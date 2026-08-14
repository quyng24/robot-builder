"use client";
import { Play, Hammer, Save, FolderOpen } from "lucide-react";
import { useRobotStore } from "@/store/useRobotStore";

export default function Topbar() {
  const { mode, setMode } = useRobotStore();

  return (
    <header className="h-12 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <span className="font-bold text-indigo-400 tracking-wider">
          ROBOT_CRAFT v0.1
        </span>
        <div className="h-4 w-px bg-slate-700" />
        <span className="text-xs text-slate-400">
          Project: My_First_Rover.json
        </span>
      </div>

      <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
        <button
          onClick={() => setMode("build")}
          className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-md transition-all ${mode === "build" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
        >
          <Hammer size={14} /> Build Mode
        </button>
        <button
          onClick={() => setMode("simulate")}
          className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-md transition-all ${mode === "simulate" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
        >
          <Play size={14} /> Run Emulator
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded transition">
          <FolderOpen size={14} /> Open
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs text-white rounded transition">
          <Save size={14} /> Save
        </button>
      </div>
    </header>
  );
}
