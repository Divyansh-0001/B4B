"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import BackgroundScene from "./BackgroundScene";
import GlitchText from "./GlitchText";
import ThreatScan from "./ThreatScan";

const missionPoints = [
  "Global telemetry fused into a unified threat lattice",
  "Zero-trust command mesh across partner environments",
  "Autonomous containment with human-in-the-loop oversight"
];

const commandStats = [
  { label: "Global nodes", value: "142" },
  { label: "Signals synced", value: "8.4K" },
  { label: "Containment time", value: "4.2s" }
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pb-20 pt-28">
      <BackgroundScene />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] text-neon/80"
          >
            Be4Breach Command Core
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-4 text-4xl font-semibold leading-tight text-white md:text-6xl"
          >
            <GlitchText
              text="The Digital Battlefield"
              className="text-glow"
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mt-6 text-base text-slate-200 md:text-lg"
          >
            A cinematic global cyber command center built for enterprise reality.
            Be4Breach orchestrates detection, response, and partner intelligence
            with precision, speed, and resilience.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            {missionPoints.map((point) => (
              <span
                key={point}
                className="glass-card px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200/80"
              >
                {point}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="rounded-full bg-neon px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-abyss shadow-glow transition hover:scale-[1.01]"
            >
              Enter Command Center
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-neon/60 hover:text-neon"
            >
              View Defense Capabilities
            </Link>
          </div>
          <div className="mt-10 grid gap-4 text-sm text-slate-300 md:grid-cols-3">
            {commandStats.map((stat) => (
              <div key={stat.label} className="glass-card px-4 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <ThreatScan />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel relative overflow-hidden p-6"
          >
            <div className="absolute inset-0 panel-sheen opacity-20" />
            <div className="relative space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Command Directive
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Maintain continuous surveillance across partner ingress nodes.
                </p>
              </div>
              <div className="grid gap-3 rounded-2xl border border-white/10 bg-abyss/80 p-4 text-sm text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Threat horizon
                  </span>
                  <span className="text-neon">Green</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <motion.div
                    className="h-2 rounded-full bg-neon"
                    initial={{ width: "0%" }}
                    animate={{ width: "82%" }}
                    transition={{ duration: 1.4 }}
                  />
                </div>
                <p className="text-xs text-slate-400">
                  Last anomaly neutralized 00:02:18 ago.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
