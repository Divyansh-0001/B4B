import Link from "next/link";
import AnimatedBadge from "@/components/AnimatedBadge";
import StatCard from "@/components/StatCard";

const stats = [
  { label: "Threat Intelligence Feeds", value: "128+" },
  { label: "Policy Coverage", value: "97%" },
  { label: "Employee Risk Index", value: "Low" }
];

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <AnimatedBadge>Enterprise Ready • Zero-Trust</AnimatedBadge>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Be4Breach keeps your workforce resilient against modern threats.
          </h1>
          <p className="text-lg text-slate-300">
            Unify phishing simulations, awareness training, and incident
            readiness with real-time telemetry and automated remediation.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/login"
              className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Access secure console
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
            >
              View live dashboards
            </Link>
          </div>
        </div>
        <div className="glass-panel rounded-3xl p-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-cyan">
              Security posture snapshot
            </p>
            <div className="grid gap-4">
              {stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="glass-panel rounded-3xl p-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            "Real-time user risk scoring",
            "Adaptive phishing simulations",
            "SOC-ready reporting"
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
            >
              <p className="text-base font-semibold text-white">{item}</p>
              <p className="mt-2 text-sm text-slate-400">
                Operationalize security awareness with measurable outcomes.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
