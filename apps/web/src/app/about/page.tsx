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

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <FadeIn className="rounded-3xl border border-frost bg-white p-8 shadow-soft">
          <p className="text-base text-steel">{aboutSummary}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "Client-first advisory",
              "Outcome-focused security programs",
              "Calm, premium delivery",
            ].map((value) => (
              <div key={value} className="rounded-2xl bg-frost px-4 py-3 text-sm font-medium text-ink">
                {value}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
