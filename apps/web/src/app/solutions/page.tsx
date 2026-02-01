import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { solutions } from "@/data/content";

export default function SolutionsPage() {
  return (
    <div>
      <PageHero
        title="Solutions"
        subtitle="Practical security architecture and orchestration for modern cloud and enterprise environments."
      />

      <section className="section">
        <div className="container-wide space-y-12">
          <FadeIn className="max-w-3xl">
            <h2 className="text-ink">Purpose</h2>
            <p className="mt-3 text-steel">
              Our solutions focus on measurable security outcomes: stronger access control, reduced
              attack paths, and clearer operational ownership across teams.
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="text-ink">Capabilities</h3>
            <div className="mt-6 grid-3">
              {solutions.map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.05}>
                  <div className="card">
                    <h3 className="text-ink">{item.title}</h3>
                    <p className="mt-3 text-steel">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="max-w-3xl">
            <h3 className="text-ink">Typical outcomes</h3>
            <ul className="mt-4 list-inside list-disc space-y-2 text-steel">
              <li>Documented security architecture with clear control ownership.</li>
              <li>Layered defense strategy aligned to business risk.</li>
              <li>Operational guidance for ongoing maturity improvements.</li>
            </ul>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
