import BackgroundScene from "../../components/BackgroundScene";
import GlitchText from "../../components/GlitchText";
import Navigation from "../../components/Navigation";
import SectionHeading from "../../components/SectionHeading";

const frameworks = [
  {
    title: "SOC 2 Type II",
    detail:
      "Security, availability, and confidentiality controls validated with continuous reporting."
  },
  {
    title: "ISO 27001",
    detail:
      "Aligned policies, asset governance, and risk management across global operations."
  },
  {
    title: "Zero-Trust Mandates",
    detail:
      "Continuous verification, least privilege enforcement, and adaptive access control."
  }
];

const assurances = [
  {
    label: "Data governance",
    value: "Immutable audit trails and encrypted telemetry pipelines."
  },
  {
    label: "Access control",
    value: "RBAC enforcement with command authority escalation gates."
  },
  {
    label: "Operational resilience",
    value: "Zero-crash architecture with automatic failover readiness."
  },
  {
    label: "Incident readiness",
    value: "Documented playbooks, tabletop exercises, and partner drills."
  }
];

export default function CompliancePage() {
  return (
    <main className="relative">
      <Navigation />
      <section className="relative overflow-hidden pb-16 pt-28">
        <BackgroundScene />
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-neon/80">
            Trust & Authority
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            <GlitchText text="Trust & Authority" className="text-glow" />
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            Enterprise-grade compliance built into every layer of the Be4Breach
            command lattice.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6">
          <SectionHeading
            eyebrow="Compliance Frameworks"
            title="Security controls designed for regulatory alignment."
            description="Be4Breach maintains continuous readiness across global compliance mandates."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {frameworks.map((framework) => (
              <div
                key={framework.title}
                className="glass-card relative overflow-hidden p-6 text-sm text-slate-300"
              >
                <div className="absolute inset-0 panel-sheen opacity-10" />
                <h3 className="relative text-lg font-semibold text-white">
                  {framework.title}
                </h3>
                <p className="relative mt-3">{framework.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <SectionHeading
            eyebrow="Assurance Layers"
            title="Operational trust without compromise."
            description="Command Authority maintains full oversight while automated controls enforce policy."
          />
          <div className="glass-panel space-y-5 p-6 text-sm text-slate-300">
            {assurances.map((assurance) => (
              <div key={assurance.label}>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {assurance.label}
                </p>
                <p className="mt-2 text-white">{assurance.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>Be4Breach Compliance Division. Auditable by design.</p>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-neon/60">
            Verified. Documented. Defensible.
          </p>
        </div>
      </footer>
    </main>
  );
}
