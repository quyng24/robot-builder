import Link from "next/link";
import CodeIdePreview from "@/components/honepage/CodeIdePreview";
import Header from "@/components/honepage/Header";

export default function HomePage() {
  const robotParts = [
    { name: "Body", icon: "▣", desc: "Chassis and Protective Housing" },
    { name: "Motor", icon: "⚙", desc: "DC rotary motor" },
    { name: "Wheel", icon: "○", desc: "Caster wheel" },
    { name: "Sensor", icon: "◉", desc: "Proximity/Line-following sensor" },
    { name: "Servo", icon: "↻", desc: "Rotation angle control motor" },
    { name: "Camera", icon: "📷", desc: "Image Sensors & AI" },
    { name: "Battery", icon: "🔋", desc: "Power Supply & Energy Management" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <Header />

      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold mb-4 border border-cyan-800">
            Robotics Learning & Simulation Platform
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 md:mb-6">
            Build. Simulate. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
              Make Robots.
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Design 3D robots, program behavior and test in a simulation
            environment right in the browser.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              href="/builder"
              className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-cyan-500/20 text-center"
            >
              Create first robot
            </Link>
            <a
              href="#simulator"
              className="w-full sm:w-auto border border-slate-700 hover:border-slate-500 text-slate-300 font-medium px-6 py-3.5 rounded-xl transition text-center"
            >
              Explore Simulator
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500 flex items-center justify-center lg:justify-start gap-2">
            <span className="text-emerald-400">✓</span>
            No need to buy hardware to get started
          </p>
        </div>

        {/* Hero Code IDE / Simulation Tab Component */}
        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-2 shadow-2xl mt-6 lg:mt-0">
          <CodeIdePreview />
        </div>
      </section>

      {/* No Hardware Required Section */}
      <section
        id="no-hardware"
        className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 border-t border-slate-900"
      >
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold mb-4 border border-cyan-800">
            No Hardware Required
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Start building without buying hardware.
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            No need to order parts in advance. Every component is accurately
            simulated in the browser — learn, trial and error as much as
            possible, completely free.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Traditional path */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4 md:mb-6">
              Traditional methods
            </h3>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex justify-between text-slate-500 gap-4">
                <span className="line-through decoration-slate-600">
                  Arduino / Microcontroller
                </span>
                <span className="line-through decoration-slate-600 shrink-0">
                  180k ₫
                </span>
              </li>
              <li className="flex justify-between text-slate-500 gap-4">
                <span className="line-through decoration-slate-600">
                  DC motor + wheel
                </span>
                <span className="line-through decoration-slate-600 shrink-0">
                  90k ₫
                </span>
              </li>
              <li className="flex justify-between text-slate-500 gap-4">
                <span className="line-through decoration-slate-600">
                  Sensors & Servos
                </span>
                <span className="line-through decoration-slate-600 shrink-0">
                  80k ₫
                </span>
              </li>
              <li className="flex justify-between text-slate-500 gap-4">
                <span className="line-through decoration-slate-600">
                  Frame, cable, battery
                </span>
                <span className="line-through decoration-slate-600 shrink-0">
                  150k ₫
                </span>
              </li>
            </ul>
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-baseline gap-2">
              <span className="text-slate-400 text-xs md:text-sm font-medium">
                Cost before writing code
              </span>
              <span className="text-lg md:text-xl font-bold text-slate-500 line-through decoration-red-500/70">
                ~500.000₫
              </span>
            </div>
          </div>

          {/* RoboSim3D path */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900 border border-cyan-500/40 relative shadow-lg shadow-cyan-500/10">
            <span className="absolute -top-3 right-6 bg-cyan-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full">
              Free
            </span>
            <h3 className="text-xs md:text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4 md:mb-6">
              With RoboSim3D
            </h3>
            <ul className="space-y-3 text-sm mb-6">
              {[
                "Body & Chassis",
                "Motor & Wheel",
                "Servo",
                "Sensors",
                "Battery & Power",
              ].map((item, i) => (
                <li key={i} className="flex justify-between text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> {item}
                  </span>
                  <span className="text-slate-400">0₫</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-baseline gap-2">
              <span className="text-slate-300 text-xs md:text-sm font-medium">
                Cost to get started today
              </span>
              <span className="text-xl md:text-2xl font-extrabold text-cyan-400">
                0₫
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works Section */}
      <section
        id="how-it-works"
        className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 border-t border-slate-900"
      >
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-cyan-400 font-mono text-xs md:text-sm tracking-widest uppercase">
            DESIGN → PROGRAM → SIMULATE
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              step: "01",
              title: "1. Design",
              subtitle: "Assemble your robot",
              desc: "Choose the chassis, mount the engine, sensors and fine-tune 3D spatial coordinates.",
            },
            {
              step: "02",
              title: "2. Program",
              subtitle: "Define its behavior",
              desc: "Write control code or use block drag and drop to define operating logic.",
            },
            {
              step: "03",
              title: "3. Simulate",
              subtitle: "Test in 3D",
              desc: "Run tests in accurately simulated physical environments before going live.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 relative"
            >
              <span className="text-3xl md:text-4xl font-bold text-cyan-500/20 absolute top-4 right-6">
                {item.step}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-cyan-400 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-300 font-medium mb-2 text-sm md:text-base">
                {item.subtitle}
              </p>
              <p className="text-slate-400 text-xs md:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Robot Parts Library */}
      <section
        id="library"
        className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 border-t border-slate-900"
      >
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Robot Parts Library
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            Explore Robot Components
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {robotParts.map((part, index) => (
            <div
              key={index}
              className="p-4 md:p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="text-2xl md:text-3xl mb-2 md:mb-3 text-cyan-400 group-hover:scale-110 transition-transform">
                {part.icon}
              </div>
              <h3 className="font-bold text-slate-200 mb-1 text-sm md:text-base">
                {part.name}
              </h3>
              <p className="text-[10px] md:text-xs text-slate-500">
                {part.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 3D Simulator Section */}
      <section
        id="simulator"
        className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 border-t border-slate-900"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              Realistic 3D Simulator Environment
            </h2>
            <ul className="space-y-3 md:space-y-4 text-slate-300 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>
                  <strong>Physics Engine:</strong> Calculate gravity, road
                  friction and engine collisions in real-time.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>
                  <strong>Sensor Feedback:</strong> The sensor returns distance
                  and tilt data according to real coordinates.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>
                  <strong>Customized environment:</strong> Test the robot in
                  complex mazes, tracks or obstacles.
                </span>
              </li>
            </ul>
          </div>

          <div className="order-1 lg:order-2 h-64 md:h-72 rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 border border-slate-700 flex flex-col items-center justify-center p-6 text-center">
            <span className="text-4xl md:text-5xl mb-4">🧊</span>
            <p className="text-slate-300 font-semibold">
              Interactive 3D Viewport
            </p>
            <p className="text-xs text-slate-500 mt-2 max-w-xs">
              WebGL/Three.js integration for a smooth experience on any device.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Built For Learning Section */}
      <section
        id="built-for-learning"
        className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 border-t border-slate-900 bg-slate-900/30"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold mb-6 border border-cyan-800">
            Built for Learning
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
            Learn robotics by building.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 text-left">
            {[
              {
                desc: "Instead of reading about motors...",
                highlight: "Build one.",
              },
              {
                desc: "Instead of learning sensors...",
                highlight: "Simulate one.",
              },
              {
                desc: "Instead of imagining algorithms...",
                highlight: "Watch it execute.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 md:p-6 rounded-xl bg-slate-950 border border-slate-800"
              >
                <p className="text-slate-400 text-xs md:text-sm mb-2">
                  {item.desc}
                </p>
                <p className="text-cyan-400 font-bold text-sm md:text-base">
                  {item.highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer CTA */}
      <section className="border-t border-slate-900 bg-linear-to-b from-slate-950 to-cyan-950/30 py-16 md:py-20 text-center px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
            Ready to bring your robot to life?
          </h2>
          <p className="text-slate-400 mb-8 text-base md:text-lg">
            Start modeling, programming algorithms, and simulations completely
            free right in your browser.
          </p>
          <Link
            href="/builder"
            className="w-full sm:w-auto inline-block bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base md:text-lg px-8 py-4 rounded-xl transition shadow-xl shadow-cyan-500/20"
          >
            Create first robot
          </Link>
        </div>
      </section>
    </main>
  );
}
