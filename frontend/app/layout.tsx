import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import TransitionProvider from "../components/TransitionProvider";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Be4Breach | Cyber Command Center",
  description:
    "Cinematic cybersecurity operations platform with enterprise-grade defense, intelligence, and response."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden bg-abyss text-slate-100 antialiased">
        <div
          className="fixed inset-0 -z-10 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(69, 243, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(69, 243, 255, 0.08) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            backgroundPosition: "center"
          }}
        />
        <div
          className="fixed inset-0 -z-10 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at top, rgba(69, 243, 255, 0.2), transparent 55%)"
          }}
        />
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-void/90 via-abyss/90 to-black" />
        <div className="fixed inset-0 -z-10 pointer-events-none opacity-20 after:absolute after:inset-0 after:content-[''] after:bg-[linear-gradient(transparent_0%,_rgba(255,255,255,0.05)_50%,_transparent_100%)] after:animate-scanline" />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
