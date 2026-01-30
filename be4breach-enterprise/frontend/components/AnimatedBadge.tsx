"use client";

import { motion } from "framer-motion";

type AnimatedBadgeProps = {
  children: React.ReactNode;
};

export default function AnimatedBadge({ children }: AnimatedBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-100 shadow-glow"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-red shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
      {children}
    </motion.div>
  );
}
