import { useRobotStore } from "@/store/useRobotStore"

export default function Viewport() {
    const { mode } = useRobotStore();
    return (
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
    )
}