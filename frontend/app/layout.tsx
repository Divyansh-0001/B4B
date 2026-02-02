import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Be4Breach",
  description: "Be4Breach cybersecurity platform"
};

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/compliance", label: "Compliance" },
  { href: "/about", label: "About" }
];

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased min-h-screen">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-border bg-surface/80 backdrop-blur">
            <div className="layout-container flex items-center justify-between py-4">
              <Link className="text-lg font-semibold tracking-tight" href="/">
                Be4Breach
              </Link>
              <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
                {navLinks.map((link) => (
                  <Link
                    className="transition-colors duration-200 ease-out hover:text-foreground"
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <div className="flex-1">{children}</div>

          <footer className="border-t border-border bg-surface">
            <div className="layout-container flex flex-col gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>Be4Breach · Pune, India</span>
              <span>Security advisory, assurance, and managed defense.</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
