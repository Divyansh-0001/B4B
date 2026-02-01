import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";

export default function CareersPage() {
  return (
    <div>
      <PageHero
        title="Careers"
        subtitle="Join our mission to protect information around the world."
      />

      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <FadeIn className="rounded-3xl border border-frost bg-white p-8 shadow-soft">
          <p className="text-base text-steel">
            Be4Breach is growing. We're looking for security analysts, engineers, and consultants
            who value calm, premium delivery. Reach out to learn about current openings.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
