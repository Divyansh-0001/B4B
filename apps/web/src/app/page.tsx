import Link from "next/link";

import { FadeIn } from "@/components/motion";
import {
  assessmentNote,
  ctaBanner,
  heroContent,
  valuePillars,
  whatWeDo,
  pricingNote,
  serviceHighlights,
  complianceTrust,
  enterpriseReasons,
} from "@/data/content";

export default function HomePage() {
  return (
    <div className="bg-white">
      <section className="section section-muted section-divider-bottom">
        <div className="container-wide">
          <FadeIn>
            <p className="text-caption text-brand">{heroContent.eyebrow}</p>
            <h1 className="mt-4 text-ink">{heroContent.title}</h1>
            <p className="mt-4 text-lg text-steel">{heroContent.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={heroContent.ctaPrimary.href}
                className="rounded-full border border-brand/40 bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
              >
                {heroContent.ctaPrimary.label}
              </Link>
              <Link
                href={heroContent.ctaSecondary.href}
                className="rounded-full border border-frost px-6 py-3 text-sm font-semibold text-ink transition hover:border-brand/40 hover:text-brand"
              >
                {heroContent.ctaSecondary.label}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-ink">Our Services</h2>
            <p className="mt-3 text-steel">{pricingNote}</p>
          </FadeIn>

          <div className="mt-10 grid-3">
            {whatWeDo.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="card">
                  <h3 className="text-ink">{item.title}</h3>
                  <p className="mt-3 text-steel">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-10 grid-3">
            {valuePillars.map((pillar, index) => (
              <FadeIn key={pillar.title} delay={index * 0.05}>
                <div className="card">
                  <h3 className="text-ink">{pillar.title}</h3>
                  <p className="mt-3 text-steel">{pillar.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-ink">Our Services</h2>
            <p className="mt-3 text-steel">{assessmentNote}</p>
          </FadeIn>
          <div className="mt-8 grid-2">
            {serviceHighlights.map((service, index) => (
              <FadeIn key={service.title} delay={index * 0.04}>
                <div className="card">
                  <h3 className="text-ink">{service.title}</h3>
                  <p className="mt-3 text-steel">{service.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted section-divider">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-ink">Audit and Compliance</h2>
            <p className="mt-3 text-steel">
              Our auditing and compliance services help in understanding secure architecture
              required for your organization by following the right guidelines that are created for
              all business needs. They are required to evaluate your security governance, third-party
              risks, data privacy and regulatory needs
            </p>
          </FadeIn>
          <div className="mt-8 grid-3">
            {complianceTrust.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.04}>
                <div className="card">
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-3 text-steel">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-ink">Why Be4Breach?</h2>
            <p className="mt-3 text-steel">Why should you hire Be4Breach?</p>
          </FadeIn>
          <div className="mt-10 grid-3">
            {enterpriseReasons.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="card">
                  <h3 className="text-ink">{item.title}</h3>
                  <p className="mt-3 text-steel">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted section-divider-top">
        <div className="container-wide">
          <FadeIn className="card-lg text-center md:px-12">
            <h2 className="text-ink">{ctaBanner.title}</h2>
            <p className="mt-4 text-steel">{ctaBanner.description}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full border border-brand/40 bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
            >
              Get a quote
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
