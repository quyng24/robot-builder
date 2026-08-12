'use client';

import { useState } from 'react';

export default function CodeIdePreview() {
    const [activeTab, setActiveTab] = useState<'code' | 'simulation'>('code');

    const sampleCode = `// Kịch bản điều khiển Robot di chuyển
import { RobotController, DistanceSensor, DCMotor } from 'robosim-sdk';

const robot = new RobotController();
const sensor = new DistanceSensor({ pin: 'A0' });
const leftMotor = new DCMotor({ pin: 'D1' });
const rightMotor = new DCMotor({ pin: 'D2' });

robot.onTick(() => {
  const distance = sensor.readDistance();
  
  if (distance < 15) {
    leftMotor.setSpeed(50);
    rightMotor.setSpeed(-50);
  } else {
    leftMotor.setSpeed(100);
    rightMotor.setSpeed(100);
  }
});`;

    return (
        <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 font-mono text-sm">
            <div className="flex items-center justify-between bg-slate-900 px-4 py-2 border-b border-slate-800">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-2 ${activeTab === 'code' ? 'bg-slate-800 text-cyan-400 border border-cyan-900' : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        <span>📄</span> main_script.js
                    </button>
                    <button
                        onClick={() => setActiveTab('simulation')}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-2 ${activeTab === 'simulation' ? 'bg-slate-800 text-cyan-400 border border-cyan-900' : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        <span>🎮</span> 3D World View
                    </button>
                </div>
                <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                </div>
            </div>

            {activeTab === 'code' ? (
                <div className="p-4 overflow-x-auto text-slate-300 bg-slate-950 min-h-80">
                    <pre className="text-xs leading-relaxed font-mono">
                        <code>{sampleCode}</code>
                    </pre>
                </div>
            ) : (
                <div className="relative min-h-80 bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 rounded-2xl bg-linear-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-4xl shadow-lg shadow-cyan-500/30 animate-pulse mb-4">
                        🤖
                    </div>
                    <p className="text-slate-300 font-sans font-semibold text-sm">Giả lập 3D (Three.js Canvas)</p>
                    <p className="text-slate-500 font-sans text-xs mt-1">Đang render motor speed: 100 RPM | Sensor: Active</p>
                </div>
            )}

            <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800/80 flex justify-between items-center text-xs text-slate-400 font-sans">
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Physics Engine: Active
                </span>
                <button
                    onClick={() => setActiveTab('simulation')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-xs transition"
                >
                    ▶ Run Simulation
                </button>
            </div>
        </div>
    );
}