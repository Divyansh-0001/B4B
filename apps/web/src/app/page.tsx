import Link from "next/link";

import { FadeIn } from "@/components/motion";
import {
  ctaBanner,
  heroContent,
  whatWeDo,
  coreServices,
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
            <h2 className="text-ink">What Be4Breach does</h2>
            <p className="mt-3 text-steel">
              We help enterprises understand their exposure, validate defenses, and operationalize
              cybersecurity programs that engineering teams can ship.
            </p>
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
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-ink">Core cybersecurity services</h2>
            <p className="mt-3 text-steel">
              Focused offerings across offensive testing, cloud security, and managed defense.
            </p>
          </FadeIn>
          <div className="mt-8 grid-2">
            {coreServices.map((service, index) => (
              <FadeIn key={service} delay={index * 0.03}>
                <div className="rounded-2xl border border-frost bg-white px-5 py-4 text-sm font-medium text-ink">
                  {service}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted section-divider">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-ink">Compliance & trust</h2>
            <p className="mt-3 text-steel">
              We support audit readiness and governance programs with clear evidence and rigorous
              validation.
            </p>
          </FadeIn>
          <div className="mt-8 grid-3">
            {complianceTrust.map((item, index) => (
              <FadeIn key={item} delay={index * 0.04}>
                <div className="card">
                  <p className="font-semibold text-ink">{item}</p>
                  <p className="mt-3 text-steel">
                    Evidence-driven reviews and structured guidance built for enterprise auditors.
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-ink">Why enterprises choose Be4Breach</h2>
            <p className="mt-3 text-steel">
              Clear communication, consistent delivery, and outcomes that leadership can trust.
            </p>
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
              Schedule a consult
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
