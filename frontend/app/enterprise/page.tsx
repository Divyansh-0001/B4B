import RevealSection from "../../components/motion/RevealSection";

const benefits = [
  "Assess organizational resilience against advanced persistent threat techniques and procedures.",
  "Identify weaknesses in controls not detected by standard vulnerability testing.",
  "Evaluate incident and crisis management response processes.",
  "Gain a safe, controlled opportunity to improve security posture before compromise.",
  "Help defensive teams become more proficient at detecting and responding to incidents.",
  "Provide pragmatic direction for short, medium, and long-term security strategy."
];

const phases = [
  {
    title: "Planning",
    description:
      "Define scope, form the exercise working group, and establish communication protocols."
  },
  {
    title: "Attack preparation",
    description:
      "Build scenarios based on threat groups most active in your industry vertical."
  },
  {
    title: "Attack execution",
    description:
      "Execute the APT scenarios in your environment using realistic TTPs."
  },
  {
    title: "Exercise closure",
    description:
      "Report findings, transfer knowledge, remediate gaps, and align on outcomes."
  }
];

const killChainStages = [
  "Reconnaissance",
  "Resource Development",
  "Initial Access",
  "Execution",
  "Persistence",
  "Privilege Escalation",
  "Defense Evasion",
  "Credential Access",
  "Discovery",
  "Lateral Movement",
  "Collection",
  "Command and Control",
  "Exfiltration",
  "Impact"
];

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <RevealSection className="ds-section" as="section">
        <div className="layout-container space-y-6">
          <div className="space-y-3">
            <p className="ds-eyebrow">Enterprise</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Enterprise APT Assessment for realistic, industry-aligned resilience.
            </h1>
          </div>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Cyber security attacks continue to evolve in scope and sophistication. The
            Be4Breach Enterprise Advanced Persistent Threat (APT) Assessment complements
            layered defenses by testing how effectively teams detect and respond to
            real-world threats.
          </p>
        </div>
      </RevealSection>

      <RevealSection className="ds-section" as="section">
        <div className="layout-container">
          <div className="layout-grid gap-8">
            <div className="col-span-12 lg:col-span-6 space-y-4">
              <p className="ds-eyebrow">Methodology</p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Intelligence-led scenarios that emulate adversarial TTPs.
              </h2>
              <p className="text-base text-muted-foreground">
                The Be4Breach team analyzes intelligence to determine breaches and threat
                groups active in your industry. Scenarios are crafted to emulate the tools,
                tactics, and procedures used by those groups, then executed to evaluate
                detection and response readiness.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-6 grid gap-4 sm:grid-cols-2">
              {phases.map((phase) => (
                <div className="ds-card" key={phase.title}>
                  <h3 className="text-base font-semibold">{phase.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="ds-section" as="section">
        <div className="layout-container">
          <div className="layout-grid gap-8">
            <div className="col-span-12 lg:col-span-5 space-y-4">
              <p className="ds-eyebrow">Benefits</p>
              <h2 className="text-3xl font-semibold tracking-tight">
                A holistic view of resilience against active threat groups.
              </h2>
              <p className="text-base text-muted-foreground">
                Advanced assessments provide a controlled environment to identify gaps and
                strengthen operational readiness without exposing the organization to
                unnecessary risk.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div className="ds-card">
                <ul className="grid gap-3 text-sm text-foreground/80 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="ds-section" as="section">
        <div className="layout-container">
          <div className="ds-card space-y-4">
            <p className="ds-eyebrow">Coverage</p>
            <h3 className="text-2xl font-semibold tracking-tight">
              TTP coverage across the full attack lifecycle
            </h3>
            <div className="grid gap-2 text-sm text-foreground/80 sm:grid-cols-2 lg:grid-cols-4">
              {killChainStages.map((stage) => (
                <div key={stage} className="ds-chip w-fit">
                  {stage}
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
