"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Radar, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const metrics = [
  { label: "Mean time to detect", value: "< 3 min" },
  { label: "Incident response playbooks", value: "42 ready" },
  { label: "Telemetry sources", value: "120+ integrated" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-background" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Badge className="w-fit bg-primary/10 text-primary">
            Security resilience platform
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Be4Breach keeps your identity, cloud, and endpoint signals aligned
            before threats become headlines.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Consolidate telemetry, automate incident workflows, and maintain
            compliance in real time. Built for security teams that need high
            signal visibility and operational control without sacrificing speed.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/auth/register">
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
          className="grid gap-4 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-xl backdrop-blur md:grid-cols-3"
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border/60 bg-background p-4"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {metric.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {metric.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
