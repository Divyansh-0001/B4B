"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import CommandConsole from "./CommandConsole";
import MetricTile from "./MetricTile";
import ThreatScan from "./ThreatScan";

type Role = "OPERATIVE" | "PARTNER" | "COMMAND";

type RoleProfile = {
  role: Role;
  title: string;
  summary: string;
};

const roleProfiles: Record<Role, RoleProfile> = {
  OPERATIVE: {
    role: "OPERATIVE",
    title: "Operative Dashboard",
    summary: "Activity overview and live threat awareness."
  },
  PARTNER: {
    role: "PARTNER",
    title: "Partner Dashboard",
    summary: "Engagement status with risk overview panels."
  },
  COMMAND: {
    role: "COMMAND",
    title: "Command Dashboard",
    summary: "User management, system status, and security controls."
  }
};

const operativeMetrics = [
  {
    label: "Active investigations",
    value: "08",
    detail: "Open cases awaiting closure.",
    accent: "neon"
  },
  {
    label: "Containment tasks",
    value: "14",
    detail: "Automated actions ready for review.",
    accent: "ember"
  },
  {
    label: "Response SLA",
    value: "4.2s",
    detail: "Median containment response window.",
    accent: "pulse"
  }
];

const partnerMetrics = [
  {
    label: "Engagement status",
    value: "Active",
    detail: "Operational liaison online.",
    accent: "neon"
  },
  {
    label: "Telemetry sync",
    value: "99.9%",
    detail: "Partner data feeds aligned.",
    accent: "pulse"
  },
  {
    label: "Risk posture",
    value: "Managed",
    detail: "Controls mapped to current scope.",
    accent: "ember"
  }
];

const commandMetrics = [
  {
    label: "Active operators",
    value: "42",
    detail: "Credentialed users on duty.",
    accent: "neon"
  },
  {
    label: "System uptime",
    value: "99.99%",
    detail: "Core services operating nominally.",
    accent: "pulse"
  },
  {
    label: "Policy compliance",
    value: "Aligned",
    detail: "Controls validated within scope.",
    accent: "ember"
  }
];

const activityStream = [
  { time: "00:01", event: "Endpoint triage queued for review." },
  { time: "00:04", event: "Containment playbook executed in Segment 7." },
  { time: "00:08", event: "Threat intel correlation updated." },
  { time: "00:12", event: "Evidence snapshot archived for audit." }
];

const riskPanels = [
  { label: "Identity risk", value: 24 },
  { label: "Cloud exposure", value: 42 },
  { label: "Third-party risk", value: 31 },
  { label: "Data residency", value: 18 }
];

const systemStatus = [
  { label: "Command API", status: "Nominal" },
  { label: "Telemetry pipeline", status: "Stable" },
  { label: "Audit log integrity", status: "Verified" },
  { label: "Incident response", status: "Ready" }
];

const securityControls = [
  { label: "MFA enforcement", status: "Active" },
  { label: "Token expiry policy", status: "Enforced" },
  { label: "Privileged access review", status: "Scheduled" },
  { label: "Critical asset shielding", status: "Enabled" }
];

const userManagement = [
  { label: "Pending requests", value: "03" },
  { label: "Role escalations", value: "01" },
  { label: "Deprovision queue", value: "05" }
];

function StatusBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
        <span>{label}</span>
        <span className="text-neon">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-neon"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StatusRow({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-abyss/80 px-4 py-3">
      <span className="text-sm text-slate-300">{label}</span>
      <span className="text-xs uppercase tracking-[0.3em] text-neon/70">
        {status}
      </span>
    </div>
  );
}

export default function DashboardRoleView() {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadProfile = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Unable to load access profile.");
        }
        const payload = (await response.json()) as { user: { role: Role } };
        if (isMounted) {
          setRole(payload.user.role);
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to load access profile.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const profile = useMemo(() => {
    if (!role) {
      return null;
    }
    return roleProfiles[role];
  }, [role]);

  if (loading) {
    return (
      <div className="glass-panel p-6 text-sm text-slate-300">
        Loading role profile...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="glass-panel p-6 text-sm text-rose-200">
        {error ?? "Unable to load dashboard."}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="glass-panel flex flex-col gap-4 p-6 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neon/70">
            {profile.title}
          </p>
          <p className="mt-2 text-base text-white">{profile.summary}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-abyss/80 px-4 py-3 text-xs uppercase tracking-[0.3em] text-slate-300">
          Clearance: {profile.role}
        </div>
      </div>

      {profile.role === "OPERATIVE" ? (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {operativeMetrics.map((metric) => (
              <MetricTile key={metric.label} {...metric} />
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-panel space-y-4 p-6 text-sm text-slate-300"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Activity Overview
              </p>
              <div className="space-y-3">
                {activityStream.map((item) => (
                  <div
                    key={item.time}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-abyss/80 px-4 py-3"
                  >
                    <span className="text-neon">{item.time}</span>
                    <span className="text-slate-200">{item.event}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="space-y-6">
              <ThreatScan />
              <CommandConsole />
            </div>
          </div>
        </div>
      ) : null}

      {profile.role === "PARTNER" ? (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {partnerMetrics.map((metric) => (
              <MetricTile key={metric.label} {...metric} />
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-panel space-y-4 p-6 text-sm text-slate-300"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Engagement Status
              </p>
              <StatusRow label="Telemetry onboarding" status="Aligned" />
              <StatusRow label="Response coordination" status="Active" />
              <StatusRow label="Audit readiness" status="In progress" />
              <StatusRow label="Executive reporting" status="Scheduled" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-panel space-y-4 p-6 text-sm text-slate-300"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Risk Overview
              </p>
              <div className="space-y-4">
                {riskPanels.map((panel) => (
                  <StatusBar key={panel.label} {...panel} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}

      {profile.role === "COMMAND" ? (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {commandMetrics.map((metric) => (
              <MetricTile key={metric.label} {...metric} />
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-panel space-y-4 p-6 text-sm text-slate-300"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                User Management
              </p>
              <div className="grid gap-3">
                {userManagement.map((item) => (
                  <StatusRow
                    key={item.label}
                    label={item.label}
                    status={item.value}
                  />
                ))}
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-neon/70">
                Command approval required for escalations.
              </p>
            </motion.div>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-panel space-y-4 p-6 text-sm text-slate-300"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  System Status
                </p>
                <div className="grid gap-3">
                  {systemStatus.map((item) => (
                    <StatusRow
                      key={item.label}
                      label={item.label}
                      status={item.status}
                    />
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-panel space-y-4 p-6 text-sm text-slate-300"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Security Controls
                </p>
                <div className="grid gap-3">
                  {securityControls.map((item) => (
                    <StatusRow
                      key={item.label}
                      label={item.label}
                      status={item.status}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
