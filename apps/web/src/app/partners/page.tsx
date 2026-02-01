import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";

export default function PartnersPage() {
  return (
    <div>
      <PageHero
        title="Partners"
        subtitle="Build secure outcomes together with Be4Breach."
      />

      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <FadeIn className="rounded-3xl border border-frost bg-white p-8">
          <p className="text-base text-steel">
            We collaborate with technology partners, auditors, and cloud service providers to
            deliver end-to-end cybersecurity programs. Contact us to explore partnership
            opportunities.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
