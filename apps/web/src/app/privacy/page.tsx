import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        title="Privacy Policy"
        subtitle="We respect your privacy and protect your data responsibly."
      />

      <section className="section">
        <div className="container-wide">
          <FadeIn className="card-lg">
            <p className="text-steel">
              Be4Breach collects only the information required to deliver cybersecurity services and
              respond to inquiries. We never sell personal data and follow industry-standard security
              practices.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
