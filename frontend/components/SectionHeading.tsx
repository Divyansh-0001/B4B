type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.35em] text-neon/70">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-white">{title}</h2>
      <p className="mt-4 text-base text-slate-300">{description}</p>
    </div>
  );
}
