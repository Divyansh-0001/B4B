import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";

const highlights = [
  {
    title: "Precision Threat Intelligence",
    description:
      "Context-aware telemetry fused with human expertise to identify, prioritize, and neutralize advanced threats.",
  },
  {
    title: "Resilient Security Architecture",
    description:
      "Zero-trust aligned infrastructure hardening, adaptive segmentation, and proactive resilience engineering.",
  },
  {
    title: "Trusted Compliance Assurance",
    description:
      "CERT-In empanelment with audit-ready reporting, governance orchestration, and risk transparency.",
  },
];

export default function Highlights() {
  return (
    <section className="py-20">
      <div className="section-shell grid gap-6 md:grid-cols-3">
        {highlights.map((highlight, index) => (
          <Reveal key={highlight.title} delay={index * 0.1}>
            <Card className="h-full space-y-4">
              <h3 className="text-lg font-semibold text-white">{highlight.title}</h3>
              <p className="text-sm text-white/60">{highlight.description}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
