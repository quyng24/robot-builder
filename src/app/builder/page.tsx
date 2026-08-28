import SidebarLeft from "@/components/builder/editor/SidebarLeft";
import SidebarRight from "@/components/builder/editor/SidebarRight";
import Topbar from "@/components/builder/editor/Topbar";
import Viewport from "@/components/builder/editor/Viewport";
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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-100">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md shadow-2xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full"></div>

          <span className="text-6xl mb-4 block">💻</span>
          <h1 className="text-2xl font-bold text-cyan-400 mb-3">
            Cần màn hình lớn hơn
          </h1>
          <p className="text-slate-400 mb-8 leading-relaxed text-sm">
            Trình giả lập 3D và môi trường lập trình (Builder) yêu cầu không
            gian màn hình rộng và chuột để tương tác tốt nhất. <br />
            <br />
            Vui lòng truy cập lại trang này bằng{" "}
            <strong>Laptop, PC hoặc Tablet</strong> để bắt đầu chế tạo robot.
          </p>
          <Link
            href="/"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-cyan-500/20 block w-full"
          >
            Quay lại Trang chủ
          </Link>
        </div>
      </div>
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
