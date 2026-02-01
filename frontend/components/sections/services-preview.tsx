import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { services } from "@/lib/content";

export default function ServicesPreview() {
  return (
    <section className="py-20">
      <div className="section-shell space-y-10">
        <Reveal>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Services</p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Full-spectrum cybersecurity coverage.
              </h2>
            </div>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <Card className="h-full space-y-4">
                <h3 className="text-base font-semibold text-white">{service.title}</h3>
                <p className="text-sm text-white/60">{service.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
