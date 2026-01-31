"use client";

import { motion } from "framer-motion";

type MetricTileProps = {
  label: string;
  value: string;
  detail: string;
  accent?: "neon" | "ember" | "pulse";
};

const accentMap: Record<NonNullable<MetricTileProps["accent"]>, string> = {
  neon: "text-neon",
  ember: "text-ember",
  pulse: "text-pulse"
};

export default function MetricTile({
  label,
  value,
  detail,
  accent = "neon"
}: MetricTileProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate/70 p-6 shadow-lg backdrop-blur"
    >
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="h-full w-full bg-[linear-gradient(120deg,rgba(69,243,255,0.16),transparent_55%)]" />
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
        {label}
      </p>
      <p className={`mt-3 text-3xl font-semibold ${accentMap[accent]}`}>
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-300">{detail}</p>
    </motion.div>
  );
}
