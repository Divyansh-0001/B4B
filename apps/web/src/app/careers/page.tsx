import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { careerContent } from "@/data/content";

export default function CareersPage() {
  return (
    <div>
      <PageHero
        title="Careers"
        subtitle="Career"
      />

      <section className="section">
        <div className="container-wide">
          <FadeIn className="card-lg space-y-4">
            {careerContent.intro.map((paragraph) => (
              <p key={paragraph} className="text-steel">
                {paragraph}
              </p>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="section section-muted section-divider">
        <div className="container-wide space-y-8">
          <FadeIn className="card">
            <h3 className="text-ink">{careerContent.heading}</h3>
            <div className="mt-4 space-y-3 text-steel">
              {careerContent.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>
          <FadeIn className="card">
            <h4 className="text-ink">{careerContent.role}</h4>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
