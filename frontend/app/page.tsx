import AnimatedGrid from "../components/AnimatedGrid";
import CommandConsole from "../components/CommandConsole";
import Hero from "../components/Hero";
import HologramCard from "../components/HologramCard";
import MetricTile from "../components/MetricTile";
import Navigation from "../components/Navigation";
import RolePanel from "../components/RolePanel";
import SectionHeading from "../components/SectionHeading";
import SignalTicker from "../components/SignalTicker";

const metrics = [
  {
    label: "Global Coverage",
    value: "142",
    detail: "Active partner nodes across 32 regions.",
    accent: "neon"
  },
  {
    label: "Anomalies Resolved",
    value: "8,412",
    detail: "Incidents neutralized in the last 30 days.",
    accent: "ember"
  },
  {
    label: "Response Velocity",
    value: "4.2s",
    detail: "Median automated containment time.",
    accent: "pulse"
  }
];

const capabilities = [
  {
    tag: "Signal Fusion",
    title: "Multi-source intelligence synthesis",
    description:
      "Aggregate telemetry from endpoints, cloud perimeters, and partner SOCs into a single threat lattice."
  },
  {
    tag: "Adaptive Shield",
    title: "Zero-trust micro-segmentation",
    description:
      "Dynamically reconfigure access control based on real-time behavioral scoring."
  },
  {
    tag: "Autonomous Response",
    title: "Precision containment workflows",
    description:
      "Contain threats with automated playbooks supervised by Command Authority operators."
  }
];

const operations = [
  {
    title: "Threat Mesh Calibration",
    summary:
      "Cross-validate partner telemetry and align defensive heuristics across joint operations."
  },
  {
    title: "Quantum Signal Sweep",
    summary:
      "Deploy predictive anomaly sweeps on Tier-1 infrastructure with zero downtime."
  },
  {
    title: "Command Assurance",
    summary:
      "Audit every action with immutable logs and high-trust operator validation."
  }
];

const roles = [
  {
    title: "Operative",
    designation: "USER",
    summary:
      "Front-line defense specialist executing containment, investigation, and response."
  },
  {
    title: "Partner Organization",
    designation: "CLIENT",
    summary:
      "Trusted enterprise partners sharing telemetry, alerts, and response coordination."
  },
  {
    title: "Command Authority",
    designation: "ADMIN",
    summary:
      "Oversight council controlling strategic directives and elevated response access."
  }
];

export default function Home() {
  return (
    <main className="relative">
      <div className="relative">
        <AnimatedGrid />
        <Navigation />
        <Hero />
      </div>

      <section id="command" className="relative pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6">
          <SignalTicker />
          <div className="grid gap-6 lg:grid-cols-3">
            {metrics.map((metric) => (
              <MetricTile key={metric.label} {...metric} />
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6">
          <SectionHeading
            eyebrow="Capability Matrix"
            title="Defense systems engineered for mission resilience."
            description="Holographic panels surface actionable intelligence while adaptive automation powers rapid response."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {capabilities.map((capability) => (
              <HologramCard key={capability.title} {...capability} />
            ))}
          </div>
        </div>
      </section>

      <section id="operations" className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <SectionHeading
            eyebrow="Operations"
            title="Command-grade workflows that never lose signal."
            description="Be4Breach orchestrates every mission phase, keeping teams aligned with real-time intelligence."
          />
          <CommandConsole />
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          {operations.map((operation) => (
            <div
              key={operation.title}
              className="rounded-2xl border border-white/10 bg-abyss/70 p-6 text-sm text-slate-300 shadow-lg"
            >
              <h3 className="text-base font-semibold text-white">
                {operation.title}
              </h3>
              <p className="mt-3">{operation.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="access" className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6">
          <SectionHeading
            eyebrow="Access Protocol"
            title="Role-based authority across the command lattice."
            description="Each role is tailored to the mission, ensuring secure visibility and controlled actions."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {roles.map((role) => (
              <RolePanel key={role.title} {...role} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="rounded-3xl border border-white/10 bg-slate/60 p-8 shadow-2xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-neon/70">
              Initiate Partnership
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              Secure your organization inside the Be4Breach defense grid.
            </h3>
            <p className="mt-4 text-sm text-slate-300">
              Receive a classified access package, tailored deployment roadmap,
              and on-call command advisory from elite cyber operators.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="rounded-full bg-neon px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-abyss shadow-glow transition hover:scale-[1.01]">
                Request Onboarding
              </button>
              <button className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-neon/60 hover:text-neon">
                Download Protocol
              </button>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-abyss/70 p-8 text-sm text-slate-300 shadow-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Deployment Snapshot
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-white">Integration window</p>
                <p>48 hours average across global partners.</p>
              </div>
              <div>
                <p className="text-white">Command authority support</p>
                <p>24/7 direct escalation to senior operators.</p>
              </div>
              <div>
                <p className="text-white">Compliance posture</p>
                <p>Aligned with SOC 2, ISO 27001, and zero-trust mandates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>Be4Breach Command Core. All systems guarded.</p>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-neon/60">
            Secure. Silent. Relentless.
          </p>
        </div>
      </footer>
    </main>
  );
}
