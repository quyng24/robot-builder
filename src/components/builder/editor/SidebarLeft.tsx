import { Box, Disc, Zap, Radio } from 'lucide-react';
import { useRobotStore } from '@/store/useRobotStore';

export default function SidebarLeft() {
    const addPart = useRobotStore((state) => state.addPart);

    return (
        <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col">
            <div className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                Component library
            </div>

            <div className="p-3 grid grid-cols-2 gap-2 overflow-y-auto">
                {/* Component card */}
                <div
                    onClick={() => addPart("chassis")}
                    className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition group"
                >
                    <Box
                        className="text-indigo-400 group-hover:scale-110 transition"
                        size={24}
                    />
                    <span className="text-xs">Chassis</span>
                </div>

                <div
                    onClick={() => addPart("wheel")}
                    className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition group"
                >
                    <Disc
                        className="text-amber-400 group-hover:scale-110 transition"
                        size={24}
                    />
                    <span className="text-xs">Wheel</span>
                </div>

                <div
                    onClick={() => addPart("motor")}
                    className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition group"
                >
                    <Zap
                        className="text-emerald-400 group-hover:scale-110 transition"
                        size={24}
                    />
                    <span className="text-xs">DC motor</span>
                </div>

                <div
                    onClick={() => addPart("sensor")}
                    className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition group"
                >
                    <Radio
                        className="text-rose-400 group-hover:scale-110 transition"
                        size={24}
                    />
                    <span className="text-xs">KC sensor</span>
                </div>
            </div>
        </aside>
    );
}