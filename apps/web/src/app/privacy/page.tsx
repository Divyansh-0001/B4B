import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        title="Privacy Policy"
        subtitle="We respect your privacy and protect your data responsibly."
      />

      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <FadeIn className="rounded-3xl border border-frost bg-white p-8">
          <p className="text-base text-steel">
            Be4Breach collects only the information required to deliver cybersecurity services and
            respond to inquiries. We never sell personal data and follow industry-standard security
            practices.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
