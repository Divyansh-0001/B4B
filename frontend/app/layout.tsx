import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
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
      <body className="relative overflow-x-hidden bg-abyss text-slate-100">
        <div className="fixed inset-0 -z-10 bg-grid opacity-35" />
        <div className="fixed inset-0 -z-10 bg-radial-glow opacity-70" />
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-void/90 via-abyss/90 to-black" />
        <div className="fixed inset-0 -z-10 scanlines" />
        {children}
      </body>
    </html>
  );
}
