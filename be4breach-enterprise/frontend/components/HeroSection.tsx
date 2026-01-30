"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import Link from "next/link";
import AnimatedBadge from "@/components/AnimatedBadge";
import StatCard from "@/components/StatCard";

type HeroStat = {
  label: string;
  value: string;
};

type HeroSectionProps = {
  badge: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  stats: HeroStat[];
  highlights: string[];
};

export default function HeroSection({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  stats,
  highlights
}: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const floatTransition: Transition = {
    duration: 12,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut"
  };

  return (
    <section className="glass-panel relative overflow-hidden rounded-[32px] px-8 py-12 lg:px-12 lg:py-16">
      <motion.div
        className="glass-bg absolute -top-24 right-0 z-0 h-72 w-72 rounded-full bg-brand-violet/30 blur-3xl"
        animate={reduceMotion ? undefined : { y: [0, -18, 0], x: [0, 16, 0] }}
        transition={reduceMotion ? { duration: 0 } : floatTransition}
      />
      <motion.div
        className="glass-bg absolute -bottom-24 left-0 z-0 h-80 w-80 rounded-full bg-brand-cyan/25 blur-3xl"
        animate={reduceMotion ? undefined : { y: [0, 16, 0], x: [0, -18, 0] }}
        transition={reduceMotion ? { duration: 0 } : floatTransition}
      />
      <div className="glass-bg absolute inset-0 z-0 bg-grid opacity-70" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <AnimatedBadge>{badge}</AnimatedBadge>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-300"
          >
            {description}
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={primaryCta.href}
                className="rounded-full bg-gradient-to-r from-brand-blue via-brand-violet to-brand-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30"
              >
                {primaryCta.label}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={secondaryCta.href}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              >
                {secondaryCta.label}
              </Link>
            </motion.div>
          </div>
          <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-brand-neon shadow-[0_0_12px_rgba(163,230,53,0.5)]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card relative rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-cyan">
              AI Security Command
            </p>
            <span className="rounded-full border border-brand-neon/30 bg-brand-neon/10 px-3 py-1 text-[11px] font-semibold text-brand-neon">
              Operational
            </span>
          </div>
          <motion.div
            className="glass-bg pointer-events-none absolute left-0 top-0 z-0 h-px w-full bg-gradient-to-r from-transparent via-brand-cyan to-transparent"
            animate={
              reduceMotion ? undefined : { x: ["-100%", "100%"], opacity: [0, 1, 0] }
            }
            transition={{ duration: 8, repeat: Infinity }}
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Live readiness highlights
            </p>
            <ul className="space-y-2">
              <li>• Adaptive control validation across critical assets.</li>
              <li>• Automated response playbooks with audit logs.</li>
              <li>• Executive reporting mapped to compliance mandates.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
