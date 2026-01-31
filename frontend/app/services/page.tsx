import BackgroundScene from "../../components/BackgroundScene";
import GlitchText from "../../components/GlitchText";
import Navigation from "../../components/Navigation";
import SectionHeading from "../../components/SectionHeading";
import ThreatScan from "../../components/ThreatScan";

const serviceMappings = [
  {
    cinematic: "Offensive Reconnaissance",
    real: "VAPT",
    explanation:
      "Vulnerability assessment and penetration testing to identify exploitable weaknesses across applications, networks, and infrastructure.",
    impact:
      "Reduces breach likelihood by closing gaps before adversaries can exploit them."
  },
  {
    cinematic: "Adversary Simulation",
    real: "Red Team",
    explanation:
      "Realistic attacker emulation to test detection, response, and decision-making under pressure.",
    impact:
      "Validates readiness and exposes blind spots in security controls and processes."
  },
  {
    cinematic: "Active Defense",
    real: "Blue Team",
    explanation:
      "Dedicated defensive operations focused on monitoring, detection engineering, and rapid response.",
    impact:
      "Improves dwell time reduction and strengthens defensive posture over time."
  },
  {
    cinematic: "24x7 Threat Command",
    real: "SOC",
    explanation:
      "Security operations center providing continuous monitoring, triage, and coordinated response.",
    impact:
      "Maintains round-the-clock visibility and ensures faster incident containment."
  },
  {
    cinematic: "Infrastructure Shield",
    real: "Cloud Security",
    explanation:
      "Assessment and hardening of cloud configurations, identity controls, and workload protections.",
    impact:
      "Safeguards scalability and availability while reducing misconfiguration risk."
  },
  {
    cinematic: "Breach Containment",
    real: "Incident Response",
    explanation:
      "Structured response to confirmed incidents, including scoping, containment, eradication, and recovery.",
    impact:
      "Limits operational disruption, financial loss, and regulatory exposure."
  },
  {
    cinematic: "Digital Evidence Recovery",
    real: "Forensics",
    explanation:
      "Evidence collection and analysis to reconstruct timelines and support remediation.",
    impact:
      "Enables root-cause clarity, legal defensibility, and stronger prevention."
  },
  {
    cinematic: "Risk Command and Compliance",
    real: "GRC",
    explanation:
      "Governance, risk, and compliance oversight aligning controls with business and regulatory needs.",
    impact:
      "Demonstrates accountability while reducing audit friction and compliance gaps."
  },
  {
    cinematic: "Secure Pipeline Engineering",
    real: "DevSecOps",
    explanation:
      "Integrating security into CI/CD workflows with automated testing and policy enforcement.",
    impact:
      "Accelerates delivery without sacrificing security or introducing avoidable defects."
  }
];

const responseSteps = [
  {
    title: "Detect",
    detail:
      "Multi-layer sensors capture anomalous behavior, malware signatures, and insider signals."
  },
  {
    title: "Contain",
    detail:
      "Automated isolation protects critical assets while retaining operational continuity."
  },
  {
    title: "Recover",
    detail:
      "Systems are restored with verified integrity checks and governance approvals."
  }
];

export default function ServicesPage() {
  return (
    <main className="relative">
      <Navigation />
      <section className="relative overflow-hidden pb-16 pt-28">
        <BackgroundScene />
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-neon/80">
            Defense Capabilities
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            <GlitchText text="Defense Capabilities" className="text-glow" />
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            Modular, intelligence-driven services engineered to secure every
            layer of the digital battlefield.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6">
          <SectionHeading
            eyebrow="Capability Matrix"
            title="Elite defense capabilities with real-world impact."
            description="Each cinematic label maps directly to a real cybersecurity service, with clear operational and business outcomes."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceMappings.map((service) => (
              <div
                key={service.cinematic}
                className="glass-card group relative overflow-hidden p-6 text-sm text-slate-300"
              >
                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                  <div className="h-full w-full panel-sheen" />
                </div>
                <p className="relative text-xs uppercase tracking-[0.3em] text-neon/70">
                  {service.real}
                </p>
                <h3 className="relative mt-3 text-lg font-semibold text-white">
                  {service.cinematic}
                </h3>
                <p className="relative mt-3">{service.explanation}</p>
                <p className="relative mt-4 text-xs uppercase tracking-[0.3em] text-slate-400">
                  Business Impact
                </p>
                <p className="relative mt-2 text-slate-200">{service.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <SectionHeading
            eyebrow="Threat Response"
            title="Precision operations across every phase."
            description="Be4Breach operators follow a strict detect-contain-recover cycle to ensure mission continuity."
          />
          <ThreatScan />
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          {responseSteps.map((step) => (
            <div
              key={step.title}
              className="glass-card relative overflow-hidden p-6 text-sm text-slate-300"
            >
              <div className="absolute inset-0 panel-sheen opacity-10" />
              <h3 className="relative text-base font-semibold text-white">
                {step.title}
              </h3>
              <p className="relative mt-3">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>Be4Breach Defense Capabilities. Mission ready.</p>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-neon/60">
            Protect. Detect. Respond.
          </p>
        </div>
      </footer>
    </main>
  );
}
