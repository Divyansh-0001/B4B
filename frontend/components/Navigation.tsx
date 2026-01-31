"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { label: "Battlefield", href: "/" },
  { label: "Agency", href: "/about" },
  { label: "Capabilities", href: "/services" },
  { label: "Compliance", href: "/compliance" }
];

export default function Navigation() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="sticky top-0 z-40 border-b border-white/5 bg-abyss/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-lg border border-neon/30 bg-neon/10 shadow-glow">
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-neon/70">
              Be4Breach
            </p>
            <p className="text-lg font-semibold text-white">Global Command</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-neon"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-neon/60 hover:text-neon md:block"
          >
            Secure Access
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full bg-neon px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-abyss transition hover:shadow-glow"
          >
            Command Center
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
