"use client";

import { motion } from "framer-motion";

type RolePanelProps = {
  title: string;
  designation: string;
  summary: string;
};

export default function RolePanel({
  title,
  designation,
  summary
}: RolePanelProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/10 bg-slate/70 p-6 shadow-lg backdrop-blur"
    >
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
        {designation}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-slate-300">{summary}</p>
    </motion.div>
  );
}
