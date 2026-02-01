import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { partnerContent } from "@/data/content";

export default function PartnersPage() {
  return (
    <div>
      <PageHero
        title="Partners"
        subtitle="Be4Breach Partner Program"
      />

      <section className="section">
        <div className="container-wide space-y-10">
          <FadeIn className="card-lg space-y-4">
            <h2 className="text-ink">{partnerContent.title}</h2>
            <p className="text-steel">{partnerContent.intro}</p>
            <p className="text-steel">{partnerContent.outro}</p>
          </FadeIn>

          <div className="grid-3">
            {partnerContent.tracks.map((track) => (
              <FadeIn key={track.title} className="card">
                <h3 className="text-ink">{track.title}</h3>
                <p className="mt-3 text-steel">{track.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
