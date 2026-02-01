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
      <section className="border-b border-frost bg-mist">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.2fr_0.8fr]">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {heroContent.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-5xl">
              {heroContent.title}
            </h1>
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

          <FadeIn className="rounded-3xl border border-frost bg-white p-6">
            <h3 className="text-lg font-semibold text-ink">Enterprise readiness, simplified</h3>
            <p className="mt-3 text-sm text-steel">{assessmentNote}</p>
            <div className="mt-6 grid gap-4 text-sm text-ink">
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

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <FadeIn className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-ink">Our Services</h2>
            <p className="mt-2 text-steel">
              As a trusted advisor, Be4Breach helps quantify and reduce cyber risk across your
              business.
            </p>
          </div>
          <p className="rounded-full border border-frost bg-mist px-4 py-2 text-sm font-medium text-steel">
            {pricingNote}
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {primaryServices.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.05}>
              <div className="rounded-3xl border border-frost bg-white p-6">
                <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 text-sm text-steel">{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-y border-frost bg-mist py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-semibold text-ink">Solutions</h2>
            <p className="mt-2 text-steel">
              Strategy-led security architecture and orchestration for modern enterprises.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {solutions.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="rounded-3xl border border-frost bg-white p-6">
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm text-steel">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <FadeIn>
          <h2 className="text-2xl font-semibold text-ink">Training</h2>
          <p className="mt-2 text-steel">
            Hands-on programs for security teams, SOC practitioners, and engineering leaders.
          </p>
        </FadeIn>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {trainingTracks.map((track, index) => (
            <FadeIn key={track} delay={index * 0.03}>
              <div className="rounded-2xl border border-frost bg-white px-5 py-4 text-sm font-medium text-ink">
                {track}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-y border-frost bg-mist py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-semibold text-ink">Trusted Client Feedback</h2>
            <p className="mt-2 text-steel">{clientsNote}</p>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.name} delay={index * 0.05}>
                <div className="rounded-3xl border border-frost bg-white p-6">
                  <p className="text-sm text-steel">"{testimonial.quote}"</p>
                  <p className="mt-4 text-sm font-semibold text-ink">{testimonial.name}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <FadeIn>
          <h2 className="text-2xl font-semibold text-ink">Latest Blog Posts</h2>
          <p className="mt-2 text-steel">
            Insights from Be4Breach on cyber resilience, secure infrastructure, and governance.
          </p>
        </FadeIn>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {blogHighlights.map((post, index) => (
            <FadeIn key={post.title} delay={index * 0.05}>
              <div className="rounded-3xl border border-frost bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel">
                  {post.date}
                </p>
                <h3 className="mt-3 text-base font-semibold text-ink">{post.title}</h3>
                <Link href="/resources" className="mt-4 inline-block text-sm text-brand">
                  Read more ->
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-t border-frost bg-mist py-16">
        <div className="mx-auto w-full max-w-5xl px-6">
          <FadeIn className="rounded-3xl border border-frost bg-white px-8 py-10 text-center md:px-12">
            <h2 className="text-3xl font-semibold text-ink">{ctaBanner.title}</h2>
            <p className="mt-4 text-base text-steel">{ctaBanner.description}</p>
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
