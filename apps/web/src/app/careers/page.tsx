import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";

export default function CareersPage() {
  return (
    <div>
      <PageHero
        title="Careers"
        subtitle="Join our mission to protect information around the world."
      />

      <section className="section">
        <div className="container-wide">
          <FadeIn className="card-lg">
            <p className="text-steel">
              Be4Breach is growing. We're looking for security analysts, engineers, and consultants
              who value calm, premium delivery. Reach out to learn about current openings.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
