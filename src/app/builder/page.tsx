import SidebarLeft from "@/components/builder/editor/SidebarLeft";
import SidebarRight from "@/components/builder/editor/SidebarRight";
import Topbar from "@/components/builder/editor/Topbar";
import Viewport from "@/components/builder/editor/Viewport";
import Header from "@/components/honepage/Header";
import { headers } from "next/headers";
import Link from "next/link";

export default async function BuilderPage() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile =
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Opera M(obi|ini)/i.test(
      userAgent,
    );

  if (isMobile) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-100 selection:text-cyan-900 flex flex-col">
        <Header ctaHref="/" ctaLabel="Về trang chủ" />

        <div className="flex-1 max-w-2xl mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col justify-center">
          <div className="border-l-4 border-cyan-600 pl-6 py-2">
            <span className="font-mono text-xs font-bold text-cyan-700 uppercase tracking-widest block mb-2">
              THÔNG BÁO TƯƠNG THÍCH
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 mb-4 leading-tight">
              Trải nghiệm 3D Builder trên Máy tính hoặc Laptop
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Không gian thiết kế 3D và môi trường giả lập vật lý Rapier đòi hỏi không gian hiển thị rộng cùng thao tác chuột để kéo thả linh kiện, căn chỉnh trục Gizmo và quan sát dữ liệu cảm biến thời gian thực.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-600 mb-8 border-t border-slate-200 pt-5">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                <span>Thao tác xoay camera 3D và căn chỉnh toạ độ X, Y, Z đa trục</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                <span>Theo dõi dữ liệu cảm biến LIDAR và tốc độ motor 60 FPS</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                <span>Quản lý cây phân cấp linh kiện và thông số vật lý</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-3 rounded-xl shadow-sm shadow-cyan-600/25 transition text-sm"
              >
                <span>Về trang chủ</span>
              </Link>
              <Link
                href="/#simulator"
                className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-semibold px-6 py-3 rounded-xl transition text-sm"
              >
                <span>Xem giới thiệu 3D Simulator</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
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
