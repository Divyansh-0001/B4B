"use client";

import { m, useReducedMotion } from "framer-motion";

import { motionTransition } from "@/components/motion/presets";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const panels = [
  {
    title: "Active Monitoring",
    detail: "SOC coverage with continuous alert triage and escalation discipline.",
    signal: "Awaiting telemetry",
  },
  {
    title: "Incident Readiness",
    detail: "Response playbooks validated and recovery timelines rehearsed.",
    signal: "Signal pending",
  },
  {
    title: "Compliance Posture",
    detail: "CERT-In empanelment documentation current and audit-ready.",
    signal: "Evidence syncing",
  },
  {
    title: "Risk Oversight",
    detail: "Board-level reporting cadence with enterprise risk scoring.",
    signal: "Executive ready",
  },
];

export default function DashboardPanels() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {panels.map((panel, index) => (
        <m.div
          key={panel.title}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...motionTransition, delay: index * 0.08 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <Card className="space-y-4 border-white/15 bg-abyss-900/70 shadow-[0_0_32px_rgba(79,139,255,0.12)]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">{panel.title}</p>
              <span className="text-[0.65rem] uppercase tracking-[0.25em] text-white/40">
                {panel.signal}
              </span>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full rounded-full" />
              <Skeleton className="h-3 w-4/5 rounded-full" />
            </div>
            <p className="text-sm text-white/60">{panel.detail}</p>
          </Card>
        </m.div>
      ))}
    </div>
  );
}
