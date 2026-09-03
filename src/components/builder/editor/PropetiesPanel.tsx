"use client";
import { Settings, Trash2, Cpu } from "lucide-react";
import { useRobotStore } from "@/store/useRobotStore";

export default function PropertiesPanel() {
  const {
    parts,
    selectedPartId,
    removePart,
    updateTransform,
    updateName,
    updateMotorConfig,
  } = useRobotStore();
  const selectedPartData = parts.find((p) => p.id === selectedPartId);

  return (
    <div className="h-72 flex flex-col bg-slate-900/60">
      <div className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
        <span>Component properties</span>
        <Settings size={14} className="text-slate-500" />
      </div>

      {selectedPartData ? (
        <div className="p-3 text-xs space-y-3 overflow-y-auto">
          {/* COMPONENT NAME */}
          <div>
            <label className="text-slate-500 block mb-1">Component Name</label>
            <input
              type="text"
              value={selectedPartData.name}
              onChange={(e) => updateName(selectedPartData.id, e.target.value)}
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

          {/* ROTATE X, Y, Z*/}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {/* Trục X */}
            <div>
              <label className="text-slate-500 block mb-0.5 text-[10px]">
                ROTATE X
              </label>
              <input
                type="number"
                step="0.1"
                value={selectedPartData.rotation[0]}
                onChange={(e) =>
                  updateTransform(selectedPartData.id, {
                    rotation: [
                      parseFloat(e.target.value) || 0,
                      selectedPartData.rotation[1],
                      selectedPartData.rotation[2],
                    ],
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            {/* Trục Y */}
            <div>
              <label className="text-slate-500 block mb-0.5 text-[10px]">
                ROTATE Y
              </label>
              <input
                type="number"
                step="0.1"
                value={selectedPartData.rotation[1]}
                onChange={(e) =>
                  updateTransform(selectedPartData.id, {
                    rotation: [
                      selectedPartData.rotation[0],
                      parseFloat(e.target.value) || 0,
                      selectedPartData.rotation[2],
                    ],
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="text-slate-500 block mb-0.5 text-[10px]">
                ROTATE Z
              </label>
              <input
                type="number"
                step="0.1"
                value={selectedPartData.rotation[2]}
                onChange={(e) =>
                  updateTransform(selectedPartData.id, {
                    rotation: [
                      selectedPartData.rotation[0],
                      selectedPartData.rotation[1],
                      parseFloat(e.target.value) || 0,
                    ],
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {selectedPartData.type === "wheel" && (
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5 mb-2">
                <Cpu size={14} className="text-indigo-400" />
                <label className="text-slate-400 font-medium text-xs">
                  Motor Settings
                </label>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-slate-500 block mb-0.5 text-[10px]">
                    DRIVE SIDE (L/R)
                  </label>
                  <select
                    value={selectedPartData.motorConfig?.driveSide || "none"}
                    onChange={(e) => {
                      if (updateMotorConfig) {
                        updateMotorConfig(selectedPartData.id, {
                          driveSide: e.target.value as
                            | "left"
                            | "right"
                            | "none",
                        });
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500"
                  >
                    <option value="none">None (Wheel freedom)</option>
                    <option value="left">Left Motor (Drive left)</option>
                    <option value="right">Right Motor (Drive right)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

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
  );
}
