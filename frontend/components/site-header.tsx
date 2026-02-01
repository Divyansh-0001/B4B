import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Compliance & Trust", href: "/compliance" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-abyss-950/85 backdrop-blur-2xl">
      <div className="section-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em]">
          <span className="h-2 w-2 rounded-full bg-lumina-cyan shadow-glow" />
          be4breach
        </Link>
        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/enterprise/login" variant="ghost" className="hidden sm:inline-flex">
            Enterprise Login
          </ButtonLink>
          <ButtonLink href="/contact">Engage be4breach</ButtonLink>
        </div>
      </div>
    </header>
  );
}
