"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Activity,
  ShieldCheck,
  Terminal,
  Code2,
} from "lucide-react";

export default function CodeIdePreview() {
  const [activeTab, setActiveTab] = useState<"simulation" | "code">(
    "simulation",
  );
  const [isRunning, setIsRunning] = useState(true);
  const [carX, setCarX] = useState(20);
  const [distance, setDistance] = useState(4.2);
  const [isBraking, setIsBraking] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCarX((prev) => {
        const obstacleX = 220;
        const currentDistance = Math.max(0.2, (obstacleX - prev) / 40);
        setDistance(parseFloat(currentDistance.toFixed(2)));

        if (prev >= 170) {
          setIsBraking(true);
          return 170;
        }

        setIsBraking(false);
        return prev + 1.2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleReset = () => {
    setCarX(20);
    setDistance(4.5);
    setIsBraking(false);
    setIsRunning(true);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-950/90 border border-slate-800 shadow-2xl shadow-indigo-950/40 font-mono text-sm">
      {/* Glow ambient effect around panel */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOPBAR */}
      <div className="relative flex items-center justify-between bg-slate-900/90 px-4 py-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("simulation")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "simulation"
                ? "bg-indigo-600/30 text-cyan-300 border border-indigo-500/40 shadow-xs"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Activity size={13} className="text-cyan-400" />
            <span>Interactive 3D Rover View</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "code"
                ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-xs"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Code2 size={13} className="text-indigo-400" />
            <span>robosim_agent.js</span>
          </button>
        </div>

        {/* WINDOW CONTROLS */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {activeTab === "simulation" ? (
        <div className="relative p-6 bg-radial from-slate-900 to-slate-950 min-h-80 flex flex-col justify-between overflow-hidden select-none">
          {/* Engineering Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415518_1px,transparent_1px),linear-gradient(to_bottom,#33415518_1px,transparent_1px)] bg-size-[1.5rem_1.5rem] pointer-events-none" />

          {/* TELEMETRY HUD HEADER */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${isBraking ? "bg-rose-500 animate-ping" : "bg-emerald-400 animate-pulse"}`}
              />
              <span
                className={
                  isBraking
                    ? "text-rose-400 font-bold"
                    : "text-emerald-400 font-medium"
                }
              >
                {isBraking
                  ? "AUTO_BRAKE_ENGAGED"
                  : "RUNNING · 60 HZ FIXED TIMESTEP"}
              </span>
            </div>
            <div className="text-slate-400 flex items-center gap-3">
              <span>
                LIDAR:{" "}
                <strong
                  className={isBraking ? "text-rose-400" : "text-cyan-300"}
                >
                  {distance}m
                </strong>
              </span>
              <span>
                MOTOR:{" "}
                <strong
                  className={isBraking ? "text-slate-500" : "text-amber-300"}
                >
                  {isBraking ? "0 RPM" : "15 rad/s"}
                </strong>
              </span>
            </div>
          </div>

          {/* 3D ARENA VISUALIZATION */}
          <div className="relative my-8 h-32 flex items-center border-b border-slate-800">
            {/* Ground Track */}
            <div className="absolute bottom-4 left-0 right-0 h-1 bg-slate-800/80">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#475569_0_10px,transparent_10px_20px)] opacity-50" />
            </div>

            {/* ROBOT MODEL (DIFFERENTIAL DRIVE ROVER) */}
            <div
              style={{ transform: `translateX(${carX}px)` }}
              className="absolute bottom-5 transition-transform duration-75 flex flex-col items-center"
            >
              {/* Laser Beam from Sensor */}
              <div
                style={{
                  width: `${Math.max(0, 220 - carX - 60)}px`,
                  left: "60px",
                }}
                className={`absolute top-4 h-0.5 transition-colors ${
                  isBraking
                    ? "bg-rose-500 shadow-[0_0_12px_#f43f5e]"
                    : "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                }`}
              >
                {/* Laser scan pulse */}
                <div className="w-2 h-2 rounded-full bg-white absolute right-0 top-1/2 -translate-y-1/2 shadow-xs" />
              </div>

              {/* Chassis Box */}
              <div className="relative w-16 h-8 bg-linear-to-r from-indigo-600 to-indigo-500 rounded-md border border-indigo-400/50 shadow-md flex items-center justify-between px-2">
                <span className="text-[9px] font-bold text-indigo-100">
                  ROVER
                </span>
                {/* Sensor Eye */}
                <div
                  className={`w-2.5 h-2.5 rounded-full ${isBraking ? "bg-rose-400" : "bg-cyan-300"} shadow-xs`}
                />
              </div>

              {/* 2 Wheels */}
              <div className="w-18 flex justify-between -mt-1 z-10">
                <div
                  className={`w-4 h-4 rounded-full bg-slate-800 border-2 border-amber-400 shadow-xs ${isRunning && !isBraking ? "animate-spin" : ""}`}
                />
                <div
                  className={`w-4 h-4 rounded-full bg-slate-800 border-2 border-amber-400 shadow-xs ${isRunning && !isBraking ? "animate-spin" : ""}`}
                />
              </div>
            </div>

            {/* OBSTACLE WALL */}
            <div className="absolute right-12 bottom-4 w-5 h-20 bg-linear-to-t from-rose-950 to-rose-700 border-2 border-rose-500/80 rounded-sm shadow-lg shadow-rose-950/60 flex flex-col items-center justify-center">
              <span className="text-[9px] font-bold text-rose-200 rotate-90 uppercase tracking-widest">
                WALL
              </span>
            </div>
          </div>

          {/* TELEMETRY FOOTER STATUS */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-sans">
              <ShieldCheck size={14} className="text-emerald-400" />
              Rapier Physics Engine: Deterministic Joint
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsRunning(!isRunning)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition flex items-center gap-1.5 text-[11px]"
              >
                {isRunning ? <Pause size={12} /> : <Play size={12} />}
                <span>{isRunning ? "Tạm dừng" : "Tiếp tục"}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition flex items-center gap-1.5 text-[11px]"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* CODE EDITOR VIEW WITH REALISTIC SYNTAX HIGHLIGHTING */
        <div className="p-5 bg-slate-950 min-h-80 overflow-x-auto text-xs leading-relaxed font-mono">
          <div className="space-y-1">
            <p className="text-slate-500">
              || 1. Khởi tạo Robot Controller và Linh kiện
            </p>
            <p>
              <span className="text-purple-400">import</span> &#123;{" "}
              <span className="text-cyan-300">RobotSession</span>,{" "}
              <span className="text-cyan-300">LidarSensor</span>,{" "}
              <span className="text-cyan-300">DifferentialDrive</span> &#125;{" "}
              <span className="text-purple-400">from</span>{" "}
              <span className="text-emerald-400">
                &apos;@robosim/core&apos;
              </span>
              ;
            </p>
            <p className="text-transparent">.</p>
            <p>
              <span className="text-purple-400">const</span> robot ={" "}
              <span className="text-purple-400">new</span>{" "}
              <span className="text-cyan-300">RobotSession</span>();
            </p>
            <p>
              <span className="text-purple-400">const</span> lidar ={" "}
              <span className="text-purple-400">new</span>{" "}
              <span className="text-cyan-300">LidarSensor</span>(&#123; range:{" "}
              <span className="text-amber-300">5.0</span> &#125;);
            </p>
            <p>
              <span className="text-purple-400">const</span> drive ={" "}
              <span className="text-purple-400">new</span>{" "}
              <span className="text-cyan-300">DifferentialDrive</span>(&#123;
              maxSpeed: <span className="text-amber-300">15</span> &#125;);
            </p>
            <p className="text-transparent">.</p>
            <p className="text-slate-500">
              || 2. Vòng lặp phản xạ mô phỏng 60 FPS
            </p>
            <p>
              robot.<span className="text-blue-400">onPhysicsTick</span>(()
              =&gt; &#123;
            </p>
            <p className="pl-4">
              <span className="text-purple-400">const</span> dist = lidar.
              <span className="text-blue-400">readDistance</span>();
            </p>
            <p className="pl-4">
              <span className="text-purple-400">if</span> (dist !=={" "}
              <span className="text-purple-400">null</span> &amp;&amp; dist &lt;{" "}
              <span className="text-amber-300">1.5</span>) &#123;
            </p>
            <p className="pl-8 text-rose-400">
              drive.<span className="text-blue-400">brake</span>();{" "}
              <span className="text-slate-500">
                || Phanh khẩn cấp dừng trước vật cản
              </span>
            </p>
            <p className="pl-4">
              &#125; <span className="text-purple-400">else</span> &#123;
            </p>
            <p className="pl-8 text-emerald-400">
              drive.<span className="text-blue-400">setForward</span>(
              <span className="text-amber-300">15</span>);{" "}
              <span className="text-slate-500">|| Tiến đều theo trục Z</span>
            </p>
            <p className="pl-4">&#125;</p>
            <p>&#125;);</p>
          </div>
        </div>
      )}

      {/* FOOTER BAR */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-cyan-400" />
          <span className="font-mono text-[11px] text-slate-300">
            Simulation Status: Ready
          </span>
        </div>
        <button
          type="button"
          onClick={() => setActiveTab("simulation")}
          className="bg-linear-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold px-3 py-1 rounded-lg text-xs transition shadow-sm shadow-indigo-600/30 flex items-center gap-1.5"
        >
          <Play size={11} className="fill-white" />
          <span>Chạy thử nghiệm</span>
        </button>
      </div>
    </div>
  );
}
