import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Be4Breach Enterprise",
  description: "Enterprise-grade cybersecurity readiness platform."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-grid opacity-60" />
            <div className="absolute -top-40 right-10 h-72 w-72 rounded-full bg-brand-violet/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-brand-cyan/20 blur-3xl" />
            <div className="absolute bottom-20 right-0 h-72 w-72 rounded-full bg-brand-red/15 blur-3xl" />
          </div>
          <div className="relative z-10">
            <NavBar />
            <main className="mx-auto w-full max-w-7xl px-6 py-16">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
