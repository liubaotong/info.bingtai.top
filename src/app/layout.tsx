import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "冰台 · 艾草 — 千年药草 百草之王",
  description:
    "探索艾草的千年历史渊源、称谓文化、药用价值、治病故事、奇用妙法与文化传承。冰台，艾草之古称，削冰令圆，以艾承影，引天火而济苍生。",
  keywords: [
    "艾草",
    "冰台",
    "bingtai",
    "艾灸",
    "中医",
    "中药",
    "百草之王",
    "蕲艾",
    "端午",
    "本草纲目",
    "传统文化",
    "阳燧取火",
  ],
  authors: [{ name: "冰台 bingtai" }],
  openGraph: {
    title: "冰台 · 艾草 — 千年药草 百草之王",
    description: "探索艾草的千年历史渊源、称谓文化、药用价值、治病故事与文化传承",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
