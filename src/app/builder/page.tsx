"use client";
import PropertiesPanel from "@/components/builder/editor/PropetiesPanel";
import RobotTree from "@/components/builder/editor/RobotTree";
import SidebarLeft from "@/components/builder/editor/SidebarLeft";
import SidebarRight from "@/components/builder/editor/SidebarRight";
import Topbar from "@/components/builder/editor/Topbar";
import Viewport from "@/components/builder/editor/Viewport";
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
  const {
    mode,
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

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-200 select-none overflow-hidden">
      <Topbar />
      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden">
        {/* 2. LEFT SIDEBAR: Component library */}
        <SidebarLeft />

        {/* 3. CENTER: 3D Canvas Placeholder */}
        <Viewport />

        {/* 4. RIGHT SIDEBAR: Tree & Properties */}
        <SidebarRight />
      </div>
    </div>
  );
}
