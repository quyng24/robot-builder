import Link from "next/link";
import CodeIdePreview from "@/components/homepage/CodeIdePreview";
import Header from "@/components/homepage/Header";
import {
  Box,
  Disc,
  Radio,
  RotateCw,
  Camera,
  BatteryCharging,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Activity,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Move3d,
} from "lucide-react";

export default function HomePage() {
  const robotParts = [
    {
      name: "Chassis & Frame",
      category: "Khung gầm trung tâm",
      icon: Box,
      accentColor: "from-blue-500 to-indigo-600",
      iconColor: "text-blue-400",
      desc: "Khung chịu lực trung tâm, định hình kết cấu cơ khí và toạ độ gốc (Origin) của toàn bộ robot.",
      specs: "Khối lượng: 10 - 25kg · Collision Box · Thân xe",
    },
    {
      name: "Wheel & DC Motor",
      category: "Hệ thống truyền động",
      icon: Disc,
      accentColor: "from-amber-500 to-orange-600",
      iconColor: "text-amber-400",
      desc: "Động cơ điện kết hợp bánh xe mô phỏng khớp quay Revolute Joint, mô-men xoắn và truyền động vi sai.",
      specs: "Torque: 50Nm · Tốc độ: 15 rad/s · Differential Drive",
    },
    {
      name: "Distance Sensor (LIDAR)",
      category: "Cảm biến khoảng cách",
      icon: Radio,
      accentColor: "from-rose-500 to-red-600",
      iconColor: "text-rose-400",
      desc: "Phát tia Raycast vật lý 60Hz liên tục quét vật cản đa hướng và kích hoạt cơ chế phanh khẩn cấp.",
      specs: "Tầm quét: 0.1 - 10m · Laser Beam · Auto-Brake",
    },
    {
      name: "Servo Actuator Joint",
      category: "Cơ cấu khớp xoay",
      icon: RotateCw,
      accentColor: "from-purple-500 to-indigo-600",
      iconColor: "text-purple-400",
      desc: "Khớp điều khiển góc xoay chính xác cho cánh tay robot gắp vật thể và các cơ cấu nâng hạ.",
      specs: "Góc quay: 0° - 180° · PID Servo Control",
    },
    {
      name: "Vision & AI Camera",
      category: "Thị giác máy tính",
      icon: Camera,
      accentColor: "from-cyan-500 to-blue-600",
      iconColor: "text-cyan-400",
      desc: "Thu nhận khung hình không gian 3D phục vụ bài toán nhận diện làn đường và bám đối tượng.",
      specs: "FOV: 90° · Stream RGB · Nhận diện vật thể",
    },
    {
      name: "Battery & Power Unit",
      category: "Quản lý năng lượng",
      icon: BatteryCharging,
      accentColor: "from-emerald-500 to-teal-600",
      iconColor: "text-emerald-400",
      desc: "Hệ thống phân phối điện áp, quản lý tiêu hao năng lượng cho vi điều khiển và các động cơ.",
      specs: "Output: 12V / 5V DC · Quản lý điện áp",
    },
  ];

  const comparisonRows = [
    {
      item: "Board vi điều khiển (Arduino / ESP32)",
      traditional: "180.000₫",
      robosim: "0₫ Miễn phí",
    },
    {
      item: "Động cơ DC giảm tốc + 2 Bánh xe vi sai",
      traditional: "90.000₫",
      robosim: "0₫ Miễn phí",
    },
    {
      item: "Cảm biến khoảng cách LIDAR / Siêu âm",
      traditional: "80.000₫",
      robosim: "0₫ Miễn phí",
    },
    {
      item: "Khung xe mica, dây nối, khay pin nguồn",
      traditional: "150.000₫",
      robosim: "0₫ Miễn phí",
    },
    {
      item: "Rủi ro chập cháy vi mạch & gãy vỡ linh kiện",
      traditional: "Tốn thêm chi phí mua lại",
      robosim: "An toàn 100% · Reset trong 1s",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Ambient Backlight Glows */}
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-tr from-indigo-600/25 via-cyan-500/20 to-purple-600/20 blur-[130px] -z-10 rounded-full pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-0 w-125 h-125 bg-indigo-500/10 blur-[150px] -z-10 rounded-full pointer-events-none"
        />

        {/* Engineering Background Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#33415512_1px,transparent_1px),linear-gradient(to_bottom,#33415512_1px,transparent_1px)] bg-size-3rem_3rem -z-10 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/60 text-indigo-300 text-xs font-mono font-medium mb-6 shadow-sm shadow-indigo-950">
              <Sparkles size={14} className="text-cyan-400 animate-pulse" />
              <span>NỀN TẢNG THIẾT KẾ & MÔ PHỎNG ROBOT 3D CHUẨN STEM</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-white">
              Thiết Kế Đa Chiều. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-indigo-400 to-purple-400">
                Lập Trình Tự Hành.
              </span>{" "}
              <br />
              Mô Phỏng 3D Chuẩn Xác.
            </h1>

            {/* Description */}
            <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans">
              Trải nghiệm chu trình chế tạo robot thực tế: từ lắp ráp linh kiện
              modular, căn chỉnh trục toạ độ Gizmo đến lập trình phản xạ né vật
              cản trong môi trường vật lý Rapier 60Hz ngay trên trình duyệt.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                href="/builder"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-white overflow-hidden shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-indigo-500 to-cyan-500 group-hover:from-indigo-500 group-hover:to-cyan-400 transition-all" />
                <span className="relative flex items-center gap-2">
                  <Box size={18} className="text-cyan-200" />
                  <span>Bắt đầu chế tạo 3D ngay</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </Link>

              <a
                href="#simulator"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm sm:text-base text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 hover:text-white transition-all shadow-sm"
              >
                <Move3d size={18} className="text-indigo-400" />
                <span>Khám phá 3D Simulator</span>
              </a>
            </div>

            {/* Quick Badges */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" />
                100% Miễn phí
              </span>
              <span className="flex items-center gap-1.5">
                <Activity size={15} className="text-cyan-400" />
                Rapier Physics 60 FPS
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-indigo-400" />
                Không lo chập cháy vi mạch
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Code & 3D Simulation Preview */}
          <div className="lg:col-span-6">
            <CodeIdePreview />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HOW IT WORKS: 3-STEP PIPELINE */}
      {/* ========================================================================= */}
      <section
        id="how-it-works"
        className="border-t border-slate-800/80 bg-slate-900/40 py-20 md:py-28 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 text-center sm:text-left">
            <p className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 mb-2">
              QUY TRÌNH PHÁT TRIỂN
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Quy trình 3 bước từ bản vẽ đến thực tế
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Rút ngắn khoảng cách giữa lý thuyết và thực hành robotics thông
              qua quy trình khép kín, trực quan trên nền tảng Web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Step 1 */}
            <div className="group relative rounded-2xl p-6 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Layers size={24} />
              </div>
              <span className="font-mono text-xs font-bold text-cyan-400 tracking-widest uppercase mb-1 block">
                BƯỚC 01
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Thiết Kế 3D Modular
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tự do kéo thả khung gầm Chassis, gắn bánh xe vi sai, bố trí cảm
                biến khoảng cách và căn chỉnh toạ độ X, Y, Z với trục Gizmo trực
                quan.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group relative rounded-2xl p-6 bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-800/60 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Cpu size={24} />
              </div>
              <span className="font-mono text-xs font-bold text-indigo-400 tracking-widest uppercase mb-1 block">
                BƯỚC 02
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Cấu Hình Động Cơ & Cảm Biến
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Thiết lập hệ dẫn động bên Trái/Phải (Differential Drive), tinh
                chỉnh mô-men xoắn, tốc độ tối đa và tầm quét tia laser LIDAR
                nhận diện vật cản.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group relative rounded-2xl p-6 bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <span className="font-mono text-xs font-bold text-emerald-400 tracking-widest uppercase mb-1 block">
                BƯỚC 03
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Mô Phỏng Vật Lý 60 FPS
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Khởi chạy không gian Rapier Physics: mô phỏng trọng lực, ma sát
                mặt đường, khớp xoay RevoluteJoint và kiểm thử phản xạ tự phanh
                trước vật cản.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SIMULATOR HIGHLIGHTS: INTERACTIVE STUDIO */}
      {/* ========================================================================= */}
      <section
        id="simulator"
        className="border-t border-slate-800/80 py-20 md:py-28 relative bg-slate-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Features description */}
            <div className="lg:col-span-6">
              <p className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 mb-2">
                KHÔNG GIAN 3D TƯƠNG TÁC
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
                Môi trường mô phỏng vật lý chân thực và tức thì
              </h2>

              <div className="space-y-6">
                <div className="border-l-2 border-cyan-500 pl-4 py-1">
                  <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
                    Động cơ Vật lý Rapier Deterministic
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Tính toán lực ma sát bề mặt, trọng lực thực tế và khớp quay
                    bánh xe Revolute Joint với mô-men lực tùy chỉnh độc lập cho
                    từng motor.
                  </p>
                </div>

                <div className="border-l-2 border-indigo-500 pl-4 py-1">
                  <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
                    Cảm biến Raycasting thời gian thực
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Tia laser phát xạ liên tục 60Hz đo khoảng cách chính xác,
                    đổi màu tín hiệu đỏ/xanh và kích hoạt phanh tự động khi gặp
                    tường chắn.
                  </p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-4 py-1">
                  <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
                    Bảng điều khiển WASD & Telemetry HUD
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Lái xe trực tiếp bằng bàn phím (W: tiến, S: lùi, A/D: rẽ vi
                    sai, Space: phanh), đồng thời theo dõi toạ độ và vận tốc qua
                    HUD viễn trắc.
                  </p>
                </div>
              </div>
            </div>

            {/* Dark Terminal Mockup */}
            <div className="lg:col-span-6 rounded-2xl p-6 bg-slate-900/80 border border-slate-800 shadow-2xl font-mono text-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-400">
                    REALTIME_TELEMETRY_STREAM
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  60 FPS · ACTIVE
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="py-2.5 px-3.5 bg-slate-950/80 rounded-lg border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">CHASSIS_COORDINATES</span>
                  <span className="text-cyan-400 font-bold">
                    X: 2.00 | Y: 0.50 | Z: 3.00
                  </span>
                </div>
                <div className="py-2.5 px-3.5 bg-slate-950/80 rounded-lg border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">RAYCAST_LIDAR_DISTANCE</span>
                  <span className="text-emerald-400 font-bold">
                    3.24m / 5.0m (CLEAR)
                  </span>
                </div>
                <div className="py-2.5 px-3.5 bg-slate-950/80 rounded-lg border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">LEFT_MOTOR_STATUS</span>
                  <span className="text-amber-400 font-bold">
                    15.0 rad/s (ENABLED)
                  </span>
                </div>
                <div className="py-2.5 px-3.5 bg-slate-950/80 rounded-lg border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">RIGHT_MOTOR_STATUS</span>
                  <span className="text-amber-400 font-bold">
                    15.0 rad/s (ENABLED)
                  </span>
                </div>
                <div className="py-2.5 px-3.5 bg-slate-950/80 rounded-lg border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">COLLISION_AVOIDANCE</span>
                  <span className="text-emerald-400 font-bold">
                    AUTO_BRAKE_READY
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
                >
                  <span>Mở không gian 3D Builder đầy đủ</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ROBOT HARDWARE CATALOG */}
      {/* ========================================================================= */}
      <section
        id="library"
        className="border-t border-slate-800/80 bg-slate-900/40 py-20 md:py-28 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 text-center sm:text-left">
            <p className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 mb-2">
              THƯ VIỆN PHẦN CỨNG MÔ PHỎNG
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Linh kiện chuẩn xác, sẵn sàng lắp ghép
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Mỗi linh kiện đều được cấu hình các thuộc tính vật lý tương ứng
              với thông số thực tế của ngành cơ điện tử.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {robotParts.map((part) => {
              const Icon = part.icon;
              return (
                <div
                  key={part.name}
                  className="group relative rounded-2xl p-6 bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center ${part.iconColor} group-hover:scale-110 transition-transform`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">
                          {part.name}
                        </h3>
                        <span className="text-[11px] font-mono text-cyan-400 font-medium">
                          {part.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {part.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                    {part.specs}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. COST COMPARISON: HARDWARE VS ROBOSIM3D */}
      {/* ========================================================================= */}
      <section
        id="no-hardware"
        className="border-t border-slate-800/80 py-20 md:py-28 bg-slate-950 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 text-center sm:text-left">
            <p className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 mb-2">
              TỐI ƯU CHI PHÍ HỌC TẬP
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Bắt đầu học Robotics không tốn 1 đồng phần cứng
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Thoải mái thử nghiệm, sai và sửa không giới hạn mà không cần chờ
              đợi giao hàng linh kiện hay lo lắng về rủi ro chập cháy bo mạch.
            </p>
          </div>

          <div className="max-w-4xl bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-6 py-4 bg-slate-800/60 border-b border-slate-800 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              <div className="col-span-6 sm:col-span-7">
                Hạng mục linh kiện / Trải nghiệm
              </div>
              <div className="col-span-3 sm:col-span-2 text-right">
                Truyền thống
              </div>
              <div className="col-span-3 text-right text-cyan-400">
                RoboSim3D
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-800/60 text-sm">
              {comparisonRows.map((row) => (
                <div
                  key={row.item}
                  className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-800/40 transition"
                >
                  <div className="col-span-6 sm:col-span-7 font-medium text-slate-200">
                    {row.item}
                  </div>
                  <div className="col-span-3 sm:col-span-2 text-right text-slate-500 line-through font-mono text-xs">
                    {row.traditional}
                  </div>
                  <div className="col-span-3 text-right font-bold text-emerald-400 text-xs sm:text-sm font-mono">
                    {row.robosim}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Row */}
            <div className="grid grid-cols-12 px-6 py-5 bg-indigo-950/40 border-t border-indigo-900/50 items-baseline">
              <div className="col-span-6 sm:col-span-7 font-bold text-white text-sm sm:text-base">
                Tổng chi phí để bạn bắt đầu ngay hôm nay
              </div>
              <div className="col-span-3 sm:col-span-2 text-right text-slate-500 font-bold line-through font-mono text-sm">
                ~500.000₫
              </div>
              <div className="col-span-3 text-right text-2xl font-black text-emerald-400 font-mono">
                0₫
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BUILT FOR LEARNING */}
      {/* ========================================================================= */}
      <section
        id="built-for-learning"
        className="border-t border-slate-800/80 bg-slate-900/40 py-20 md:py-28 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 text-center sm:text-left">
            <p className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 mb-2">
              PHƯƠNG PHÁP GIÁO DỤC
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Học robotics qua trải nghiệm tương tác trực quan
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Hiểu sâu bản chất cơ điện tử bằng cách trực tiếp thao tác và quan
              sát phản hồi trong môi trường 3D.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            <div className="border-l-2 border-amber-400 pl-5 py-2">
              <p className="text-slate-500 text-xs font-mono mb-1">
                Thay vì chỉ đọc lý thuyết về động cơ DC...
              </p>
              <p className="text-white font-bold text-base leading-snug">
                Tự tay gắn bánh xe, điều chỉnh vận tốc góc và quan sát lực đẩy
                tức thì.
              </p>
            </div>

            <div className="border-l-2 border-rose-500 pl-5 py-2">
              <p className="text-slate-500 text-xs font-mono mb-1">
                Thay vì phỏng đoán phản xạ của cảm biến...
              </p>
              <p className="text-white font-bold text-base leading-snug">
                Quan sát trực tiếp tia laser quét vật cản và kích hoạt phanh an
                toàn.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400 pl-5 py-2">
              <p className="text-slate-500 text-xs font-mono mb-1">
                Thay vì mơ hồ về thuật toán điều khiển...
              </p>
              <p className="text-white font-bold text-base leading-snug">
                Xem robot phản xạ né vật cản theo thời gian thực ở nhịp 60Hz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FINAL CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="relative border-t border-slate-800/80 py-20 md:py-28 bg-linear-to-b from-slate-900 to-slate-950 text-white text-center overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Sẵn sàng tạo ra Robot đầu tiên của bạn?
          </h2>
          <p className="text-slate-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Mở trình thiết kế 3D hoàn toàn miễn phí ngay trên trình duyệt. Không
            cần cài đặt phần mềm, không lo mua sắm linh kiện.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2.5 bg-linear-to-r from-cyan-400 via-indigo-500 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-slate-950 font-black text-base md:text-lg px-8 py-4 rounded-xl shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <span>Mở 3D Robot Builder ngay</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">
              RoboSim<span className="text-cyan-400">3D</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">
              Nền tảng học tập & mô phỏng Robotics trực tuyến
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/builder" className="hover:text-cyan-400 transition">
              3D Builder
            </Link>
            <a href="#simulator" className="hover:text-cyan-400 transition">
              Simulator
            </a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition">
              Quy trình
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
