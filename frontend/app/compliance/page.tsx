import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { compliancePillars, trustSignals } from "@/lib/content";

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
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            CERT-In empanelled. Compliance without compromise.
          </h2>
          <p className="max-w-2xl text-lg text-white/70">
            We align security programs with regulatory mandates, delivering transparent evidence and
            executive-ready assurance across every audit cycle.
          </p>
        </Reveal>
      </section>

      <section className="section-shell mt-12 grid gap-6 md:grid-cols-3">
        {compliancePillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 0.08} preset="fade">
            <Card className="h-full space-y-4">
              <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="text-sm text-white/60">{pillar.description}</p>
            </Card>
          </Reveal>
        ))}
      </section>

      <div className="section-shell mt-12">
        <div className="glow-divider" />
      </div>

      <section className="section-shell mt-16 space-y-6">
        <Reveal preset="fade">
          <p className="max-w-2xl text-sm text-white/60">
            be4breach delivers compliance clarity across regulatory frameworks with defensible evidence,
            continuous posture monitoring, and executive reporting.
          </p>
        </Reveal>
        <Reveal preset="fade">
          <div className="glass-panel rounded-[28px] p-8">
            <h3 className="text-xl font-semibold text-white">Trust signals embedded by default</h3>
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
      </section>
    </div>
  );
}
