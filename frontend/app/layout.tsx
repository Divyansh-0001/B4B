import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

import BackgroundLayers from "@/components/background-layers";
import MotionProvider from "@/components/motion/motion-provider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "be4breach | Elite Cybersecurity",
    template: "%s | be4breach",
  },
  description:
    "Elite cybersecurity services and enterprise-ready defense platforms. VAPT, SOC, compliance, cloud, application security, incident response, risk & governance.",
  metadataBase: new URL("https://be4breach.com"),
  openGraph: {
    title: "be4breach",
    description: "Elite cybersecurity services and secure enterprise defense.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="min-h-screen bg-abyss-900">
        <MotionProvider>
          <div className="relative min-h-screen overflow-hidden">
            <BackgroundLayers />
            <SiteHeader />
            <main className="relative z-10">{children}</main>
            <SiteFooter />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
