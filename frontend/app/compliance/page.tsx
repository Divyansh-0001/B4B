import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { compliancePillars, trustSignals } from "@/lib/content";

export default function CompliancePage() {
  return (
    <div className="relative z-10 py-16">
      <section className="section-shell space-y-6">
        <Reveal>
          <Badge>Compliance & Trust</Badge>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            CERT-In empanelled. Compliance without compromise.
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            We align security programs with regulatory mandates, delivering transparent evidence and
            executive-ready assurance across every audit cycle.
          </p>
        </Reveal>
      </section>

      <section className="section-shell mt-12 grid gap-6 md:grid-cols-3">
        {compliancePillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 0.08}>
            <Card className="h-full space-y-4">
              <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="text-sm text-white/60">{pillar.description}</p>
            </Card>
          </Reveal>
        ))}
      </section>

      <section className="section-shell mt-16">
        <Reveal>
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
