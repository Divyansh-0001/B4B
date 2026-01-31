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
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate/70 p-6 shadow-lg backdrop-blur"
    >
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="h-full w-full bg-[linear-gradient(120deg,rgba(69,243,255,0.16),transparent_55%)]" />
      </div>
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
        {designation}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-slate-300">{summary}</p>
    </motion.div>
  );
}
