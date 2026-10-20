"use client";

import { Settings, Trash2, Cpu, Palette, Box, Radio, Disc } from "lucide-react";
import { useRobotStore } from "@/store/useRobotStore";

const PRESET_COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#eab308", // Yellow
  "#ef4444", // Red
  "#8b5cf6", // Purple
  "#f97316", // Orange
  "#64748b", // Slate
  "#1e293b", // Dark slate
];

const radToDeg = (rad: number) => Math.round(((rad * 180) / Math.PI) * 10) / 10;
const degToRad = (deg: number) =>
  parseFloat(((deg * Math.PI) / 180).toFixed(4));

export default function PropertiesPanel() {
  const {
    parts,
    selectedPartId,
    removePart,
    updateTransform,
    updateName,
    updateProperties,
    updateMotorConfig,
  } = useRobotStore();

  const selectedPartData = parts.find((p) => p.id === selectedPartId);

  return (
    <div className="flex-1 flex flex-col bg-slate-900/60 overflow-hidden">
      <div className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
        <span>Thuộc tính linh kiện</span>
        <Settings size={14} className="text-slate-500" />
      </div>

      {selectedPartData ? (
        <div className="flex-1 p-3 text-xs space-y-4 overflow-y-auto">
          {/* TÊN LINH KIỆN */}
          <div>
            <label className="text-slate-500 block mb-1 text-[11px] font-medium">
              Tên linh kiện
            </label>
            <input
              type="text"
              value={selectedPartData.name}
              onChange={(e) => updateName(selectedPartData.id, e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
              placeholder="Component name..."
            />
          </div>

          {/* MÀU SẮC */}
          <div>
            <label className="text-slate-500 mb-1.5 text-[11px] font-medium flex items-center gap-1.5">
              <Palette size={12} className="text-slate-400" /> Màu sắc
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={selectedPartData.properties?.color || "#3b82f6"}
                onChange={(e) =>
                  updateProperties(selectedPartData.id, {
                    color: e.target.value,
                  })
                }
                className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer p-0.5"
              />
              <div className="flex flex-wrap gap-1 flex-1">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() =>
                      updateProperties(selectedPartData.id, { color: c })
                    }
                    style={{ backgroundColor: c }}
                    className={`w-5 h-5 rounded-full border transition-transform hover:scale-110 ${
                      selectedPartData.properties?.color === c
                        ? "border-white ring-1 ring-white"
                        : "border-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* VỊ TRÍ X, Y, Z */}
          <div>
            <label className="text-slate-500 block mb-1 text-[11px] font-medium">
              Vị trí (m)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-slate-500 block mb-0.5 text-[10px]">
                  X
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
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono text-center"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-0.5 text-[10px]">
                  Y
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
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono text-center"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-0.5 text-[10px]">
                  Z
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
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono text-center"
                />
              </div>
            </div>
          </div>

          {/* GÓC QUAY X, Y, Z (HIỂN THỊ ĐỘ ° - LƯU RADIAN) */}
          <div>
            <label className="text-slate-500 block mb-1 text-[11px] font-medium">
              Góc xoay (°)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-slate-500 block mb-0.5 text-[10px]">
                  X (°)
                </label>
                <input
                  type="number"
                  step="5"
                  value={radToDeg(selectedPartData.rotation[0])}
                  onChange={(e) => {
                    const deg = parseFloat(e.target.value) || 0;
                    updateTransform(selectedPartData.id, {
                      rotation: [
                        degToRad(deg),
                        selectedPartData.rotation[1],
                        selectedPartData.rotation[2],
                      ],
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono text-center"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-0.5 text-[10px]">
                  Y (°)
                </label>
                <input
                  type="number"
                  step="5"
                  value={radToDeg(selectedPartData.rotation[1])}
                  onChange={(e) => {
                    const deg = parseFloat(e.target.value) || 0;
                    updateTransform(selectedPartData.id, {
                      rotation: [
                        selectedPartData.rotation[0],
                        degToRad(deg),
                        selectedPartData.rotation[2],
                      ],
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono text-center"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-0.5 text-[10px]">
                  Z (°)
                </label>
                <input
                  type="number"
                  step="5"
                  value={radToDeg(selectedPartData.rotation[2])}
                  onChange={(e) => {
                    const deg = parseFloat(e.target.value) || 0;
                    updateTransform(selectedPartData.id, {
                      rotation: [
                        selectedPartData.rotation[0],
                        selectedPartData.rotation[1],
                        degToRad(deg),
                      ],
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono text-center"
                />
              </div>
            </div>
          </div>

          {/* TỶ LỆ / SCALE (CHO WALL / BOX) */}
          {["wall", "box"].includes(selectedPartData.type) && (
            <div>
              <label className="text-slate-500 block mb-1 text-[11px] font-medium">
                Kích thước (Scale)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-500 block mb-0.5 text-[10px]">
                    Scale X
                  </label>
                  <input
                    type="number"
                    step="0.2"
                    min="0.1"
                    value={selectedPartData.scale[0]}
                    onChange={(e) =>
                      updateTransform(selectedPartData.id, {
                        scale: [
                          parseFloat(e.target.value) || 1,
                          selectedPartData.scale[1],
                          selectedPartData.scale[2],
                        ],
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-0.5 text-[10px]">
                    Scale Y
                  </label>
                  <input
                    type="number"
                    step="0.2"
                    min="0.1"
                    value={selectedPartData.scale[1]}
                    onChange={(e) =>
                      updateTransform(selectedPartData.id, {
                        scale: [
                          selectedPartData.scale[0],
                          parseFloat(e.target.value) || 1,
                          selectedPartData.scale[2],
                        ],
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-0.5 text-[10px]">
                    Scale Z
                  </label>
                  <input
                    type="number"
                    step="0.2"
                    min="0.1"
                    value={selectedPartData.scale[2]}
                    onChange={(e) =>
                      updateTransform(selectedPartData.id, {
                        scale: [
                          selectedPartData.scale[0],
                          selectedPartData.scale[1],
                          parseFloat(e.target.value) || 1,
                        ],
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono text-center"
                  />
                </div>
              </div>
            </div>
          )}

          {/* THÔNG SỐ RIÊNG: CHASSIS */}
          {selectedPartData.type === "chassis" && (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Box size={14} className="text-indigo-400" />
                <span>Thông số Khung xe (Chassis)</span>
              </div>
              <div>
                <label className="text-slate-500 block mb-0.5 text-[10px]">
                  Khối lượng Mass (kg)
                </label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={selectedPartData.properties?.mass ?? 15}
                  onChange={(e) =>
                    updateProperties(selectedPartData.id, {
                      mass: parseFloat(e.target.value) || 15,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>
          )}

          {/* THÔNG SỐ RIÊNG: SENSOR */}
          {selectedPartData.type === "sensor" && (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Radio size={14} className="text-rose-400" />
                <span>Thông số Cảm biến khoảng cách</span>
              </div>
              <div>
                <label className="text-slate-500 block mb-0.5 text-[10px]">
                  Tầm quét Range (m)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="30"
                  value={selectedPartData.properties?.range ?? 5}
                  onChange={(e) =>
                    updateProperties(selectedPartData.id, {
                      range: parseFloat(e.target.value) || 5,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>
          )}

          {/* THÔNG SỐ RIÊNG: WHEEL & MOTOR */}
          {selectedPartData.type === "wheel" && (
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <Disc size={14} className="text-amber-400" />
                <span>Kích thước bánh xe</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-500 block mb-0.5 text-[10px]">
                    Bán kính Radius (m)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    max="2.0"
                    value={selectedPartData.properties?.radius ?? 0.5}
                    onChange={(e) =>
                      updateProperties(selectedPartData.id, {
                        radius: parseFloat(e.target.value) || 0.5,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-0.5 text-[10px]">
                    Độ dày Width (m)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.05"
                    max="1.0"
                    value={selectedPartData.properties?.width ?? 0.4}
                    onChange={(e) =>
                      updateProperties(selectedPartData.id, {
                        width: parseFloat(e.target.value) || 0.4,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400 font-medium pt-2 border-t border-slate-800/60">
                <Cpu size={14} className="text-indigo-400" />
                <span>Cấu hình Động cơ (Motor)</span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-slate-500 block mb-0.5 text-[10px]">
                    Bên dẫn động (Drive Side)
                  </label>
                  <select
                    value={selectedPartData.motorConfig?.driveSide || "none"}
                    onChange={(e) => {
                      updateMotorConfig(selectedPartData.id, {
                        driveSide: e.target.value as "left" | "right" | "none",
                      });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500"
                  >
                    <option value="none">
                      Tự do (Wheel freedom / Không động cơ)
                    </option>
                    <option value="left">Bên Trái (Left Motor)</option>
                    <option value="right">Bên Phải (Right Motor)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-500 block mb-0.5 text-[10px]">
                      Tốc độ Max (rad/s)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      max="100"
                      value={
                        selectedPartData.motorConfig?.maxSpeed ??
                        selectedPartData.properties?.maxSpeed ??
                        15
                      }
                      onChange={(e) =>
                        updateMotorConfig(selectedPartData.id, {
                          maxSpeed: parseFloat(e.target.value) || 15,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-0.5 text-[10px]">
                      Torque Max (Nm)
                    </label>
                    <input
                      type="number"
                      step="5"
                      min="1"
                      max="500"
                      value={
                        selectedPartData.motorConfig?.maxTorque ??
                        selectedPartData.properties?.motorTorque ??
                        50
                      }
                      onChange={(e) =>
                        updateMotorConfig(selectedPartData.id, {
                          maxTorque: parseFloat(e.target.value) || 50,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-slate-200 outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NÚT XOÁ LINH KIỆN */}
          <div className="pt-2">
            <button
              onClick={() => removePart(selectedPartData.id)}
              className="w-full py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded flex items-center justify-center gap-2 text-rose-400 font-medium transition-colors"
            >
              <Trash2 size={14} /> Xóa linh kiện
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-slate-600 text-xs italic my-auto">
          Chọn một linh kiện trên Cây hoặc Khung nhìn 3D để chỉnh sửa thuộc
          tính.
        </div>
      )}
    </div>
  );
}
