import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { trainingTracks } from "@/data/content";

export default function TrainingPage() {
  return (
    <div>
      <PageHero
        title="Security training"
        subtitle="Scenario-based training for engineers, analysts, and security leadership."
      />

      <section className="section">
        <div className="container-wide space-y-12">
          <FadeIn className="max-w-3xl">
            <h2 className="text-ink">Format</h2>
            <p className="mt-3 text-steel">
              Courses are delivered in short, focused modules with hands-on labs and practical
              assessment. We adapt depth based on participant experience.
            </p>
          </FadeIn>

          <FadeIn className="max-w-3xl">
            <h3 className="text-ink">Outcomes</h3>
            <ul className="mt-4 list-inside list-disc space-y-2 text-steel">
              <li>Improved incident response readiness and tooling familiarity.</li>
              <li>Clear understanding of offensive testing methods and controls.</li>
              <li>Practical exercises mapped to real enterprise environments.</li>
            </ul>
          </FadeIn>

          <FadeIn>
            <h3 className="text-ink">Available tracks</h3>
            <div className="mt-6 grid-2">
              {trainingTracks.map((track, index) => (
                <FadeIn key={track} delay={index * 0.03}>
                  <div className="rounded-2xl border border-frost bg-white px-5 py-4 text-sm font-medium text-ink">
                    {track}
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
