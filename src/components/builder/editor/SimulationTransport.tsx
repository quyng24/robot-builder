"use client";

import {
  beginSimulationSession,
  leaveSimulationSession,
  pauseSimulationSession,
  resetSimulationSession,
  resumeSimulationSession,
  stepSimulationSession,
  stopSimulationSession,
  useSimulationStatus,
} from "@/simulation";
import { useRobotStore } from "@/store/useRobotStore";
import { Pause, Play, RotateCcw, SkipForward, Square } from "lucide-react";

export default function SimulationTransport() {
  const status = useSimulationStatus();
  const { mode, parts, setMode } = useRobotStore();
  const simulating = mode === "simulate";
  const running = status === "running";

  return (
    <div className="flex items-center gap-1">
      <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
        <button
          type="button"
          onClick={() => {
            leaveSimulationSession();
            setMode("build");
          }}
          className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-md transition-all ${mode === "build" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
        >
          Build
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("simulate");
            if (status === "running") return;
            if (status === "paused") {
              resumeSimulationSession();
              return;
            }
            beginSimulationSession(parts);
          }}
          className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-md transition-all ${simulating && running ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
        >
          <Play size={14} />
          {status === "paused" ? "Resume" : "Run"}
        </button>
      </div>

      {simulating && (
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            disabled={!running}
            onClick={() => pauseSimulationSession()}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400"
            title="Pause"
          >
            <Pause size={14} /> Pause
          </button>
          <button
            type="button"
            disabled={running}
            onClick={() => stepSimulationSession()}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400"
            title="Step one tick"
          >
            <SkipForward size={14} /> Step
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("simulate");
              resetSimulationSession(parts);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md text-slate-400 hover:text-white"
            title="Reset to t = 0"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            type="button"
            disabled={status === "idle" || status === "stopped"}
            onClick={() => stopSimulationSession()}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400"
            title="Stop session"
          >
            <Square size={14} /> Stop
          </button>
        </div>
      )}
    </div>
  );
}
