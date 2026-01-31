import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export default function EnterprisePanel() {
  return (
    <section className="py-20">
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel grid gap-10 rounded-[32px] px-10 py-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">be4breach Enterprise</p>
              <h3 className="text-3xl font-semibold text-white md:text-4xl">
                Secure portal for executive oversight and operational resilience.
              </h3>
              <p className="text-sm text-white/60">
                Role-based dashboards, real-time incident visibility, and compliance workflows designed for
                regulated enterprises and critical infrastructure operators.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <ButtonLink href="/enterprise/login">Access enterprise portal</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Request private briefing
              </ButtonLink>
              <p className="text-xs text-white/50">
                Multi-factor authentication, audit trails, and signed reports included by default.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
