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

      <section className="section">
        <div className="container-wide">
          <div className="grid-3">
            {blogHighlights.map((post, index) => (
              <FadeIn key={post.title} delay={index * 0.05}>
                <article className="card">
                  <p className="text-caption">{post.date}</p>
                  <h3 className="mt-3 text-ink">{post.title}</h3>
                  <Link href="/contact" className="mt-4 inline-flex text-sm text-brand">
                    Request the full report ->
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
