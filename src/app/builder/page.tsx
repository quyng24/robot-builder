"use client";
import { useRobotStore } from "@/store/useRobotStore";
import {
  Box,
  Disc,
  FolderOpen,
  Hammer,
  Play,
  Radio,
  Save,
  Settings,
  Trash2,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function BuilderPage() {
  const [mode, setMode] = useState<"build" | "simulate">("build");

  const {
    parts,
    selectedPartId,
    addPart,
    selectPart,
    removePart,
    updateName,
    updateTransform,
    updateProperties,
  } = useRobotStore();
  const selectedPartData = parts.find((p) => p.id === selectedPartId);

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
      default:
        return <Box size={14} />;
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-200 select-none overflow-hidden">
      {/* 1. TOPBAR*/}
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

        {/* Mode Toggles */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setMode("build")}
            className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-md transition-all ${mode === "build" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
          >
            <Hammer size={14} /> Build mode
          </button>
          <button
            onClick={() => setMode("simulate")}
            className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-md transition-all ${mode === "simulate" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
          >
            <Play size={14} /> Run emulator
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

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden">
        {/* 2. LEFT SIDEBAR: Component library */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col">
          <div className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
            Component library
          </div>

          <div className="p-3 grid grid-cols-2 gap-2 overflow-y-auto">
            {/* Component card */}
            <div
              onClick={() => addPart("chassis")}
              className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition group"
            >
              <Box
                className="text-indigo-400 group-hover:scale-110 transition"
                size={24}
              />
              <span className="text-xs">Chassis</span>
            </div>

            <div
              onClick={() => addPart("wheel")}
              className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition group"
            >
              <Disc
                className="text-amber-400 group-hover:scale-110 transition"
                size={24}
              />
              <span className="text-xs">Wheel</span>
            </div>

            <div
              onClick={() => addPart("motor")}
              className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition group"
            >
              <Zap
                className="text-emerald-400 group-hover:scale-110 transition"
                size={24}
              />
              <span className="text-xs">DC motor</span>
            </div>

            <div
              onClick={() => addPart("sensor")}
              className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition group"
            >
              <Radio
                className="text-rose-400 group-hover:scale-110 transition"
                size={24}
              />
              <span className="text-xs">KC sensor</span>
            </div>
          </div>
        </aside>

        {/* 3. CENTER: 3D Canvas Placeholder */}
        <main className="flex-1 bg-slate-950 relative flex items-center justify-center group">
          {/* 3D Space Mesh Mockup */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px]" />

          <div className="text-center z-10 pointer-events-none">
            <p className="text-slate-600 font-mono text-sm">
              3D_VIEWPORT_CANVAS_PLACEHOLDER
            </p>
            <p className="text-slate-700 text-xs mt-1">
              Mode: {mode.toUpperCase()}
            </p>
          </div>

          {/* Gizmo/Coordinate Indicator */}
          <div className="absolute bottom-4 left-4 bg-slate-900/80 p-2 rounded border border-slate-800 text-[10px] font-mono text-slate-500">
            X: 0.00 | Y: 0.00 | Z: 0.00
          </div>
        </main>

        {/* 4. RIGHT SIDEBAR: Tree & Properties */}
        <aside className="w-72 border-l border-slate-800 bg-slate-900 flex flex-col">
          {/* Section: Robot Tree */}
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

          {/* Section: Properties Panel */}
          <div className="h-72 flex flex-col bg-slate-900/60">
            <div className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
              <span>Component properties</span>
              <Settings size={14} className="text-slate-500" />
            </div>

            {selectedPartData ? (
              <div className="p-3 text-xs space-y-3 overflow-y-auto">
                {/* COMPONENT NAME */}
                <div>
                  <label className="text-slate-500 block mb-1">
                    Component Name
                  </label>
                  <input
                    type="text"
                    value={selectedPartData.name}
                    onChange={(e) =>
                      updateName(selectedPartData.id, e.target.value)
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500"
                    placeholder="Component name..."
                  />
                </div>

                {/* POSITION X, Y, Z */}
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {/* Trục X */}
                  <div>
                    <label className="text-slate-500 block mb-0.5 text-[10px]">
                      POS X
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={selectedPartData.position[0]}
                      onChange={(e) =>
                        updateTransform(selectedPartData.id, {
                          position: [
                            parseFloat(e.target.value) || 0,
                            selectedPartData.position[1],
                            selectedPartData.position[2],
                          ],
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  {/* Trục Y */}
                  <div>
                    <label className="text-slate-500 block mb-0.5 text-[10px]">
                      POS Y
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={selectedPartData.position[1]}
                      onChange={(e) =>
                        updateTransform(selectedPartData.id, {
                          position: [
                            selectedPartData.position[0],
                            parseFloat(e.target.value) || 0,
                            selectedPartData.position[2],
                          ],
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  {/* Trục Z */}
                  <div>
                    <label className="text-slate-500 block mb-0.5 text-[10px]">
                      POS Z
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={selectedPartData.position[2]}
                      onChange={(e) =>
                        updateTransform(selectedPartData.id, {
                          position: [
                            selectedPartData.position[0],
                            selectedPartData.position[1],
                            parseFloat(e.target.value) || 0,
                          ],
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => removePart(selectedPartData.id)}
                    className="w-full py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded flex items-center justify-center gap-2 text-rose-400 font-medium transition-colors"
                  >
                    <Trash2 size={14} /> Delete component
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-600 text-xs italic my-auto">
                Click on a component in the Tree to edit it.
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
