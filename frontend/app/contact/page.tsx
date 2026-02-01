import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import ContactForm from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="relative z-10 py-16">
      <section className="section-shell grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="space-y-6">
          <Badge>Contact</Badge>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            Secure a private cybersecurity briefing.
          </h1>
          <p className="text-lg text-white/70">
            Speak directly with the be4breach response and strategy team. We provide executive-grade
            assessments, incident response readiness, and long-term security transformation.
          </p>
          <div className="glass-panel rounded-[24px] p-6 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Secure Channels</p>
            <p className="mt-3">Email: engage@be4breach.com</p>
            <p>Enterprise Hotline: +91-0000-000-000</p>
            <p className="mt-3 text-white/50">24/7 availability for incident response activations.</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="glass-panel rounded-[28px] p-8">
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
