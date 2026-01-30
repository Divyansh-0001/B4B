import Link from "next/link";
import AnimatedBadge from "@/components/AnimatedBadge";
import StatCard from "@/components/StatCard";

const stats = [
  { label: "Global Telemetry Sources", value: "130+" },
  { label: "Policy Control Coverage", value: "97%" },
  { label: "Mean Risk Score", value: "Low" }
];

const visionMission = [
  {
    title: "Vision",
    description:
      "Enable organizations to operate confidently in a threat landscape that never stands still."
  },
  {
    title: "Mission",
    description:
      "Reduce breach likelihood with measurable security outcomes, combining deep expertise with automation that scales."
  }
];

const offerings = [
  {
    title: "Consulting-led programs",
    description:
      "Strategic security consulting that assesses current risk, designs target-state architectures, and delivers actionable roadmaps."
  },
  {
    title: "Product-driven execution",
    description:
      "A unified platform that operationalizes controls, delivers executive reporting, and embeds security into daily workflows."
  }
];

const industries = [
  "Financial services",
  "Healthcare & life sciences",
  "Retail & e-commerce",
  "Manufacturing & critical infrastructure",
  "Technology & SaaS",
  "Public sector & education"
];

const expertise = [
  "Security architecture and zero-trust programs",
  "Identity, access, and privileged security",
  "Application and API security engineering",
  "Data protection and privacy controls",
  "Cloud governance and workload protection",
  "SOC modernization and incident readiness"
];

const enterprisePillars = [
  {
    title: "Enterprise-ready by design",
    description:
      "Built for complex environments with multi-tenant governance, audit trails, and role-based access control."
  },
  {
    title: "Trust-focused delivery",
    description:
      "Transparent findings, defensible evidence, and clear remediation guidance backed by senior practitioners."
  },
  {
    title: "Measurable outcomes",
    description:
      "Risk scoring tied to business objectives, with reporting aligned to executive and regulatory needs."
  }
];

const domains = [
  {
    title: "Vulnerability Assessment & Penetration Testing (VAPT)",
    summary:
      "Comprehensive testing that validates real-world exploitability across your digital estate.",
    bullets: [
      "Web: OWASP-aligned testing for auth, session, and data exposure gaps.",
      "Mobile: iOS/Android reviews for insecure storage and runtime weaknesses.",
      "Network: internal and external scans with lateral-movement validation.",
      "API: authentication, rate limiting, and data leakage assessments."
    ]
  },
  {
    title: "Red Teaming & Blue Teaming",
    summary:
      "Adversary emulation and defense readiness to test detection, response, and resilience.",
    bullets: [
      "Objective-based campaigns mapped to MITRE ATT&CK.",
      "Purple-team workshops to close detection gaps quickly."
    ]
  },
  {
    title: "SOC & SIEM",
    summary:
      "Operational visibility with tuning, correlation, and actionable alerting.",
    bullets: [
      "Use-case development, log onboarding, and alert fidelity improvements.",
      "Runbooks and escalation paths that reduce mean time to respond."
    ]
  },
  {
    title: "Threat Intelligence",
    summary:
      "Curated intelligence that prioritizes risks specific to your industry and geography.",
    bullets: [
      "Actor profiling, campaign tracking, and vulnerability contextualization.",
      "Integration into SOC workflows for faster triage."
    ]
  },
  {
    title: "Cloud Security (AWS, Azure, GCP)",
    summary:
      "Cloud posture and workload protection aligned to shared responsibility models.",
    bullets: [
      "Identity, storage, and network controls for multi-cloud estates.",
      "Continuous compliance checks and infrastructure hardening."
    ]
  },
  {
    title: "DevSecOps",
    summary:
      "Security automation embedded into CI/CD pipelines without slowing delivery.",
    bullets: [
      "SAST, DAST, and dependency risk gating.",
      "Policy-as-code and secure build pipelines."
    ]
  },
  {
    title: "Incident Response",
    summary:
      "Rapid containment, investigation, and recovery guided by proven playbooks.",
    bullets: [
      "24/7 escalation support with executive-ready communications.",
      "Post-incident remediation and control validation."
    ]
  },
  {
    title: "Digital Forensics",
    summary:
      "Evidence-driven investigations to determine scope, impact, and root cause.",
    bullets: [
      "Endpoint, cloud, and email forensic analysis.",
      "Chain-of-custody documentation for legal defensibility."
    ]
  },
  {
    title: "Compliance & Risk Management",
    summary:
      "Risk assessments and control mapping across major frameworks.",
    bullets: [
      "Alignment to ISO 27001, SOC 2, PCI DSS, HIPAA, and GDPR.",
      "Executive reporting with prioritized remediation plans."
    ]
  },
  {
    title: "Security Consulting",
    summary:
      "Senior advisory services that guide strategy, governance, and architecture.",
    bullets: [
      "Risk assessments, maturity models, and roadmap execution.",
      "Board-level briefings and security program design."
    ]
  },
  {
    title: "Cybersecurity Products & Platforms",
    summary:
      "Integrated tooling that unifies awareness, monitoring, and response.",
    bullets: [
      "Centralized dashboards for posture, risk, and compliance.",
      "Workflow automation for investigations and remediation."
    ]
  }
];

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <AnimatedBadge>Enterprise Ready • Zero-Trust</AnimatedBadge>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Be4Breach delivers enterprise-grade cybersecurity programs with
            measurable outcomes.
          </h1>
          <p className="text-lg text-slate-300">
            We combine senior security expertise, continuous testing, and
            automation to reduce risk across people, processes, and technology.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/login"
              className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Access secure console
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
            >
              View live dashboards
            </Link>
          </div>
        </div>
        <div className="glass-panel rounded-3xl p-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-cyan">
              Security posture snapshot
            </p>
            <div className="grid gap-4">
              {stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="glass-panel rounded-3xl p-8">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-cyan">
              About Be4Breach
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              A cybersecurity partner built for enterprise resilience.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                Be4Breach is a cybersecurity company focused on helping
                enterprises reduce exposure, validate controls, and respond
                confidently to incidents. Our teams bring deep technical
                expertise across offensive security, defensive operations, and
                governance to deliver programs that scale.
              </p>
              <p>
                We operate as an extension of your security organization,
                aligning remediation efforts to business priorities while
                producing clear evidence for auditors, executives, and boards.
              </p>
            </div>
            <div className="space-y-4">
              {stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visionMission.map((item) => (
          <div
            key={item.title}
            className="glass-panel rounded-3xl p-8"
          >
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-3xl p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {offerings.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="glass-panel rounded-3xl p-8">
          <h3 className="text-xl font-semibold text-white">Industries served</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {industries.map((industry) => (
              <li key={industry}>• {industry}</li>
            ))}
          </ul>
        </div>
        <div className="glass-panel rounded-3xl p-8">
          <h3 className="text-xl font-semibold text-white">
            Cybersecurity expertise
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {expertise.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-8">
        <h3 className="text-xl font-semibold text-white">
          Enterprise positioning
        </h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {enterprisePillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
            >
              <h4 className="text-base font-semibold text-white">
                {pillar.title}
              </h4>
              <p className="mt-3 text-sm text-slate-300">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-cyan">
            Cybersecurity domains
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Full-spectrum services and platform capabilities.
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Each service is delivered with clear scope, risk-based prioritization,
            and evidence-backed reporting.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {domains.map((domain) => (
            <div
              key={domain.title}
              className="glass-panel rounded-3xl p-6"
            >
              <h3 className="text-lg font-semibold text-white">
                {domain.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{domain.summary}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-400">
                {domain.bullets.map((bullet) => (
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
