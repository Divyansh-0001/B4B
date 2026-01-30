"use client";

import { motion } from "framer-motion";

type StatCardProps = {
  label: string;
  value: string;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 22px 40px -30px rgba(34, 211, 238, 0.4)" }}
      transition={{ duration: 0.2 }}
      className="glass-card rounded-2xl p-4"
    >
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </motion.div>
  );
}
