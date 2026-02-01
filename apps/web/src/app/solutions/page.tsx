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

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {solutions.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.05}>
              <div className="rounded-3xl border border-frost bg-white p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-steel">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
