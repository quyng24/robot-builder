import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Robot Builder - Nền Tảng Lập Trình & Giả Lập Robot 3D',
  description: 'Thiết kế robot 3D, lập trình hành vi và kiểm thử trong môi trường mô phỏng ngay trên trình duyệt.',
  openGraph: {
    title: 'Build. Simulate. Make Robots.',
    description: 'Nền tảng học tập và giả lập Robotics trực quan trên trình duyệt.',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
