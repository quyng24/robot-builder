import Link from "next/link";
import CodeIdePreview from "@/components/honepage/CodeIdePreview";
import Header from "@/components/honepage/Header";
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
} from "lucide-react";

export default function HomePage() {
  const robotParts = [
    {
      name: "Chassis & Frame",
      category: "Khung gầm",
      icon: Box,
      desc: "Khung trung tâm chịu lực, định hình kết cấu và toạ độ gốc của toàn bộ robot.",
      specs: "Khối lượng: 10 - 25kg · Collision Box",
    },
    {
      name: "Wheel & Motor",
      category: "Truyền động",
      icon: Disc,
      desc: "Động cơ DC kết hợp bánh xe mô phỏng khớp quay Revolute Joint và mô-men xoắn.",
      specs: "Torque: 5Nm · Tốc độ: 15 rad/s",
    },
    {
      name: "Distance Sensor (LIDAR)",
      category: "Cảm biến",
      icon: Radio,
      desc: "Phát tia Raycast 60Hz thời gian thực đo khoảng cách và nhận diện vật cản đa hướng.",
      specs: "Tầm quét: 0.1 - 10m · Laser Beam",
    },
    {
      name: "Servo Actuator",
      category: "Khớp xoay",
      icon: RotateCw,
      desc: "Khớp điều khiển góc chính xác cho cánh tay robot và các cơ cấu nâng hạ.",
      specs: "Góc quay: 0° - 180° · PID Control",
    },
    {
      name: "Vision & Camera",
      category: "Thị giác máy",
      icon: Camera,
      desc: "Thu nhận hình ảnh không gian 3D phục vụ xử lý AI và thuật toán bám làn đường.",
      specs: "FOV: 90° · Stream RGB",
    },
    {
      name: "Battery & Power Unit",
      category: "Năng lượng",
      icon: BatteryCharging,
      desc: "Hệ thống quản lý nguồn và phân bổ điện áp cho vi điều khiển cùng các motor.",
      specs: "Output: 12V · Năng lượng mô phỏng",
    },
  ];

  const comparisonRows = [
    {
      item: "Board vi điều khiển (Arduino / ESP32)",
      traditional: "180.000₫",
      robosim: "0₫ Miễn phí",
    },
    {
      item: "Động cơ DC giảm tốc + 2 Bánh xe",
      traditional: "90.000₫",
      robosim: "0₫ Miễn phí",
    },
    {
      item: "Cảm biến khoảng cách LIDAR / Siêu âm",
      traditional: "80.000₫",
      robosim: "0₫ Miễn phí",
    },
    {
      item: "Khung xe mica, dây nối, khay pin",
      traditional: "150.000₫",
      robosim: "0₫ Miễn phí",
    },
    {
      item: "Rủi ro chập cháy vi mạch khi thử nghiệm",
      traditional: "Tốn thêm chi phí",
      robosim: "An toàn tuyệt đối (Reset 1s)",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-100 selection:text-cyan-900">
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-linear-to-r from-cyan-300/25 via-sky-300/20 to-indigo-300/20 blur-3xl -z-10 rounded-full"
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 text-cyan-800 text-xs font-semibold mb-6">
              <Sparkles size={14} className="text-cyan-600" />
              <span>Nền Tảng Giả Lập & Lập Trình Robot 3D</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] mb-6 text-slate-950">
              Thiết kế. Lập trình. <br />
              <span className="text-cyan-700">Mô phỏng Robot 3D.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Trải nghiệm quy trình chế tạo robot thực tế: từ lắp ghép linh kiện modular, căn chỉnh toạ độ không gian 3D đến lập trình thuật toán và kiểm thử vật lý ngay trong trình duyệt.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              <Link
                href="/builder"
                className="group inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-cyan-600/25 transition"
              >
                <span>Bắt đầu chế tạo ngay</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <a
                href="#simulator"
                className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3.5 rounded-xl transition"
              >
                <span>Khám phá 3D Simulator</span>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                Miễn phí 100%
              </span>
              <span className="flex items-center gap-1.5">
                <Activity size={14} className="text-cyan-600" />
                Rapier Physics 60 FPS
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-indigo-600" />
                Không lo chập cháy
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <CodeIdePreview />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (OPEN TIMELINE, NO CARDS) */}
      <section id="how-it-works" className="border-t border-slate-200 bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-bold tracking-wider uppercase text-cyan-700 mb-2">
              Quy trình phát triển
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-3">
              Quy trình 3 bước từ ý tưởng đến thực tế
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Học robotics bài bản thông qua chu trình khép kín, không đòi hỏi cài đặt phức tạp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            <div className="border-t-2 border-cyan-600 pt-6">
              <span className="font-mono text-xs font-bold text-cyan-700 tracking-widest uppercase mb-2 block">
                BƯỚC 01
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Thiết kế 3D Modular
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Lựa chọn khung xe, gắn bánh xe, bố trí cảm biến khoảng cách và căn chỉnh toạ độ X, Y, Z với trục Gizmo trực quan.
              </p>
            </div>

            <div className="border-t-2 border-indigo-600 pt-6">
              <span className="font-mono text-xs font-bold text-indigo-700 tracking-widest uppercase mb-2 block">
                BƯỚC 02
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Lập trình Hành vi
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Thiết lập vận tốc motor, thu nhận dữ liệu cảm biến LIDAR và xây dựng thuật toán tự động né tránh chướng ngại vật.
              </p>
            </div>

            <div className="border-t-2 border-emerald-600 pt-6">
              <span className="font-mono text-xs font-bold text-emerald-700 tracking-widest uppercase mb-2 block">
                BƯỚC 03
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Mô phỏng Vật lý 60 FPS
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Khởi chạy không gian Rapier Physics: mô phỏng trọng lực, ma sát mặt sàn, khớp cơ khí và đánh giá phản xạ của robot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COST COMPARISON (OPEN LEDGER TABLE, NO NESTED CARDS) */}
      <section id="no-hardware" className="border-t border-slate-200 py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold tracking-wider uppercase text-cyan-700 mb-2">
              Tối ưu chi phí
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-3">
              Bắt đầu học Robotics không tốn 1 đồng phần cứng
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Thoải mái thử nghiệm, sai và sửa không giới hạn mà không cần chờ đợi giao hàng linh kiện hay lo lắng về hỏng hóc thiết bị.
            </p>
          </div>

          <div className="max-w-4xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="grid grid-cols-12 px-6 py-4 bg-slate-100/70 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600">
              <div className="col-span-6 sm:col-span-7">Hạng mục linh kiện / Trải nghiệm</div>
              <div className="col-span-3 sm:col-span-2 text-right">Truyền thống</div>
              <div className="col-span-3 text-right text-cyan-800">RoboSim3D</div>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              {comparisonRows.map((row) => (
                <div
                  key={row.item}
                  className="grid grid-cols-12 px-6 py-3.5 items-center hover:bg-slate-50/60 transition"
                >
                  <div className="col-span-6 sm:col-span-7 font-medium text-slate-800">
                    {row.item}
                  </div>
                  <div className="col-span-3 sm:col-span-2 text-right text-slate-400 line-through font-mono text-xs">
                    {row.traditional}
                  </div>
                  <div className="col-span-3 text-right font-bold text-cyan-700 text-xs sm:text-sm">
                    {row.robosim}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 px-6 py-5 bg-cyan-50/50 border-t border-cyan-100 items-baseline">
              <div className="col-span-6 sm:col-span-7 font-bold text-slate-900 text-sm sm:text-base">
                Tổng chi phí để bắt đầu học hôm nay
              </div>
              <div className="col-span-3 sm:col-span-2 text-right text-slate-400 font-bold line-through font-mono text-sm">
                ~500.000₫
              </div>
              <div className="col-span-3 text-right text-2xl font-black text-cyan-700 font-mono">
                0₫
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROBOT PARTS CATALOG (MINIMALIST REFINED LIST, NO BULKY CARDS) */}
      <section id="library" className="border-t border-slate-200 bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold tracking-wider uppercase text-cyan-700 mb-2">
              Thư viện phần cứng mô phỏng
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-3">
              Linh kiện chuẩn xác, sẵn sàng lắp ghép
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Mỗi linh kiện đều được cấu hình các thuộc tính vật lý tương ứng với thông số thực tế ngoài đời.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {robotParts.map((part) => {
              const Icon = part.icon;
              return (
                <div
                  key={part.name}
                  className="group border-b border-slate-200 pb-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition">
                        <Icon size={16} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">
                          {part.name}
                        </h3>
                        <span className="text-[11px] font-semibold text-cyan-700">
                          {part.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      {part.desc}
                    </p>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400">
                    {part.specs}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3D SIMULATOR FEATURES (OPEN SPLIT VIEW) */}
      <section id="simulator" className="border-t border-slate-200 py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-bold tracking-wider uppercase text-cyan-700 mb-2">
                Không gian 3D tương tác
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6 leading-tight">
                Môi trường mô phỏng vật lý chân thực và tức thì
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-600" />
                    Động cơ Vật lý Rapier chuẩn xác
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pl-4">
                    Tính toán ma sát bề mặt, trọng lực thực tế và khớp quay Revolute Joint với mô-men lực tùy chỉnh cho từng bánh xe.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    Cảm biến Raycasting thời gian thực
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pl-4">
                    Tia laser quét khoảng cách liên tục 60Hz, trả về tọa độ va chạm và tự động kích hoạt chế độ phanh an toàn.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    Góc nhìn 360° & Gizmo 3D trực quan
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pl-4">
                    Dễ dàng xoay camera, phóng to/thu nhỏ, căn chỉnh toạ độ X, Y, Z của từng linh kiện với công cụ Translate và Rotate.
                  </p>
                </div>
              </div>
            </div>

            {/* DARK TERMINAL TELEMETRY */}
            <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-6 text-slate-200 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    SIMULATION_TELEMETRY
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">60 FPS · ACTIVE</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="py-2 px-3 bg-slate-900/90 rounded border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">CHASSIS_POSITION</span>
                  <span className="text-cyan-400 font-bold">X: 0.00 | Y: 0.50 | Z: 1.25</span>
                </div>
                <div className="py-2 px-3 bg-slate-900/90 rounded border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">RAYCAST_DISTANCE</span>
                  <span className="text-emerald-400 font-bold">2.45m / 5.0m (CLEAR)</span>
                </div>
                <div className="py-2 px-3 bg-slate-900/90 rounded border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">LEFT_MOTOR_SPEED</span>
                  <span className="text-amber-400 font-bold">10.0 rad/s</span>
                </div>
                <div className="py-2 px-3 bg-slate-900/90 rounded border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">RIGHT_MOTOR_SPEED</span>
                  <span className="text-amber-400 font-bold">10.0 rad/s</span>
                </div>
                <div className="py-2 px-3 bg-slate-900/90 rounded border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-400">SAFETY_BRAKE</span>
                  <span className="text-emerald-400 font-bold">DISENGAGED (READY)</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 text-center">
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
                >
                  <span>Mở bảng điều khiển 3D Builder đầy đủ</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUILT FOR LEARNING (EDITORIAL QUOTE STYLE, NO REPETITIVE BOXES) */}
      <section id="built-for-learning" className="border-t border-slate-200 bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold tracking-wider uppercase text-cyan-700 mb-2">
              Phương pháp giáo dục
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-3">
              Học robotics qua trải nghiệm tương tác
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Hiểu sâu bản chất cơ điện tử bằng cách trực tiếp thao tác và quan sát phản hồi trong môi trường 3D.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            <div className="border-l-2 border-amber-500 pl-5">
              <p className="text-slate-500 text-sm mb-1.5">
                Thay vì chỉ đọc lý thuyết về động cơ DC...
              </p>
              <p className="text-slate-900 font-bold text-base leading-snug">
                Tự tay gắn bánh xe và điều chỉnh vận tốc góc tức thì.
              </p>
            </div>

            <div className="border-l-2 border-rose-500 pl-5">
              <p className="text-slate-500 text-sm mb-1.5">
                Thay vì phỏng đoán phản xạ của cảm biến...
              </p>
              <p className="text-slate-900 font-bold text-base leading-snug">
                Quan sát trực tiếp tia laser quét và tọa độ va chạm.
              </p>
            </div>

            <div className="border-l-2 border-cyan-600 pl-5">
              <p className="text-slate-500 text-sm mb-1.5">
                Thay vì mơ hồ về thuật toán điều khiển...
              </p>
              <p className="text-slate-900 font-bold text-base leading-snug">
                Xem robot phản xạ và né vật cản từng mili-giây.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION (OPEN & SPACIOUS) */}
      <section className="border-t border-slate-200 py-16 md:py-24 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Sẵn sàng tạo ra Robot đầu tiên của bạn?
          </h2>
          <p className="text-slate-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Mở trình thiết kế 3D hoàn toàn miễn phí ngay trên trình duyệt. Không cần cài đặt, không cần mua phần cứng.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-base md:text-lg px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition hover:scale-105"
          >
            <span>Mở 3D Robot Builder</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">
              RoboSim<span className="text-cyan-600">3D</span>
            </span>
            <span className="text-slate-400">·</span>
            <span>Nền tảng học tập & mô phỏng Robotics trực tuyến</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/builder" className="hover:text-cyan-700 transition">
              Builder
            </Link>
            <a href="#simulator" className="hover:text-cyan-700 transition">
              Simulator
            </a>
            <a href="#how-it-works" className="hover:text-cyan-700 transition">
              Quy trình
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
