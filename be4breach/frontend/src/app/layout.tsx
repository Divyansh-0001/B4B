import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";

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
    "Be4Breach is a cybersecurity consulting and services firm delivering VAPT, red teaming, incident response, and compliance advisory.",
  applicationName: "Be4Breach",
  metadataBase: new URL("https://be4breach.com"),
  openGraph: {
    title: "Be4Breach",
    description:
      "Cybersecurity consulting and services firm delivering VAPT, red teaming, incident response, and compliance advisory.",
    url: "https://be4breach.com",
    siteName: "Be4Breach",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Be4Breach",
    description:
      "Cybersecurity consulting and services firm delivering VAPT, red teaming, incident response, and compliance advisory.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col overflow-hidden">
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_55%)]" />
                <div className="absolute inset-0 bg-grid-slate opacity-40" />
                <div className="absolute -left-32 top-48 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.18),_transparent_65%)] blur-3xl" />
                <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(45,212,191,0.16),_transparent_60%)] blur-3xl" />
              </div>
              <SiteHeader />
              <PageTransition>
                <main className="flex-1">{children}</main>
              </PageTransition>
              <SiteFooter />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
