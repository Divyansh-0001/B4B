import Link from "next/link";

import { navLinks } from "@/data/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-frost bg-white">
      <div className="container-wide flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight">Be4Breach</span>
          <span className="rounded-full border border-frost bg-mist px-2 py-1 text-[11px] font-medium text-steel">
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
            className="rounded-full border border-brand/40 bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand/90"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
