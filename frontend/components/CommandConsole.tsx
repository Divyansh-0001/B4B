"use client";

import { motion } from "framer-motion";

const logs = [
  { time: "00:00:08", message: "Secure channel established with partner ops." },
  { time: "00:00:23", message: "Anomaly cluster quarantined in Segment Delta." },
  { time: "00:00:41", message: "Threat intel correlation reached 93%." },
  { time: "00:01:04", message: "Adaptive firewall layers synced globally." }
];

export default function CommandConsole() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="rounded-3xl border border-white/10 bg-abyss/80 p-6 shadow-2xl backdrop-blur"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
        <span>Command Console</span>
        <span className="text-neon">Live</span>
      </div>
      <div className="mt-5 grid gap-4 font-mono text-sm text-slate-200">
        {logs.map((log) => (
          <div key={log.time} className="flex gap-3">
            <span className="text-neon">{log.time}</span>
            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
