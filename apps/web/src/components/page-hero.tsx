"use client";

type PageHeroProps = {
  title: string;
  subtitle: string;
};

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="section section-muted section-divider-bottom">
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="text-caption">Be4Breach</p>
          <h1 className="mt-4 text-ink">{title}</h1>
          <p className="mt-4 text-lg text-steel">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
