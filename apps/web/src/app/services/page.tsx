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

      <section className="section">
        <div className="container-wide">
          <FadeIn>
            <p className="text-caption">Security advisory & technical assurance</p>
            <h2 className="mt-3 text-ink">Core service pillars</h2>
          </FadeIn>
          <div className="mt-8 grid-2">
            {primaryServices.map((service) => (
              <FadeIn key={service.title}>
                <div className="card">
                  <h3 className="text-ink">{service.title}</h3>
                  <p className="mt-3 text-steel">{service.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted section-divider">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-ink">Specialized service lines</h2>
            <p className="mt-2 text-steel">{assessmentNote}</p>
          </FadeIn>
          <div className="mt-8 grid-2">
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
