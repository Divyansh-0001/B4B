"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { label: "Command", href: "#command" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Operations", href: "#operations" },
  { label: "Access", href: "#access" }
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
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg border border-neon/30 bg-neon/10 shadow-glow" />
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-neon/70">
              Be4Breach
            </p>
            <p className="text-lg font-semibold text-white">Command Core</p>
          </div>
        </div>
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
          <button className="hidden rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-neon/60 hover:text-neon md:block">
            Secure Briefing
          </button>
          <button className="rounded-full bg-neon px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-abyss transition hover:shadow-glow">
            Request Access
          </button>
        </div>
      </div>
    </motion.header>
  );
}
