import BackgroundScene from "../../components/BackgroundScene";
import CommandConsole from "../../components/CommandConsole";
import GlitchText from "../../components/GlitchText";
import MetricTile from "../../components/MetricTile";
import Navigation from "../../components/Navigation";
import SignalTicker from "../../components/SignalTicker";
import ThreatScan from "../../components/ThreatScan";

const metrics = [
  {
    label: "Active missions",
    value: "12",
    detail: "Live containment operations in progress.",
    accent: "neon"
  },
  {
    label: "Critical alerts",
    value: "03",
    detail: "High-priority signals requiring review.",
    accent: "ember"
  },
  {
    label: "Partner sync",
    value: "99.98%",
    detail: "Telemetry alignment across partner nodes.",
    accent: "pulse"
  }
];

const missions = [
  {
    title: "Operation Nightwatch",
    detail: "Tier-1 finance partner ingress monitoring",
    status: "Stabilizing"
  },
  {
    title: "Operation Specter",
    detail: "Containment sweep across edge clusters",
    status: "Active"
  },
  {
    title: "Operation Meridian",
    detail: "Zero-trust credential validation refresh",
    status: "Monitoring"
  }
];

export default function DashboardPage() {
  return (
    <main className="relative">
      <Navigation />
      <section className="relative overflow-hidden pb-12 pt-28">
        <BackgroundScene />
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-neon/80">
            Command Center
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            <GlitchText text="Command Center" className="text-glow" />
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            Real-time operational oversight, threat telemetry, and partner
            synchronization across the global command lattice.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6">
          <SignalTicker />
          <div className="grid gap-6 lg:grid-cols-3">
            {metrics.map((metric) => (
              <MetricTile key={metric.label} {...metric} />
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <CommandConsole />
            <ThreatScan />
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-neon/70">
              Active Missions
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Coordinated operations across critical theaters.
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Mission commanders maintain continuous oversight with partner
              escalation and automated threat containment.
            </p>
          </div>
          <div className="glass-panel space-y-5 p-6 text-sm text-slate-300">
            {missions.map((mission) => (
              <div key={mission.title} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white">{mission.title}</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-neon/70">
                    {mission.status}
                  </span>
                </div>
                <p className="text-slate-400">{mission.detail}</p>
                <div className="h-px bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>Be4Breach Command Center. Live operational feed.</p>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-neon/60">
            Observe. Decide. Execute.
          </p>
        </div>
      </footer>
    </main>
  );
}
