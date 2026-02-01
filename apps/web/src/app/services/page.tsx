import { PageHero } from "@/components/page-hero";
import { FadeIn } from "@/components/motion";
import { assessmentNote, serviceHighlights, servicePrograms } from "@/data/content";

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        title="Security Services"
        subtitle="As a trusted advisor, Be4Breach Security Services can help you quantify and understand security risks around modern defenses and strategies."
      />

      <section className="section">
        <div className="container-wide space-y-12">
          <FadeIn className="max-w-3xl">
            <h2 className="text-ink">Breach Impact Analysis</h2>
            <p className="mt-3 text-steel">{assessmentNote}</p>
          </FadeIn>

          <FadeIn>
            <h3 className="text-ink">Next-Gen Security Services</h3>
            <div className="mt-6 grid-2">
              {serviceHighlights.map((service, index) => (
                <FadeIn key={service.title} delay={index * 0.04}>
                  <div className="card">
                    <h3 className="text-ink">{service.title}</h3>
                    <p className="mt-3 text-steel">{service.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <h3 className="text-ink">Complete Website Security</h3>
            <div className="mt-6 grid-2">
              {servicePrograms.map((service, index) => (
                <FadeIn key={service.title} delay={index * 0.02}>
                  <div className="card">
                    <h4 className="text-ink">{service.title}</h4>
                    <p className="mt-3 text-steel">{service.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
