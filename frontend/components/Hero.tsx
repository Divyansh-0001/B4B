"use client";

import { motion } from "framer-motion";

const missionPoints = [
  "Global threat telemetry fused in real time",
  "Automated containment with human-in-the-loop controls",
  "Zero-trust command mesh across partner networks"
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-20 md:pb-32 md:pt-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] text-neon/80"
          >
            Classified Defense Protocol
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl"
          >
            Cinematic cyber defense with operational-grade reality.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mt-5 text-base text-slate-200 md:text-lg"
          >
            Be4Breach is an intelligence-driven platform that unifies response,
            detection, and partner coordination into a single command lattice.
            Built for modern enterprise defense teams that demand clarity at
            mission speed.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-neon px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-abyss shadow-glow transition hover:scale-[1.01]">
              Activate Command
            </button>
            <button className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-neon/60 hover:text-neon">
              View Intelligence Brief
            </button>
          </div>
          <div className="mt-10 grid gap-4 text-sm text-slate-300">
            {missionPoints.map((point) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <span className="h-2 w-2 rounded-full bg-neon shadow-glow" />
                <span>{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-white/10 bg-slate/60 p-8 shadow-2xl backdrop-blur"
        >
          <div className="absolute inset-0 rounded-3xl border border-neon/20 opacity-40" />
          <div className="relative space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                Live Shield Status
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">
                99.992% Integrity
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Zero active intrusions across monitored assets.
              </p>
            </div>
            <div className="grid gap-4 rounded-2xl border border-white/10 bg-abyss/80 p-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                <span>Threat Horizon</span>
                <span className="text-neon">Green</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <motion.div
                  className="h-2 rounded-full bg-neon"
                  initial={{ width: "0%" }}
                  animate={{ width: "86%" }}
                  transition={{ duration: 1.4 }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Last anomaly neutralized</span>
                <span className="text-white">00:02:18</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-abyss/80 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Command Directive
              </p>
              <p className="mt-3 text-sm text-slate-200">
                Deploy adaptive segmentation across Tier-1 endpoints, then
                initiate deep scan on partner ingress nodes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
