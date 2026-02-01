import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";

export default function PartnersPage() {
  return (
    <div>
      <PageHero
        title="Partners"
        subtitle="Build secure outcomes together with Be4Breach."
      />

      <section className="section">
        <div className="container-wide">
          <FadeIn className="card-lg">
            <p className="text-steel">
              We collaborate with technology partners, auditors, and cloud service providers to
              deliver end-to-end cybersecurity programs. Contact us to explore partnership
              opportunities.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
