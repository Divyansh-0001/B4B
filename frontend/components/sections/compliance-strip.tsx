import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

export default function ComplianceStrip() {
  return (
    <section className="py-16">
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel rounded-[28px] px-8 py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <Badge>Compliance & Trust</Badge>
                <h3 className="text-2xl font-semibold text-white md:text-3xl">
                  CERT-In empanelled. Audit-ready. Always accountable.
                </h3>
                <p className="text-sm text-white/60">
                  be4breach delivers compliance clarity across regulatory frameworks with defensible
                  evidence, continuous posture monitoring, and executive reporting.
                </p>
              </div>
              <div className="text-right text-sm text-white/60">
                <p>ISO 27001 aligned</p>
                <p>PCI-DSS readiness</p>
                <p>GDPR and data protection</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
