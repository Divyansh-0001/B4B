import { FadeIn } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { products } from "@/data/content";

export default function ProductsPage() {
  return (
    <div>
      <PageHero
        title="Products"
        subtitle="A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradise"
      />

      <section className="section">
        <div className="container-wide space-y-12">
          <FadeIn>
            <h3 className="text-ink">Security Product</h3>
            <div className="mt-6 grid-3">
              {products.map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.05}>
                  <div className="card">
                    <h3 className="text-ink">{item.title}</h3>
                    {item.description ? (
                      <p className="mt-3 text-steel">{item.description}</p>
                    ) : null}
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
