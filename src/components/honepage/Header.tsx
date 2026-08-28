"use client"; // Chỉ component này cần Client-side JS

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-4 md:px-6 py-4 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-lg md:text-xl text-cyan-400">
          <span className="text-xl md:text-2xl">🤖</span> RoboSim3D
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-300">
          <a href="#how-it-works" className="hover:text-cyan-400 transition">
            Procedure
          </a>
          <a href="#no-hardware" className="hover:text-cyan-400 transition">
            Expense
          </a>
          <a href="#library" className="hover:text-cyan-400 transition">
            Accessory
          </a>
          <a href="#simulator" className="hover:text-cyan-400 transition">
            3D Simulator
          </a>
          <a
            href="#built-for-learning"
            className="hover:text-cyan-400 transition"
          >
            Study
          </a>
          <Link
            href="/builder"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-lg transition"
          >
            Create first robot
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-slate-300 hover:text-cyan-400 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
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
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-17 left-0 w-full bg-slate-950/95 border-b border-slate-800 z-40 px-4 py-6 flex flex-col gap-4 backdrop-blur">
          <a
            href="#how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 text-lg font-medium"
          >
            Procedure
          </a>
          <a
            href="#no-hardware"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 text-lg font-medium"
          >
            Expense
          </a>
          <a
            href="#library"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 text-lg font-medium"
          >
            Accessory
          </a>
          <a
            href="#simulator"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 text-lg font-medium"
          >
            3D Simulator
          </a>
          <a
            href="#built-for-learning"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-300 hover:text-cyan-400 text-lg font-medium"
          >
            Study
          </a>
          <Link
            href="/builder"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-3 rounded-lg text-center transition"
          >
            Create first robot
          </Link>
        </div>
      )}
    </>
  );
}
