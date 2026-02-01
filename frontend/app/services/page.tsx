import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/lib/content";

export default function ServicesPage() {
  return (
    <div className="relative z-10 py-16">
      <section className="section-shell space-y-6">
        <Reveal preset="fade">
          <Badge>Services</Badge>
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
            End-to-end cybersecurity coverage engineered for elite resilience.
          </h2>
          <p className="max-w-2xl text-lg text-white/70">
            be4breach combines offensive security, continuous monitoring, compliance assurance, and
            executive risk governance to secure every layer of your digital estate.
          </p>
        </Reveal>
      </section>

      <section className="section-shell mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05} preset="fade">
            <Card className="h-full space-y-4">
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="text-sm text-white/60">{service.description}</p>
            </Card>
          </Reveal>
        ))}
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
        <Reveal preset="fade" delay={0.08}>
          <p className="max-w-2xl text-sm text-white/60">
            be4breach delivers compliance clarity across regulatory frameworks with defensible evidence,
            continuous posture monitoring, and executive reporting.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
