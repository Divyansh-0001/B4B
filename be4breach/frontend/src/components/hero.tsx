"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Radar, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const metrics = [
  { label: "Enterprise-grade assurance", value: "CERT-In aligned" },
  { label: "Response readiness", value: "24/7 coverage" },
  { label: "Security scope", value: "Cloud to endpoint" },
];

const signalFeed = [
  {
    title: "VAPT engagement",
    detail: "Critical controls validated in payment workflows.",
    status: "High",
    time: "Today",
  },
  {
    title: "Red team simulation",
    detail: "Adversary path mapped across cloud identity.",
    status: "Medium",
    time: "This week",
  },
  {
    title: "IR standby",
    detail: "Digital forensics kit deployed for rapid triage.",
    status: "Active",
    time: "Ongoing",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [visualReady, setVisualReady] = React.useState(false);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setVisualReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : container;
  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : item;

  return (
    <section className="relative min-h-screen overflow-hidden bg-hero-gradient text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.1),_transparent_60%)]" />
        <div className="absolute left-10 top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute right-20 top-10 h-60 w-60 rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-[160px]" />
        <div className="absolute inset-x-0 top-24 h-32 bg-[radial-gradient(circle,_rgba(56,189,248,0.12),_transparent_70%)] animate-[pulse-soft_6s_ease-in-out_infinite]" />
      </div>
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-grid-slate animate-[drift_8s_ease-in-out_infinite]" />
      </div>
      <div className="mx-auto grid min-h-screen w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }
          }
          className="space-y-6"
        >
          <Badge className="w-fit bg-white/10 text-white/80">
            CERT-In empanelled cybersecurity services
          </Badge>
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-200/70">
              Enterprise cybersecurity assurance
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl text-glow">
              Enterprise-Grade Cyber Defense
            </h1>
          </div>
          <p className="max-w-xl text-lg text-white/70">
            Protect What Matters Most — Your Digital World
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-cyan-400/90 text-slate-950 hover:bg-cyan-300"
            >
              <Link href="/register">
                Get Protected Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Link href="/platform">Learn More</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              CERT-In empanelled security partner
            </span>
            <span className="flex items-center gap-2">
              <Radar className="h-4 w-4 text-cyan-300" />
              Enterprise-grade assessments and response
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.9, ease: "easeOut" }
          }
          className="relative flex items-center justify-center"
        >
          <div className="relative flex h-[420px] w-[420px] items-center justify-center">
            {!visualReady ? (
              <div className="h-[420px] w-[420px] rounded-full border border-white/10 bg-white/5" />
            ) : (
              <>
                <div className="absolute inset-0 rounded-full border border-cyan-300/30 opacity-60 blur-[1px]" />
                <div className="absolute inset-6 rounded-full border border-blue-500/20" />
                <div className="absolute inset-10 rounded-full border border-white/10" />
                <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-[120px]" />
                <div className="absolute inset-16 rounded-full bg-gradient-to-b from-slate-900/80 to-slate-950 shadow-[0_0_120px_-40px_rgba(34,211,238,0.6)]" />
                <div className="absolute inset-20 rounded-full border border-cyan-300/30 neon-border" />
                <div className="absolute inset-28 rounded-full bg-gradient-to-br from-cyan-300/20 via-slate-900 to-slate-950" />
                <div className="absolute inset-0 rounded-full border border-cyan-300/40 opacity-70 animate-[float-slow_8s_ease-in-out_infinite]" />
                <div className="absolute inset-0 rounded-full border border-blue-500/30 opacity-60 animate-[float-slow_10s_ease-in-out_infinite]" />
              </>
            )}
          </div>
          <div className="absolute -left-8 top-8 w-52 rounded-2xl glass-card neon-border p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
              Enterprise
            </p>
            <p className="mt-2 text-sm text-white">
              Security programs aligned to regulated industries.
            </p>
          </div>
          <div className="absolute -right-6 bottom-10 w-56 rounded-2xl glass-card neon-border p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
              Incident Response
            </p>
            <p className="mt-2 text-sm text-white">
              Forensics-ready engagements and rapid containment.
            </p>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              Guardian Core • Be4Breach AI Defense Layer
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto grid w-full max-w-6xl gap-4 px-6 pb-16 md:grid-cols-3"
      >
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            variants={itemVariants}
            className="rounded-2xl glass-card neon-border p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
              {metric.label}
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {metric.value}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto grid w-full max-w-6xl gap-4 px-6 pb-16 md:grid-cols-3"
      >
        {signalFeed.map((signal) => (
          <motion.div
            key={signal.title}
            variants={itemVariants}
            className="flex items-start justify-between gap-4 rounded-2xl glass-card neon-border p-4"
          >
            <div>
              <p className="text-sm font-semibold text-white">{signal.title}</p>
              <p className="text-xs text-white/60">{signal.detail}</p>
            </div>
            <div className="text-right text-xs text-white/60">
              <p className="font-semibold text-cyan-300">{signal.status}</p>
              <p>{signal.time}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
