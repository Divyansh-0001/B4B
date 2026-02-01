import Link from "next/link";

import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { blogHighlights } from "@/data/content";

export default function ResourcesPage() {
  return (
    <div>
      <PageHero
        title="Resources & Insights"
        subtitle="Security guidance, research, and thought leadership from the Be4Breach team."
      />

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {blogHighlights.map((post, index) => (
            <FadeIn key={post.title} delay={index * 0.05}>
              <article className="rounded-3xl border border-frost bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel">
                  {post.date}
                </p>
                <h3 className="mt-3 text-base font-semibold text-ink">{post.title}</h3>
                <Link href="/contact" className="mt-4 inline-flex text-sm text-brand">
                  Request the full report ->
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
