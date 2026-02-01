import Link from "next/link";

import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { blogHighlights } from "@/data/content";

export default function ResourcesPage() {
  return (
    <div>
      <PageHero
        title="Blog"
        subtitle="Latest Blog Post"
      />

      <section className="section">
        <div className="container-wide">
          <div className="grid-3">
            {blogHighlights.map((post, index) => (
              <FadeIn key={post.title} delay={index * 0.05}>
                <article className="card">
                  <p className="text-caption">{post.date}</p>
                  <h3 className="mt-3 text-ink">{post.title}</h3>
                  {post.excerpt ? <p className="mt-3 text-steel">{post.excerpt}</p> : null}
                  <Link href="/contact" className="mt-4 inline-flex text-sm text-brand">
                    Read More
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
