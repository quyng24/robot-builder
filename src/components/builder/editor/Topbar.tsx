"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Save, FolderOpen } from "lucide-react";
import { leaveSimulationSession } from "@/simulation";
import { useRobotStore } from "@/store/useRobotStore";
import { RobotPart, Vector3D } from "@/types/robot";
import SimulationTransport from "./SimulationTransport";

const DEFAULT_PROJECT_NAME = "My_First_Rover";

type RobotProject = {
  version: 1;
  name: string;
  parts: RobotPart[];
};

function isVector3D(value: unknown): value is Vector3D {
  return (
    Array.isArray(value) &&
    value.length === 3 &&
    value.every((coordinate) => typeof coordinate === "number")
  );
}

function isRobotPart(value: unknown): value is RobotPart {
  if (!value || typeof value !== "object") return false;

  const part = value as Record<string, unknown>;
  return (
    typeof part.id === "string" &&
    typeof part.type === "string" &&
    typeof part.name === "string" &&
    isVector3D(part.position) &&
    isVector3D(part.rotation) &&
    isVector3D(part.scale) &&
    (typeof part.parentId === "string" || part.parentId === null) &&
    typeof part.properties === "object" &&
    part.properties !== null &&
    !Array.isArray(part.properties)
  );
}

function getProjectName(name: string) {
  const sanitizedName = name
    .trim()
    .replace(/\.json$/i, "")
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_");

  return sanitizedName || DEFAULT_PROJECT_NAME;
}

export default function Topbar() {
  const { parts, loadProject } = useRobotStore();
  const [projectName, setProjectName] = useState(DEFAULT_PROJECT_NAME);
  const [status, setStatus] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveProject = () => {
    const name = getProjectName(projectName);
    const project: RobotProject = {
      version: 1,
      name,
      parts,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(project, null, 2)], {
        type: "application/json",
      }),
    );
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `${name}.json`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);

    setProjectName(name);
    setStatus("Project saved");
  };

  const openProject = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;

    try {
      const project = JSON.parse(await file.text()) as Partial<RobotProject>;
      if (!Array.isArray(project.parts) || !project.parts.every(isRobotPart)) {
        throw new Error("Invalid project file");
      }

      loadProject(project.parts);
      leaveSimulationSession();
      setProjectName(getProjectName(project.name || file.name));
      setStatus("Project opened");
    } catch {
      setStatus("Invalid .json project file");
    }
  };

  return (
    <header className="h-12 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <span className="font-bold text-indigo-400 tracking-wider">
          ROBOT_CRAFT v0.1
        </span>
        <div className="h-4 w-px bg-slate-700" />
        <label className="flex items-center text-xs text-slate-400">
          Project:
          <input
            aria-label="Project filename"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            className="ml-1 w-36 bg-transparent text-slate-300 outline-none focus:text-white"
          />
          <span>.json</span>
        </label>
      </div>

      <SimulationTransport />

      <div className="flex items-center gap-2">
        <span aria-live="polite" className="text-xs text-slate-400">
          {status}
        </span>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={openProject}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded transition"
        >
          <FolderOpen size={14} /> Open
        </button>
        <button
          type="button"
          onClick={saveProject}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs text-white rounded transition"
        >
          <Save size={14} /> Save
        </button>
      </div>
    </header>
  );
}
