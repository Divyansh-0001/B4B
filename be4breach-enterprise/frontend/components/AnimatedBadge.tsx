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
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan"
    >
      <span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
      {children}
    </motion.div>
  );
}
