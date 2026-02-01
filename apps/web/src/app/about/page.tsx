import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { aboutContent, testimonials } from "@/data/content";

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="About Be4Breach"
        subtitle="About Us"
      />

      <section className="section">
        <div className="container-wide space-y-10">
          <FadeIn className="card-lg">
            <h2 className="text-ink">{aboutContent.overviewTitle}</h2>
            <p className="mt-4 text-steel">{aboutContent.overview}</p>
          </FadeIn>

          <div className="grid-2">
            <FadeIn className="card">
              <h3 className="text-ink">{aboutContent.missionTitle}</h3>
              <p className="mt-3 text-steel">{aboutContent.mission}</p>
            </FadeIn>
            <FadeIn className="card">
              <h3 className="text-ink">{aboutContent.visionTitle}</h3>
              <p className="mt-3 text-steel">{aboutContent.vision}</p>
            </FadeIn>
          </div>

          <FadeIn className="card">
            <h3 className="text-ink">{aboutContent.valuesTitle}</h3>
            <ul className="mt-4 list-inside list-disc space-y-2 text-steel">
              {aboutContent.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="card">
            <h3 className="text-ink">{aboutContent.whyTitle}</h3>
            <p className="mt-3 text-steel">{aboutContent.whyIntro}</p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-steel">
              {aboutContent.whyPoints.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section className="section section-muted section-divider">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-ink">Our Trusted Clients Feedback</h2>
          </FadeIn>
          <div className="mt-8 grid-3">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.name} delay={index * 0.04}>
                <div className="card">
                  <p className="text-steel">"{testimonial.quote}"</p>
                  <p className="mt-4 text-sm font-semibold text-ink">{testimonial.name}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
