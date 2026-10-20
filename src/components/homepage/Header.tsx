"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, Menu, X, ArrowRight, Cpu } from "lucide-react";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "Quy trình" },
  { href: "/#simulator", label: "Mô phỏng 3D" },
  { href: "/#library", label: "Thư viện linh kiện" },
  { href: "/#no-hardware", label: "Chi phí 0đ" },
  { href: "/#built-for-learning", label: "Phương pháp" },
];

type HeaderProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export default function Header({
  ctaHref = "/builder",
  ctaLabel = "Mở 3D Builder",
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-colors">
      {/* Top neon gradient accent line */}
      <div className="h-0.5 w-full bg-linear-to-r from-cyan-500 via-indigo-500 to-emerald-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-17 flex items-center justify-between gap-4">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3 min-w-0 group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-lg shadow-lg shadow-indigo-500/25 group-hover:shadow-cyan-500/30 group-hover:scale-105 transition-all">
            <Cpu size={20} className="text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-slate-100 transition">
              RoboSim<span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-400">3D</span>
            </span>
            <span className="hidden sm:block text-[10px] font-mono font-medium text-slate-400 tracking-wider">
              BUILD · SIMULATE · LEARN
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href={ctaHref}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white overflow-hidden shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-indigo-500 to-cyan-500 transition-all group-hover:opacity-90" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-indigo-500 via-cyan-400 to-emerald-400 blur-sm transition-opacity" />
            <span className="relative flex items-center gap-1.5">
              <Sparkles size={14} className="text-cyan-200" />
              <span>{ctaLabel}</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl px-4 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm text-slate-300 font-medium hover:text-white hover:bg-slate-900 transition"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={ctaHref}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 bg-linear-to-r from-indigo-600 to-cyan-500 text-white font-bold px-4 py-3 rounded-xl text-center text-sm shadow-md shadow-indigo-600/30"
            >
              <span>{ctaLabel}</span>
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
