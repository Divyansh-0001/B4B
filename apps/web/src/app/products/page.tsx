import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { products } from "@/data/content";

export default function ProductsPage() {
  return (
    <div>
      <PageHero
        title="Products & Solutions"
        subtitle="Purpose-built security products and programs that improve resilience and readiness."
      />

      <section className="section">
        <div className="container-wide">
          <div className="grid-3">
            {products.map((item, index) => (
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
    </div>
  );
}
