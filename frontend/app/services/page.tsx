import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import ServicesShowcase from "@/components/sections/services-showcase";
import { servicesPageContent } from "@/lib/content";

export default function ServicesPage() {
  return (
    <div className="relative z-10 py-16">
      <section className="section-shell space-y-6">
        <Reveal preset="fade">
          <Badge>{servicesPageContent.tension.eyebrow}</Badge>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            {servicesPageContent.tension.title}
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            {servicesPageContent.tension.body}
          </p>
        </Reveal>
      </section>

      <div className="section-shell mt-12">
        <div className="glow-divider" />
      </div>

      <section className="section-shell mt-12 space-y-6">
        <Reveal preset="fade">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            {servicesPageContent.authority.title}
          </h2>
          <p className="max-w-2xl text-lg text-white/70">
            {servicesPageContent.authority.body}
          </p>
        </Reveal>
      </section>

      <section className="section-shell mt-12">
        <ServicesShowcase />
      </section>

      <div className="section-shell mt-12">
        <div className="glow-divider" />
      </div>

      <section className="section-shell mt-12 space-y-6">
        <Reveal preset="fade">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            {servicesPageContent.resolution.title}
          </h2>
          <p className="max-w-2xl text-lg text-white/70">
            {servicesPageContent.resolution.body}
          </p>
        </Reveal>
        <Reveal preset="fade" delay={0.08}>
          <p className="max-w-2xl text-sm text-white/60">
            {servicesPageContent.resolution.support}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
