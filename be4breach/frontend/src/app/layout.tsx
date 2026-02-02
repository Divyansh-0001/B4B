import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Be4Breach",
    template: "%s | Be4Breach",
  },
  description:
    "Be4Breach is a cybersecurity resilience platform delivering identity defense, threat detection, and rapid incident response.",
  applicationName: "Be4Breach",
  metadataBase: new URL("https://be4breach.com"),
  openGraph: {
    title: "Be4Breach",
    description:
      "Cybersecurity resilience platform delivering identity defense, threat detection, and rapid incident response.",
    url: "https://be4breach.com",
    siteName: "Be4Breach",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Be4Breach",
    description:
      "Cybersecurity resilience platform delivering identity defense, threat detection, and rapid incident response.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
