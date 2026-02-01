import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import "./globals.css";

import BackgroundLayers from "@/components/background-layers";
import MotionProvider from "@/components/motion/motion-provider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
    <html lang="en" className={`${inter.variable} ${plex.variable}`}>
      <body className="min-h-screen bg-abyss-950">
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
