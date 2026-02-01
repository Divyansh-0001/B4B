import { PageHero } from "@/components/page-hero";
import { FadeIn } from "@/components/motion";
import { assessmentNote, primaryServices, serviceLines } from "@/data/content";

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        title="Security Services"
        subtitle="Comprehensive assessments, assurance, and managed defense designed for modern enterprises."
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel">
            Security advisory & technical assurance
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">Core service pillars</h2>
        </FadeIn>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {primaryServices.map((service) => (
            <FadeIn key={service.title}>
              <div className="rounded-3xl border border-frost bg-white p-6">
                <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 text-sm text-steel">{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-y border-frost bg-mist py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-semibold text-ink">Specialized service lines</h2>
            <p className="mt-2 text-steel">{assessmentNote}</p>
          </FadeIn>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {serviceLines.map((line) => (
              <FadeIn key={line}>
                <div className="rounded-2xl border border-frost bg-white px-5 py-4 text-sm text-ink">
                  {line}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
