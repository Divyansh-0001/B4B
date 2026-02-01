import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";

export default function TermsPage() {
  return (
    <div>
      <PageHero
        title="Terms & Refund"
        subtitle="Transparent terms to keep engagements clear and secure."
      />

      <section className="section">
        <div className="container-wide">
          <FadeIn className="card-lg">
            <p className="text-steel">
              Be4Breach services are scoped per engagement. Refund and cancellation terms are shared
              in your service agreement. Contact us for clarifications.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
