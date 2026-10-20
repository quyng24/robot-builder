import SidebarLeft from "@/components/builder/editor/SidebarLeft";
import SidebarRight from "@/components/builder/editor/SidebarRight";
import Topbar from "@/components/builder/editor/Topbar";
import Viewport from "@/components/builder/editor/Viewport";
import Header from "@/components/homepage/Header";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft, Move3d } from "lucide-react";

export default async function BuilderPage() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile =
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Opera M(obi|ini)/i.test(
      userAgent,
    );

  if (isMobile) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col">
        <Header ctaHref="/" ctaLabel="Về trang chủ" />

        <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col justify-center">
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest block">
                THÔNG BÁO TƯƠNG THÍCH
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4 leading-tight">
              Trải nghiệm 3D Builder trên Máy tính hoặc Laptop
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
              Không gian thiết kế 3D và môi trường giả lập vật lý Rapier đòi hỏi
              không gian hiển thị rộng cùng thao tác chuột để kéo thả linh kiện,
              căn chỉnh trục Gizmo và quan sát dữ liệu cảm biến thời gian thực.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 mb-8 border-t border-slate-800 pt-5">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>
                  Thao tác xoay camera 3D và căn chỉnh toạ độ X, Y, Z đa trục
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>
                  Theo dõi dữ liệu cảm biến LIDAR và tốc độ motor 60 FPS
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>
                  Quản lý cây phân cấp linh kiện và thông số vật lý trực quan
                </span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition text-sm"
              >
                <ArrowLeft size={16} />
                <span>Về trang chủ</span>
              </Link>
              <Link
                href="/#simulator"
                className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600 bg-slate-800/80 text-slate-300 hover:text-white font-semibold px-6 py-3 rounded-xl transition text-sm"
              >
                <Move3d size={16} className="text-indigo-400" />
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
