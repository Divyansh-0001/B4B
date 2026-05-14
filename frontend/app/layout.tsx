import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";
import { InteractiveSiteShell } from "@/components/layout/InteractiveSiteShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Be4Breach Platform",
  description: "Advanced security platform with role-based access control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <InteractiveSiteShell>{children}</InteractiveSiteShell>
        </AuthProvider>
      </body>
    </html>
  );
}
