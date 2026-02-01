import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/lib/content";

export default function ServicesPage() {
  return (
    <div className="relative z-10 py-16">
      <section className="section-shell space-y-6">
        <Reveal>
          <Badge>Services</Badge>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            End-to-end cybersecurity coverage engineered for elite resilience.
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            be4breach combines offensive security, continuous monitoring, compliance assurance, and
            executive risk governance to secure every layer of your digital estate.
          </p>
        </Reveal>
      </section>

      <section className="section-shell mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05}>
            <Card className="h-full space-y-4">
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="text-sm text-white/60">{service.description}</p>
            </Card>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
