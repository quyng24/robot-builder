"use client";
import dynamic from "next/dynamic";
import { useRobotStore } from "@/store/useRobotStore";
import { Move3d, Rotate3d } from "lucide-react";

const Scene3D = dynamic(() => import("../3d/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-slate-500 text-sm font-mono">
      Loading 3D Engine...
    </div>
  ),
});

export default function Viewport() {
  const { mode, parts, transformMode, setTransformMode, selectedPartId } =
    useRobotStore();
  const selectedPartData = parts.find((p) => p.id === selectedPartId);
  return (
    <main className="flex-1 bg-slate-950 relative flex items-center justify-center group">
      {/* 3D Space */}
      <Scene3D />

      {/* OVERLAY UI */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <p className="text-slate-600 font-mono text-sm tracking-widest">
          3D_VIEWPORT
        </p>
        <p
          className={`text-xs font-bold mt-1 ${mode === "build" ? "text-indigo-500" : "text-emerald-500"}`}
        >
          MODE: {mode.toUpperCase()}
        </p>
      </div>

      {mode === "build" && selectedPartId && (
        <div className="absolute top-4 right-4 z-10 flex bg-slate-900 border border-slate-700 rounded-lg p-1 shadow-xl">
          <button
            onClick={() => setTransformMode("translate")}
            className={`p-2 rounded transition-colors ${
              transformMode === "translate"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
            title="Di chuyển (Phím tắt: T)"
          >
            <Move3d size={18} />
          </button>
          <button
            onClick={() => setTransformMode("rotate")}
            className={`p-2 rounded transition-colors ${
              transformMode === "rotate"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
            title="Xoay (Phím tắt: R)"
          >
            <Rotate3d size={18} />
          </button>
        </div>
      )}

      <div className="absolute bottom-4 right-4 z-10 text-slate-500 text-xs flex gap-2">
        <kbd className="bg-slate-800 px-2 py-1 rounded">
          Chuột trái: Xoay Camera
        </kbd>
        <kbd className="bg-slate-800 px-2 py-1 rounded">Cuộn: Zoom</kbd>
      </div>

      {/* Gizmo/Coordinate Indicator */}
      <div className="absolute bottom-4 left-4 bg-slate-900/80 p-2 rounded border border-slate-800 text-[10px] font-mono text-slate-500">
        X: {selectedPartData?.position[0]} | Y: {selectedPartData?.position[1]}{" "}
        | Z: {selectedPartData?.position[2]}
      </div>
    </main>
  );
}
