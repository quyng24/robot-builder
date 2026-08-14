import SidebarLeft from "@/components/builder/editor/SidebarLeft";
import SidebarRight from "@/components/builder/editor/SidebarRight";
import Topbar from "@/components/builder/editor/Topbar";
import Viewport from "@/components/builder/editor/Viewport";

export default function BuilderPage() {
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
