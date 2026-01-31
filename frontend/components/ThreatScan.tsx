"use client";

import { motion } from "framer-motion";

const indicators = [
  { label: "Active sectors", value: "128" },
  { label: "Anomalies", value: "02" },
  { label: "Confidence", value: "94%" }
];

export default function ThreatScan() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-abyss/80 p-6 shadow-2xl backdrop-blur">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(69, 243, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(69, 243, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          backgroundPosition: "center"
        }}
      />
      <div className="absolute inset-0 rounded-3xl border border-neon/20 opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(69,243,255,0.25)_50%,transparent_100%)] opacity-40 mix-blend-screen animate-pulse" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/20" />
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/30 animate-pulse" />
      <div className="relative space-y-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
          <span>Threat Scan</span>
          <span className="text-neon">Live</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid gap-4 text-sm"
        >
          {indicators.map((indicator) => (
            <div
              key={indicator.label}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-abyss/70 px-4 py-3 text-slate-300"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {indicator.label}
              </span>
              <span className="text-base font-semibold text-white">
                {indicator.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
