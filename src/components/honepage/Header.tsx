"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "Quy trình" },
  { href: "/#no-hardware", label: "Chi phí 0đ" },
  { href: "/#library", label: "Linh kiện" },
  { href: "/#simulator", label: "Mô phỏng 3D" },
  { href: "/#built-for-learning", label: "Phương pháp" },
];

type HeaderProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export default function Header({
  ctaHref = "/builder",
  ctaLabel = "Bắt đầu chế tạo",
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_8px_24px_-12px_rgba(15,23,42,0.18)]">
      <div className="h-1 bg-linear-to-r from-cyan-500 via-cyan-600 to-sky-600" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-[4.25rem] flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 min-w-0 group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-cyan-600 text-lg shadow-sm shadow-cyan-600/30 group-hover:bg-cyan-500 transition">
            🤖
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-extrabold text-base md:text-lg tracking-tight text-slate-900">
              RoboSim<span className="text-cyan-600">3D</span>
            </span>
            <span className="hidden sm:block text-[10px] font-medium text-slate-500 tracking-wide">
              Build · Simulate · Learn
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg hover:text-cyan-700 hover:bg-cyan-50 transition"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={ctaHref}
            className="ml-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg transition shadow-sm shadow-cyan-600/25"
          >
            {ctaLabel}
          </Link>
        </nav>

        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-slate-50">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-3 rounded-lg text-slate-800 font-medium hover:bg-white hover:text-cyan-700 transition"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={ctaHref}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-3 rounded-xl text-center transition"
            >
              {ctaLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
