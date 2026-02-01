import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { siteContact } from "@/data/content";

export default function ContactPage() {
  return (
    <div>
      <PageHero title="Contact" subtitle="Send Us A Message" />

      <section className="section">
        <div className="container-wide grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <FadeIn className="space-y-6">
            <div>
              <h2 className="text-ink">Contact</h2>
              <p className="mt-2 text-steel">Send Us A Message</p>
            </div>
            <div className="card">
              <p className="text-sm font-semibold text-ink">Office Address</p>
              <p className="mt-1 text-sm text-steel">{siteContact.address}</p>
              <p className="mt-4 text-sm font-semibold text-ink">Phone Number</p>
              <p className="mt-1 text-sm text-steel">{siteContact.phone}</p>
              <p className="mt-4 text-sm font-semibold text-ink">Mail Address</p>
              <p className="mt-1 text-sm text-steel">{siteContact.email}</p>
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
