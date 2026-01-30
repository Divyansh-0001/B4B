import StatCard from "@/components/StatCard";

const metrics = [
  { label: "Active Security Programs", value: "12" },
  { label: "Critical Alerts", value: "3" },
  { label: "Detection Coverage", value: "92%" },
  { label: "Mean Time to Respond", value: "14 min" }
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
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-white">Security dashboard</h2>
        <p className="mt-2 text-slate-300">
          Monitor real-time risk signals and recommended actions.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </div>
      <div className="glass-panel rounded-3xl p-8">
        <h3 className="text-lg font-semibold text-white">Next actions</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-300">
          <li>Review suspicious login anomalies detected in the EU region.</li>
          <li>Validate containment steps for two credential abuse alerts.</li>
          <li>Approve updated incident response playbooks.</li>
        </ul>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">
          Security operations focus
        </h3>
        <div className="grid gap-6 lg:grid-cols-2">
          {operations.map((item) => (
            <div
              key={item.title}
              className="glass-panel rounded-3xl p-6"
            >
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
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">
          Assurance & engineering
        </h3>
        <div className="grid gap-6 lg:grid-cols-2">
          {assurance.map((item) => (
            <div
              key={item.title}
              className="glass-panel rounded-3xl p-6"
            >
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
