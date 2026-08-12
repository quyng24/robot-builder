import Link from 'next/link';
import CodeIdePreview from '@/components/honepage/CodeIdePreview';

export default function HomePage() {
  const robotParts = [
    { name: 'Body', icon: '▣', desc: 'Chassis and Protective Housing' },
    { name: 'Motor', icon: '⚙', desc: 'DC rotary motor' },
    { name: 'Wheel', icon: '○', desc: 'Caster wheel' },
    { name: 'Sensor', icon: '◉', desc: 'Proximity/Line-following sensor' },
    { name: 'Servo', icon: '↻', desc: 'Rotation angle control motor' },
    { name: 'Camera', icon: '📷', desc: 'Image Sensors & AI' },
    { name: 'Battery', icon: '🔋', desc: 'Power Supply & Energy Management' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl text-cyan-400">
          <span className="text-2xl">🤖</span> RoboSim3D
        </div>
        <nav className="flex items-center gap-6 text-sm text-slate-300">
          <a href="#how-it-works" className="hover:text-cyan-400 transition">Procedure</a>
          <a href="#no-hardware" className="hover:text-cyan-400 transition">Expense</a>
          <a href="#library" className="hover:text-cyan-400 transition">Accessory</a>
          <a href="#simulator" className="hover:text-cyan-400 transition">3D Simulator</a>
          <a href="#built-for-learning" className="hover:text-cyan-400 transition">Study</a>
          <Link
            href="/builder"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-lg transition"
          >
            Create first robot
          </Link>
        </nav>
      </header>

      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold mb-4 border border-cyan-800">
            Robotics Learning & Simulation Platform
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Build. Simulate. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
              Make Robots.
            </span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Design 3D robots, program behavior and test in a simulation environment right in the browser.
          </p>
          <div className="flex flex-wrap gap-4">
            {/* Primary CTA */}
            <Link
              href="/builder"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-cyan-500/20"
            >
              Create first robot
            </Link>
            {/* Secondary CTA */}
            <a
              href="#simulator"
              className="border border-slate-700 hover:border-slate-500 text-slate-300 font-medium px-6 py-3.5 rounded-xl transition"
            >
              Explore Simulator
            </a>
          </div>
          <p className="mt-5 text-sm text-slate-500 flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            No need to buy an Arduino, motor or sensor to get started
          </p>
        </div>

        {/* Hero Code IDE / Simulation Tab Component */}
        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-2 shadow-2xl">
          <CodeIdePreview />
        </div>
      </section>

      {/* No Hardware Required Section */}
      <section id="no-hardware" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold mb-4 border border-cyan-800">
            No Hardware Required
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Start building without buying hardware.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            No need to order Arduino, motors or sensors in advance. Every component is accurately simulated
            in the browser — learn, trial and error as much as possible, completely free, before you
            Spend money to buy real hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Traditional path */}
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">
              Traditional learning methods
            </h3>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex justify-between text-slate-500">
                <span className="line-through decoration-slate-600">Arduino Uno / Microcontroller</span>
                <span className="line-through decoration-slate-600">180.000₫</span>
              </li>
              <li className="flex justify-between text-slate-500">
                <span className="line-through decoration-slate-600">DC motor + wheel</span>
                <span className="line-through decoration-slate-600">90.000₫</span>
              </li>
              <li className="flex justify-between text-slate-500">
                <span className="line-through decoration-slate-600">Angle-control servo</span>
                <span className="line-through decoration-slate-600">35.000₫</span>
              </li>
              <li className="flex justify-between text-slate-500">
                <span className="line-through decoration-slate-600">Ultrasonic sensor / Line-following sensor</span>
                <span className="line-through decoration-slate-600">45.000₫</span>
              </li>
              <li className="flex justify-between text-slate-500">
                <span className="line-through decoration-slate-600">Frame, connecting cable, rechargeable battery</span>
                <span className="line-through decoration-slate-600">150.000₫</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-slate-400 text-sm font-medium">Costs incurred before writing the first line of code</span>
              <span className="text-xl font-bold text-slate-500 line-through decoration-red-500/70">~500.000₫</span>
            </div>
          </div>

          {/* RoboSim3D path */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-cyan-500/40 relative shadow-lg shadow-cyan-500/10">
            <span className="absolute -top-3 right-6 bg-cyan-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full">
              Free
            </span>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-6">
              With RoboSim3D
            </h3>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex justify-between text-slate-200">
                <span className="flex items-center gap-2"><span className="text-emerald-400">✓</span>Body & Chassis simulation</span>
                <span className="text-slate-400">0₫</span>
              </li>
              <li className="flex justify-between text-slate-200">
                <span className="flex items-center gap-2"><span className="text-emerald-400">✓</span>Motor & Wheel simulation</span>
                <span className="text-slate-400">0₫</span>
              </li>
              <li className="flex justify-between text-slate-200">
                <span className="flex items-center gap-2"><span className="text-emerald-400">✓</span>Servo simulation</span>
                <span className="text-slate-400">0₫</span>
              </li>
              <li className="flex justify-between text-slate-200">
                <span className="flex items-center gap-2"><span className="text-emerald-400">✓</span>Sensor simulation</span>
                <span className="text-slate-400">0₫</span>
              </li>
              <li className="flex justify-between text-slate-200">
                <span className="flex items-center gap-2"><span className="text-emerald-400">✓</span>Battery & Power simulation</span>
                <span className="text-slate-400">0₫</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-slate-300 text-sm font-medium">Cost to get started today</span>
              <span className="text-2xl font-extrabold text-cyan-400">0₫</span>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-8 max-w-xl mx-auto">
          Once you understand how the robot works in simulation, choosing the right parts for the real thing will be easier
          much — and you won't have to pay for mistakes.
        </p>
      </section>

      {/* 2. How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
            DESIGN → PROGRAM → SIMULATE → TEST
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
            <span className="text-4xl font-bold text-cyan-500/20 absolute top-4 right-6">01</span>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">1. Design</h3>
            <p className="text-slate-300 font-medium mb-2">Assemble your robot</p>
            <p className="text-slate-400 text-sm">Choose the chassis, mount the engine, sensors and fine-tune 3D spatial coordinates.</p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
            <span className="text-4xl font-bold text-cyan-500/20 absolute top-4 right-6">02</span>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">2. Program</h3>
            <p className="text-slate-300 font-medium mb-2">Define its behavior</p>
            <p className="text-slate-400 text-sm">Write control code or use block drag and drop to define operating logic.</p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
            <span className="text-4xl font-bold text-cyan-500/20 absolute top-4 right-6">03</span>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">3. Simulate</h3>
            <p className="text-slate-300 font-medium mb-2">Test in 3D</p>
            <p className="text-slate-400 text-sm">Run tests in accurately simulated physical environments before going live.</p>
          </div>
        </div>
      </section>

      {/* 3. Robot Parts Library */}
      <section id="library" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Robot Parts Library</h2>
          <p className="text-slate-400">Explore Robot Components</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {robotParts.map((part, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="text-3xl mb-3 text-cyan-400 group-hover:scale-110 transition-transform">
                {part.icon}
              </div>
              <h3 className="font-bold text-slate-200 mb-1">{part.name}</h3>
              <p className="text-xs text-slate-500">{part.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 3D Simulator Section */}
      <section id="simulator" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Realistic 3D Simulator Environment</h2>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span><strong>Physics Engine:</strong> Calculate gravity, road friction and engine collisions in real-time.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span><strong>Sensor Feedback:</strong> The sensor returns distance and tilt data according to real coordinates.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span><strong>Customized environment:</strong> Test the robot in complex mazes, tracks or obstacles.</span>
              </li>
            </ul>
          </div>
          <div className="h-72 rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 border border-slate-700 flex flex-col items-center justify-center p-6 text-center">
            <span className="text-5xl mb-4">🧊</span>
            <p className="text-slate-300 font-semibold">Interactive 3D Viewport</p>
            <p className="text-xs text-slate-500 mt-1">WebGL/Three.js integration for a smooth experience on any device.</p>
          </div>
        </div>
      </section>

      {/* 5. Built For Learning Section */}
      <section id="built-for-learning" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold mb-6 border border-cyan-800">
            Built for Learning
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Learn robotics by building.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-slate-400 text-sm mb-2">Instead of reading about motors...</p>
              <p className="text-cyan-400 font-bold">Build one.</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-slate-400 text-sm mb-2">Instead of learning sensors...</p>
              <p className="text-cyan-400 font-bold">Simulate one.</p>
            </div>
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-slate-400 text-sm mb-2">Instead of imagining algorithms...</p>
              <p className="text-cyan-400 font-bold">Watch your robot execute them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer CTA */}
      <section className="border-t border-slate-900 bg-linear-to-b from-slate-950 to-cyan-950/30 py-20 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            Ready to bring your robot to life?
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Start modeling, programming algorithms, and simulations completely free right in your browser.
          </p>
          <Link
            href="/builder"
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg px-8 py-4 rounded-xl transition shadow-xl shadow-cyan-500/20"
          >
            Create first robot
          </Link>
        </div>
      </section>
    </main>
  );
}