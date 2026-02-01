import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";

export default function TermsPage() {
  return (
    <div>
      <PageHero
        title="Terms & Refund"
        subtitle="Transparent terms to keep engagements clear and secure."
      />

      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <FadeIn className="rounded-3xl border border-frost bg-white p-8">
          <p className="text-base text-steel">
            Be4Breach services are scoped per engagement. Refund and cancellation terms are shared
            in your service agreement. Contact us for clarifications.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
