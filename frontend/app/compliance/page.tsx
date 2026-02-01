import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { compliancePillars, complianceStandards, trustSignals } from "@/lib/content";

export default function CompliancePage() {
  return (
    <div className="relative z-10 py-16">
      <section className="section-shell space-y-6">
        <Reveal preset="fade">
          <Badge>Compliance & Trust</Badge>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            be4breach is built for leaders who cannot afford uncertainty.
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            Built for regulated enterprises, critical infrastructure, and high-value digital assets.
          </p>
        </Reveal>
      </section>

      <div className="section-shell mt-12">
        <div className="glow-divider" />
      </div>

      <section className="section-shell mt-12 space-y-6">
        <Reveal preset="fade">
          <div className="glass-panel rounded-[32px] p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">CERT-In empanelled</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              Compliance without compromise.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              We align security programs with regulatory mandates, delivering transparent evidence and
              executive-ready assurance across every audit cycle.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section-shell mt-12 grid gap-6 md:grid-cols-3">
        {compliancePillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 0.08} preset="fade">
            <Card className="h-full space-y-4 border-white/15 bg-abyss-900/70 shadow-[0_0_30px_rgba(79,139,255,0.12)]">
              <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="text-sm text-white/60">{pillar.description}</p>
            </Card>
          </Reveal>
        ))}
      </section>

      <div className="section-shell mt-12">
        <div className="glow-divider" />
      </div>

      <section className="section-shell mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal preset="fade">
          <div className="glass-panel rounded-[28px] p-8">
            <h3 className="text-xl font-semibold text-white">Trust signals embedded by default</h3>
            <p className="mt-4 max-w-2xl text-sm text-white/60">
              be4breach delivers compliance clarity across regulatory frameworks with defensible evidence,
              continuous posture monitoring, and executive reporting.
            </p>
            <ul className="mt-6 grid gap-4 text-sm text-white/70 md:grid-cols-2">
              {trustSignals.map((signal) => (
                <li key={signal} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-lumina-cyan shadow-glow" />
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal preset="fade" delay={0.1}>
          <div className="glass-panel rounded-[28px] p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Regulatory alignment</p>
            <p className="mt-4 text-sm text-white/70">
              Coverage for ISO 27001, PCI-DSS, SOC 2, and sector-specific mandates.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              {complianceStandards.map((standard) => (
                <p key={standard}>{standard}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
