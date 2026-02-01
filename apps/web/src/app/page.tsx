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
      <section className="relative overflow-hidden bg-mist">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_60%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.2fr_0.8fr]">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {heroContent.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-5xl">
              {heroContent.title}
            </h1>
            <p className="mt-4 text-lg text-steel">{heroContent.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={heroContent.ctaPrimary.href}
                className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-blue-500"
              >
                {heroContent.ctaPrimary.label}
              </Link>
              <Link
                href={heroContent.ctaSecondary.href}
                className="rounded-full border border-brand/30 px-6 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brandSoft"
              >
                {heroContent.ctaSecondary.label}
              </Link>
            </div>
          </FadeIn>

          <FadeIn className="rounded-3xl border border-frost bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-ink">Enterprise readiness, simplified</h3>
            <p className="mt-3 text-sm text-steel">{assessmentNote}</p>
            <div className="mt-6 grid gap-4 text-sm text-ink">
              {valuePillars.map((pillar) => (
                <div key={pillar.title} className="rounded-2xl bg-frost p-4">
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
          <p className="rounded-full border border-brand/30 bg-brandSoft px-4 py-2 text-sm font-medium text-brand">
            {pricingNote}
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {primaryServices.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.05}>
              <div className="rounded-3xl border border-frost bg-white p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 text-sm text-steel">{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-mist py-16">
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

      <section className="bg-mist py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-semibold text-ink">Trusted Client Feedback</h2>
            <p className="mt-2 text-steel">{clientsNote}</p>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.name} delay={index * 0.05}>
                <div className="rounded-3xl border border-frost bg-white p-6 shadow-soft">
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
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
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

      <section className="bg-ink py-16">
        <div className="mx-auto w-full max-w-5xl px-6 text-center text-white">
          <FadeIn>
            <h2 className="text-3xl font-semibold">{ctaBanner.title}</h2>
            <p className="mt-4 text-base text-white/80">{ctaBanner.description}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-brandSoft"
            >
              Schedule a consult
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
