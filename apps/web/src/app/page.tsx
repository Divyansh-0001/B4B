import Link from "next/link";

import { FadeIn } from "@/components/motion";
import {
  assessmentNote,
  blogHighlights,
  ctaBanner,
  heroContent,
  primaryServices,
  pricingNote,
  solutions,
  testimonials,
  trainingTracks,
  valuePillars,
  clientsNote,
} from "@/data/content";

export default function HomePage() {
  return (
    <div className="bg-white">
      <section className="section section-muted section-divider-bottom">
        <div className="container-wide grid gap-12 md:grid-cols-[1.15fr_0.85fr]">
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

          <FadeIn className="card">
            <h3 className="text-ink">Enterprise readiness, simplified</h3>
            <p className="mt-3 text-steel">{assessmentNote}</p>
            <div className="mt-6 grid gap-4 text-ink">
              {valuePillars.map((pillar) => (
                <div key={pillar.title} className="rounded-2xl border border-frost bg-white p-4">
                  <p className="font-semibold">{pillar.title}</p>
                  <p className="mt-2 text-steel">{pillar.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <FadeIn className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="text-ink">Our Services</h2>
              <p className="mt-2 text-steel">
                As a trusted advisor, Be4Breach helps quantify and reduce cyber risk across your
                business.
              </p>
            </div>
            <p className="rounded-full border border-frost bg-mist px-4 py-2 text-sm font-medium text-steel">
              {pricingNote}
            </p>
          </FadeIn>

          <div className="mt-10 grid-2">
            {primaryServices.map((service, index) => (
              <FadeIn key={service.title} delay={index * 0.05}>
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
            <h2 className="text-ink">Solutions</h2>
            <p className="mt-2 text-steel">
              Strategy-led security architecture and orchestration for modern enterprises.
            </p>
          </FadeIn>
          <div className="mt-10 grid-3">
            {solutions.map((item, index) => (
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
            <h2 className="text-ink">Training</h2>
            <p className="mt-2 text-steel">
              Hands-on programs for security teams, SOC practitioners, and engineering leaders.
            </p>
          </FadeIn>
          <div className="mt-8 grid-2">
            {trainingTracks.map((track, index) => (
              <FadeIn key={track} delay={index * 0.03}>
                <div className="rounded-2xl border border-frost bg-white px-5 py-4 text-sm font-medium text-ink">
                  {track}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted section-divider">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-ink">Trusted Client Feedback</h2>
            <p className="mt-2 text-steel">{clientsNote}</p>
          </FadeIn>
          <div className="mt-10 grid-3">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.name} delay={index * 0.05}>
                <div className="card">
                  <p className="text-steel">"{testimonial.quote}"</p>
                  <p className="mt-4 text-sm font-semibold text-ink">{testimonial.name}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-ink">Latest Blog Posts</h2>
            <p className="mt-2 text-steel">
              Insights from Be4Breach on cyber resilience, secure infrastructure, and governance.
            </p>
          </FadeIn>
          <div className="mt-8 grid-3">
            {blogHighlights.map((post, index) => (
              <FadeIn key={post.title} delay={index * 0.05}>
                <div className="card">
                  <p className="text-caption">{post.date}</p>
                  <h3 className="mt-3 text-ink">{post.title}</h3>
                  <Link href="/resources" className="mt-4 inline-block text-sm text-brand">
                    Read more ->
                  </Link>
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
