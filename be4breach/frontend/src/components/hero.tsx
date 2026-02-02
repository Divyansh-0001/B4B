"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Radar, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const metrics = [
  { label: "Mean time to detect", value: "< 3 min" },
  { label: "Response playbooks", value: "42 live" },
  { label: "Telemetry sources", value: "120+ integrated" },
];

const signalFeed = [
  {
    title: "Identity risk spike",
    detail: "MFA fatigue blocked for EU workforce.",
    status: "High",
    time: "2m ago",
  },
  {
    title: "Cloud exposure drift",
    detail: "Privileged IAM grants removed in AWS.",
    status: "Medium",
    time: "12m ago",
  },
  {
    title: "Endpoint isolation",
    detail: "Device quarantined after lateral movement.",
    status: "High",
    time: "31m ago",
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
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_45%)]" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Badge className="w-fit bg-primary/10 text-primary">
            Security resilience platform
          </Badge>
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Threat detection + response
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Be4Breach aligns identity, cloud, and endpoint signals before
              threats become headlines.
            </h1>
          </div>
          <p className="max-w-xl text-lg text-muted-foreground">
            Consolidate telemetry, automate incident workflows, and maintain
            compliance in real time. Built for security teams that demand
            high-signal visibility with decisive response control.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/register">
                Request access <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/platform">Explore the platform</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              SOC 2 Type II aligned controls
            </span>
            <span className="flex items-center gap-2">
              <Radar className="h-4 w-4 text-primary" />
              24/7 detection telemetry pipeline
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-xl backdrop-blur"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-border/60 bg-background/70 p-4 hover-lift"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/80 p-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>Live signal feed</span>
              <span>Real-time</span>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-4 space-y-4"
            >
              {signalFeed.map((signal) => (
                <motion.div
                  key={signal.title}
                  variants={item}
                  className="flex items-start justify-between gap-4 rounded-xl border border-border/60 bg-card/80 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {signal.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {signal.detail}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p className="font-semibold text-primary">{signal.status}</p>
                    <p>{signal.time}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
