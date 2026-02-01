import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const values = [
  {
    title: "Calm authority",
    description: "Clarity in crisis and disciplined execution for every stakeholder.",
  },
  {
    title: "Operational rigor",
    description: "Enterprise-grade process, continuous improvement, and accountable outcomes.",
  },
  {
    title: "Trusted partnership",
    description: "Embedded teams aligned to your mission, risk appetite, and regulatory demands.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative z-10 py-16">
      <section className="section-shell space-y-6">
        <Reveal>
          <Badge>About</Badge>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            be4breach is built for leaders who cannot afford uncertainty.
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            We combine cybersecurity architecture, operational reliability, and cinematic clarity to deliver
            elite defense programs that withstand regulatory scrutiny and real-world adversaries.
          </p>
        </Reveal>
      </section>

      <section className="section-shell mt-12 grid gap-6 md:grid-cols-3">
        {values.map((value, index) => (
          <Reveal key={value.title} delay={index * 0.08}>
            <div className="glass-panel h-full rounded-[28px] p-6">
              <h3 className="text-lg font-semibold text-white">{value.title}</h3>
              <p className="mt-3 text-sm text-white/60">{value.description}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
