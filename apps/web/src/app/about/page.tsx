import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { aboutSummary } from "@/data/content";

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="About Be4Breach"
        subtitle="A modern cybersecurity company focused on protecting organizations across the world."
      />

      <section className="section">
        <div className="container-wide">
          <FadeIn className="card-lg">
            <p className="text-steel">{aboutSummary}</p>
            <div className="mt-6 grid-3">
            {[
              "Client-first advisory",
              "Outcome-focused security programs",
              "Calm, premium delivery",
            ].map((value) => (
              <div
                key={value}
                className="rounded-2xl border border-frost bg-white px-4 py-3 text-sm font-medium text-ink"
              >
                {value}
              </div>
            ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
