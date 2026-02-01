import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { trainingTracks } from "@/data/content";

export default function TrainingPage() {
  return (
    <div>
      <PageHero
        title="Security Training"
        subtitle="Practical, scenario-based programs that elevate your security teams and leadership."
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {trainingTracks.map((track, index) => (
            <FadeIn key={track} delay={index * 0.03}>
              <div className="rounded-2xl border border-frost bg-white px-5 py-4 text-sm font-medium text-ink">
                {track}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
