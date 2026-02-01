"use client";

type PageHeroProps = {
  title: string;
  subtitle: string;
};

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-frost bg-mist">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel">Be4Breach</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink md:text-4xl">{title}</h1>
        <p className="mt-4 text-lg text-steel">{subtitle}</p>
      </div>
    </section>
  );
}
