import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { products } from "@/data/content";

export default function ProductsPage() {
  return (
    <div>
      <PageHero
        title="Products"
        subtitle="Productized security capabilities designed for consistent, repeatable results."
      />

      <section className="section">
        <div className="container-wide space-y-12">
          <FadeIn className="max-w-3xl">
            <h2 className="text-ink">Overview</h2>
            <p className="mt-3 text-steel">
              Our products package common security programs into repeatable workflows with clear
              reporting and predictable delivery.
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="text-ink">Available products</h3>
            <div className="mt-6 grid-3">
              {products.map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.05}>
                  <div className="card">
                    <h3 className="text-ink">{item.title}</h3>
                    <p className="mt-3 text-steel">{item.description}</p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-steel">
                      <li>Defined scope and repeatable methodology.</li>
                      <li>Clear findings with remediation guidance.</li>
                      <li>Operational metrics for leadership review.</li>
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
