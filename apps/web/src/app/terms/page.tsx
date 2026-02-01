import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { termsContent } from "@/data/content";

export default function TermsPage() {
  return (
    <div>
      <PageHero
        title="Terms & Refund"
        subtitle="Terms and Conditions"
      />

      <section className="section">
        <div className="container-wide space-y-8">
          {termsContent.map((section) => (
            <FadeIn key={section.title} className="card">
              <h3 className="text-ink">{section.title}</h3>
              <ul className="mt-4 list-inside list-disc space-y-2 text-steel">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
