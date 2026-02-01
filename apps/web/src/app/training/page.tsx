import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { trainingPrograms } from "@/data/content";

export default function TrainingPage() {
  return (
    <div>
      <PageHero
        title="Security training"
        subtitle="A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradise"
      />

      <section className="section">
        <div className="container-wide space-y-12">
          <FadeIn>
            <h3 className="text-ink">Security Training</h3>
            <div className="mt-6 grid-2">
              {trainingPrograms.map((track, index) => (
                <FadeIn key={track.title} delay={index * 0.03}>
                  <div className="card">
                    <h4 className="text-ink">{track.title}</h4>
                    <p className="mt-3 text-steel">{track.description}</p>
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
