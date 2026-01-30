"use client";

import { motion } from "framer-motion";

const signals = [
  "Tier-1 firewall anomaly neutralized",
  "Partner ingress verified | 00:00:45",
  "Quantum heuristic scan complete",
  "Signal fusion updated: 4 new indicators",
  "Adaptive mesh reinforced across core clusters",
  "Command authority review in progress"
];

export default function SignalTicker() {
  const loop = [...signals, ...signals];

  return (
    <div className="overflow-hidden rounded-full border border-white/10 bg-abyss/70 py-3 text-xs uppercase tracking-[0.3em] text-neon">
      <motion.div
        className="flex gap-10 whitespace-nowrap px-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((signal, index) => (
          <span key={`${signal}-${index}`} className="opacity-80">
            {signal}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
