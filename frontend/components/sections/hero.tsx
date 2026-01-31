import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

const metrics = [
  { label: "Threat Response", value: "<15 min" },
  { label: "Security Coverage", value: "24/7 SOC" },
  { label: "Compliance Ready", value: "CERT-In" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20">
      <div className="section-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal className="space-y-6">
          <Badge>Elite Cyber Defense</Badge>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            Cinematic cybersecurity <span className="text-gradient">built to outpace</span> modern
            adversaries.
          </h1>
          <p className="max-w-xl text-lg text-white/70">
            be4breach delivers precision VAPT, continuous SOC operations, cloud security, application
            security, incident response, and enterprise risk governance with calm, authoritative control.
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/contact">Engage be4breach</ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              Explore services
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal className="relative">
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
