import GlassCard from "@/components/GlassCard";
import MotionSection from "@/components/MotionSection";
import StatCard from "@/components/StatCard";

const metrics = [
  { label: "Active Security Programs", value: "12" },
  { label: "Critical Alerts", value: "3" },
  { label: "Detection Coverage", value: "92%" },
  { label: "Mean Time to Respond", value: "14 min" }
];

const consoleHighlights = [
  "Unified telemetry across cloud, endpoint, and identity layers.",
  "Prioritized remediation queues aligned to business impact.",
  "Executive-level reporting with regulatory evidence trails."
];

const operations = [
  {
    title: "SOC & SIEM operations",
    description:
      "Unified alerting with tuned detections, prioritized queues, and validated use cases.",
    bullets: [
      "High-fidelity correlation rules with reduced false positives.",
      "Documented response workflows and escalation paths."
    ]
  },
  {
    title: "Threat intelligence",
    description:
      "Actor-driven intelligence that informs triage and proactive defense planning.",
    bullets: [
      "Risk scoring tied to sector-specific threat activity.",
      "IOC enrichment integrated into SOC workflows."
    ]
  },
  {
    title: "Incident response",
    description:
      "Containment and recovery support with executive-ready communications.",
    bullets: [
      "Prepared playbooks for ransomware and credential abuse.",
      "Post-incident control validation and lessons learned."
    ]
  },
  {
    title: "Digital forensics",
    description:
      "Evidence collection and analysis across endpoints, cloud, and email systems.",
    bullets: [
      "Chain-of-custody documentation for legal defensibility.",
      "Root-cause analysis with clear remediation actions."
    ]
  }
];

const assurance = [
  {
    title: "VAPT coverage",
    description:
      "Continuous testing for web, mobile, network, and API attack surfaces.",
    bullets: [
      "Exploit validation with prioritized remediation guidance.",
      "Retesting to confirm closure of critical findings."
    ]
  },
  {
    title: "Cloud security",
    description:
      "Governance for AWS, Azure, and GCP aligned to shared responsibility.",
    bullets: [
      "Identity, storage, and network hardening controls.",
      "Continuous compliance checks for regulated workloads."
    ]
  },
  {
    title: "DevSecOps",
    description:
      "Security testing embedded into CI/CD for fast, safe delivery.",
    bullets: [
      "SAST, DAST, and dependency scanning with guardrails.",
      "Policy-as-code for consistent control enforcement."
    ]
  },
  {
    title: "Compliance & risk",
    description:
      "Framework alignment with measurable risk reduction.",
    bullets: [
      "Control mapping to ISO 27001, SOC 2, PCI DSS, HIPAA, GDPR.",
      "Executive reporting with prioritized remediation plans."
    ]
  }
];

export default function DashboardPage() {
  return (
    <section className="space-y-10">
      <MotionSection className="space-y-3">
        <h2 className="text-3xl font-semibold text-white">
          Be4Breach security dashboard
        </h2>
        <p className="text-slate-300">
          Monitor real-time risk signals and recommended actions across the
          enterprise environment.
        </p>
      </MotionSection>

      <MotionSection className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </MotionSection>

      <MotionSection className="glass-panel rounded-3xl p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Operations command summary
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Executive visibility into security posture, response readiness,
              and compliance alignment.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {consoleHighlights.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <GlassCard className="rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-cyan">
                Priority queue
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                7 critical investigations
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Active investigations mapped to MITRE ATT&CK techniques.
              </p>
            </GlassCard>
            <GlassCard className="rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-cyan">
                Response posture
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                98% playbook coverage
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Automated escalation and evidence collection ready.
              </p>
            </GlassCard>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="glass-panel rounded-3xl p-8">
        <h3 className="text-lg font-semibold text-white">Next actions</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-300">
          <li>Review suspicious login anomalies detected in the EU region.</li>
          <li>Validate containment steps for two credential abuse alerts.</li>
          <li>Approve updated incident response playbooks.</li>
        </ul>
      </MotionSection>

      <MotionSection className="space-y-6">
        <h3 className="text-xl font-semibold text-white">
          Security operations focus
        </h3>
        <div className="grid gap-6 lg:grid-cols-2">
          {operations.map((item) => (
            <GlassCard key={item.title} className="rounded-3xl p-6">
              <h4 className="text-base font-semibold text-white">
                {item.title}
              </h4>
              <p className="mt-2 text-sm text-slate-300">
                {item.description}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-400">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="space-y-6">
        <h3 className="text-xl font-semibold text-white">
          Assurance & engineering
        </h3>
        <div className="grid gap-6 lg:grid-cols-2">
          {assurance.map((item) => (
            <GlassCard key={item.title} className="rounded-3xl p-6">
              <h4 className="text-base font-semibold text-white">
                {item.title}
              </h4>
              <p className="mt-2 text-sm text-slate-300">
                {item.description}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-400">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </MotionSection>
    </section>
  );
}
