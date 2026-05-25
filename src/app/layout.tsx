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
  title: "艾草 — 千年药草 · 百草之王",
  description:
    "探索艾草的千年历史渊源、药用价值、治病故事与文化传承。一株艾草，承载千年医药智慧；一缕艾烟，传承中华文明血脉。",
  keywords: [
    "艾草",
    "艾灸",
    "中医",
    "中药",
    "百草之王",
    "蕲艾",
    "端午",
    "本草纲目",
    "传统文化",
  ],
  authors: [{ name: "艾草文化传承" }],
  openGraph: {
    title: "艾草 — 千年药草 · 百草之王",
    description: "探索艾草的千年历史渊源、药用价值、治病故事与文化传承",
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
