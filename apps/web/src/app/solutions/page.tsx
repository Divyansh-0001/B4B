import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { solutions } from "@/data/content";

export default function SolutionsPage() {
  return (
    <div>
      <PageHero
        title="Solutions"
        subtitle="Design and orchestrate layered defenses that scale with your cloud and enterprise strategy."
      />

      <section className="section">
        <div className="container-wide">
          <div className="grid-3">
            {solutions.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="card">
                  <h3 className="text-ink">{item.title}</h3>
                  <p className="mt-3 text-steel">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
