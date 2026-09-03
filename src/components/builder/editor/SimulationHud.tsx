"use client";

import { useSimulationStatus, useSimulationWorld } from "@/simulation";

function formatElapsed(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const rest = seconds - mins * 60;
  return `${mins}:${rest.toFixed(1).padStart(4, "0")}`;
}

export default function SimulationHud() {
  const status = useSimulationStatus();
  const world = useSimulationWorld();
  const sensors = Object.values(world.sensors);
  const motors = Object.values(world.motors);
  const chassis = Object.values(world.bodies).find(
    (body) => body.type === "chassis",
  );

  return (
    <div className="absolute top-4 left-4 z-10 pointer-events-none font-mono">
      <p className="text-slate-600 text-sm tracking-widest">3D_VIEWPORT</p>
      <p className="text-xs font-bold mt-1 text-emerald-500">MODE: SIMULATE</p>
      <p className="text-[10px] text-emerald-600/80 mt-0.5 tracking-widest">
        SESSION: {status.toUpperCase()}
      </p>
      <dl className="mt-3 space-y-1 text-[10px] text-slate-400 tracking-wide">
        <div className="flex gap-2">
          <dt className="text-slate-600">t</dt>
          <dd>{formatElapsed(world.tick?.elapsed ?? 0)}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-slate-600">step</dt>
          <dd>{world.tick?.step ?? 0}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-slate-600">blocked</dt>
          <dd
            className={world.autoBraking ? "text-red-400" : "text-emerald-500"}
          >
            {world.autoBraking ? "YES" : "NO"}
          </dd>
        </div>
        {chassis && (
          <div className="flex gap-2">
            <dt className="text-slate-600">pos</dt>
            <dd>
              {chassis.position[0].toFixed(2)} {chassis.position[1].toFixed(2)}{" "}
              {chassis.position[2].toFixed(2)}
            </dd>
          </div>
        )}
        {sensors.map((sensor) => (
          <div key={sensor.id} className="flex gap-2">
            <dt className="text-slate-600">range</dt>
            <dd>
              {sensor.distance === null
                ? `— / ${sensor.range.toFixed(1)}`
                : `${sensor.distance.toFixed(2)} / ${sensor.range.toFixed(1)}`}
            </dd>
          </div>
        ))}
        {motors.length > 0 && (
          <div className="flex gap-2">
            <dt className="text-slate-600">motors</dt>
            <dd>
              {motors
                .map((motor) => (motor.enabled ? motor.targetSpeed : 0))
                .join(" · ")}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
