import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import HeroBackdrop from "@/components/sections/hero-backdrop";
import HeroHeadline from "@/components/sections/hero-headline";

const metrics = [
  { label: "Threat Response", value: "<15 min" },
  { label: "Security Coverage", value: "24/7 SOC" },
  { label: "Compliance Ready", value: "CERT-In" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20">
      <HeroBackdrop />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-6 top-16 h-px w-40 bg-gradient-to-r from-transparent via-lumina-cyan/70 to-transparent shadow-glow" />
        <div className="absolute right-10 top-28 h-px w-48 bg-gradient-to-r from-transparent via-lumina-violet/60 to-transparent shadow-glow" />
        <div className="absolute bottom-12 left-1/3 h-px w-56 bg-gradient-to-r from-transparent via-lumina-red/50 to-transparent shadow-glow" />
      </div>
      <div className="section-shell relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <Reveal preset="fade">
            <Badge>Elite Cyber Defense</Badge>
          </Reveal>
          <Reveal preset="fade" delay={0.04}>
            <p className="max-w-xl text-sm text-white/60">
              be4breach is built for leaders who cannot afford uncertainty.
            </p>
          </Reveal>
          <HeroHeadline />
          <Reveal preset="fade" delay={0.1}>
            <p className="max-w-xl text-lg text-white/70">
              be4breach delivers precision VAPT, continuous SOC operations, cloud security, application
              security, incident response, and enterprise risk governance with calm, authoritative control.
            </p>
          </Reveal>
          <Reveal preset="fade" delay={0.18}>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/contact">Engage be4breach</ButtonLink>
              <ButtonLink href="/services" variant="ghost">
                Explore services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <Reveal className="relative" preset="fade">
          <div className="glass-panel rounded-[32px] p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Enterprise Signal</p>
            <div className="mt-6 space-y-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between text-white/80">
                  <span className="text-sm uppercase tracking-[0.2em] text-white/50">{metric.label}</span>
                  <span className="text-lg font-semibold text-white">{metric.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="mt-6 text-sm text-white/60">
              Built for regulated enterprises, critical infrastructure, and high-value digital assets.
            </p>
          </div>
        </Reveal>
      </div>
      <div className="mt-16">
        <div className="glow-divider" />
      </div>
    </section>
  );
}
