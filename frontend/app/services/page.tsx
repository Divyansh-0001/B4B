import BackgroundScene from "../../components/BackgroundScene";
import GlitchText from "../../components/GlitchText";
import HologramCard from "../../components/HologramCard";
import Navigation from "../../components/Navigation";
import SectionHeading from "../../components/SectionHeading";
import ThreatScan from "../../components/ThreatScan";

const capabilities = [
  {
    tag: "Defense Layer",
    title: "Adaptive threat containment",
    description:
      "Automated playbooks isolate adversaries across endpoints, cloud, and partner ingress lanes."
  },
  {
    tag: "Defense Layer",
    title: "Continuous signal fusion",
    description:
      "High-volume telemetry is normalized, correlated, and prioritized by mission impact."
  },
  {
    tag: "Defense Layer",
    title: "Zero-trust identity mesh",
    description:
      "Privilege is enforced through continuous verification, device posture, and behavior scoring."
  },
  {
    tag: "Defense Layer",
    title: "Mission-grade observability",
    description:
      "Command operators gain full-spectrum visibility with immutable audit trails."
  },
  {
    tag: "Defense Layer",
    title: "Partner coordination bridge",
    description:
      "Shared incident rooms and escalation workflows align internal and partner actions."
  },
  {
    tag: "Defense Layer",
    title: "Crisis response surge",
    description:
      "Elite response units deploy within minutes for Tier-1 threat events."
  }
];

const responseSteps = [
  {
    title: "Detect",
    detail:
      "Multi-layer sensors capture anomalous behavior, malware signatures, and insider signals."
  },
  {
    title: "Contain",
    detail:
      "Automated isolation protects critical assets while retaining operational continuity."
  },
  {
    title: "Recover",
    detail:
      "Systems are restored with verified integrity checks and governance approvals."
  }
];

export default function ServicesPage() {
  return (
    <main className="relative">
      <Navigation />
      <section className="relative overflow-hidden pb-16 pt-28">
        <BackgroundScene />
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-neon/80">
            Defense Capabilities
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            <GlitchText text="Defense Capabilities" className="text-glow" />
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            Modular, intelligence-driven services engineered to secure every
            layer of the digital battlefield.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6">
          <SectionHeading
            eyebrow="Capability Matrix"
            title="Defense systems engineered for mission resilience."
            description="Each module integrates directly into the Be4Breach command mesh for real-time coordination."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <HologramCard key={capability.title} {...capability} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <SectionHeading
            eyebrow="Threat Response"
            title="Precision operations across every phase."
            description="Be4Breach operators follow a strict detect-contain-recover cycle to ensure mission continuity."
          />
          <ThreatScan />
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          {responseSteps.map((step) => (
            <div
              key={step.title}
              className="glass-card relative overflow-hidden p-6 text-sm text-slate-300"
            >
              <div className="absolute inset-0 panel-sheen opacity-10" />
              <h3 className="relative text-base font-semibold text-white">
                {step.title}
              </h3>
              <p className="relative mt-3">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>Be4Breach Defense Capabilities. Mission ready.</p>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-neon/60">
            Protect. Detect. Respond.
          </p>
        </div>
      </footer>
    </main>
  );
}
