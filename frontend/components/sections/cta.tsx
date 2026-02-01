import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export default function CTA() {
  return (
    <section className="py-20">
      <div className="section-shell">
        <Reveal>
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-r from-white/5 via-white/10 to-white/5 px-10 py-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Engage</p>
                <h3 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
                  Ready for decisive cyber resilience?
                </h3>
              </div>
              <div className="flex gap-4">
                <ButtonLink href="/contact">Start a security briefing</ButtonLink>
                <ButtonLink href="/services" variant="ghost">
                  View capabilities
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
