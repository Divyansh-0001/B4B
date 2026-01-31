"use client";

import { motion } from "framer-motion";

type HologramCardProps = {
  title: string;
  description: string;
  tag: string;
};

export default function HologramCard({
  title,
  description,
  tag
}: HologramCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-abyss/80 p-6 shadow-xl backdrop-blur"
    >
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="h-full w-full bg-[linear-gradient(120deg,rgba(69,243,255,0.16),transparent_55%)]" />
      </div>
      <p className="text-xs uppercase tracking-[0.35em] text-neon/70">{tag}</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-slate-300">{description}</p>
      <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neon">
        <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-glow" />
        Active
      </div>
    </motion.article>
  );
}
