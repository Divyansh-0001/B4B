import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { siteContact } from "@/data/content";

export default function ContactPage() {
  return (
    <div>
      <PageHero
        title="Lets Talk"
        subtitle="Tell us about your security goals. We'll respond with a tailored plan."
      />

      <section className="section">
        <div className="container-wide grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <FadeIn className="space-y-6">
            <div>
              <h2 className="text-ink">Contact details</h2>
              <p className="mt-2 text-steel">
                Reserve a free 30-minute consultation with a Be4Breach advisor.
              </p>
            </div>
            <div className="card">
              <p className="text-sm font-semibold text-ink">Phone</p>
              <p className="mt-1 text-sm text-steel">{siteContact.phone}</p>
              <p className="mt-4 text-sm font-semibold text-ink">Email</p>
              <p className="mt-1 text-sm text-steel">{siteContact.email}</p>
              <p className="mt-4 text-sm font-semibold text-ink">Address</p>
              <p className="mt-1 text-sm text-steel">{siteContact.address}</p>
            </div>
          </FadeIn>

          <FadeIn className="card-lg">
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
