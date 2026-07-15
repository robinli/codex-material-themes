import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: "Codex Material Themes｜7 組真實材質外觀",
    description: "以黑板、木桌、羊皮紙與儀器面板等真實材質為靈感的 7 組 Codex 外觀主題；預覽效果並一鍵複製設定。",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      url: baseUrl,
      title: "Codex Material Themes",
      description: "7 組取材自真實材質與閱讀環境的 Codex 外觀主題。",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Codex Material Themes" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Codex Material Themes",
      description: "7 組取材自真實材質與閱讀環境的 Codex 外觀主題。",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
