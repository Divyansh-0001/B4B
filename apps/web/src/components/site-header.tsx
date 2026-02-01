import Link from "next/link";

import { navLinks } from "@/data/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-frost/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight">Be4Breach</span>
          <span className="rounded-full bg-brandSoft px-2 py-1 text-[11px] font-medium text-brand">
            Cybersecurity
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-steel md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-full border border-brand/30 bg-brand px-4 py-2 text-sm font-medium text-white shadow-soft transition hover:bg-blue-500"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
