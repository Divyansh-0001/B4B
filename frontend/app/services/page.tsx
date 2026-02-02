import Link from "next/link";

import RevealSection from "../../components/motion/RevealSection";

const serviceCategories = [
  {
    title: "Offensive testing & validation",
    description:
      "Breach impact analysis and penetration testing to assess real-world exposure and adversarial TTPs.",
    items: [
      "Breach Impact Analysis",
      "Enterprise APT Assessment",
      "Web Application Penetration Testing",
      "Mobile Application Penetration Testing",
      "Web Services & API Penetration Testing",
      "Network Vulnerability Assessment & Penetration Testing",
      "IoT Penetration Testing",
      "SCADA / OT Penetration Testing",
      "Wireless Penetration Testing",
      "VoIP Penetration Testing",
      "Adversary Attack Simulation",
      "Purple Teaming",
      "Data Exfiltration Testing",
      "Social Engineering & Phishing",
      "Phishing Simulation",
      "Active Directory Assessment"
    ]
  },
  {
    title: "Cloud & infrastructure security",
    description:
      "Assessments and engineering services that support secure transformation and scalable cloud operations.",
    items: [
      "Cloud Security Audit",
      "Cloud Security Engineering",
      "Cloud Risk Management",
      "Cloud Migration Consulting",
      "Kubernetes Security",
      "Cloud Security Maturity",
      "Zero-Trust Design Review",
      "Baseline Configuration Audit"
    ]
  },
  {
    title: "Security engineering & architecture",
    description:
      "Structured reviews that align architecture, code, and controls with modern security expectations.",
    items: [
      "Security Architecture Review",
      "Secure Code Review",
      "Threat Modelling",
      "Security Engineering",
      "Defense in Depth",
      "Zero Trust Orchestration",
      "Blockchain Security",
      "Blockchain Smart Contract Audit"
    ]
  },
  {
    title: "Managed defense & response",
    description:
      "Proactive and reactive services for monitoring, incident readiness, and investigation.",
    items: [
      "Managed Detection & Response",
      "On-Prem SOC",
      "Cloud Native SOC",
      "EDR",
      "Incidence Response",
      "APT Incident Handling",
      "Digital Forensics",
      "Cyber Crime Investigations",
      "Malware Analysis",
      "Reverse Engineering",
      "Exploit Writing & Tradecraft Development",
      "Darkweb Monitoring"
    ]
  },
  {
    title: "Training & exercises",
    description:
      "Hands-on programs and simulation formats designed to improve operational readiness.",
    items: [
      "Ethical Hacking 101",
      "Penetration Tester 101",
      "Cloud Security 101",
      "Red Teaming 101",
      "Security Operation Centre (SOC) Practitioner 101",
      "DevSecOps 101",
      "Container Security 101",
      "Table Top Exercises",
      "CTF",
      "Hackathons",
      "Self Assessment Labs",
      "Coding skills",
      "Cyber 2.0"
    ]
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <RevealSection className="ds-section" as="section">
        <div className="layout-container space-y-6">
          <div className="space-y-3">
            <p className="ds-eyebrow">Services</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Security services spanning offensive testing, cloud assurance, and managed
              defense.
            </h1>
          </div>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Be4Breach delivers penetration testing, cloud security assessments, audit and
            compliance guidance, and managed detection &amp; response with a focus on
            measurable outcomes and resilience.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="ds-button" type="button">
              Reserve a free 30-minute consultation
            </button>
            <Link className="ds-link" href="/enterprise">
              Explore enterprise assessments
            </Link>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="ds-section" as="section">
        <div className="layout-container space-y-6">
          <div className="layout-grid">
            {serviceCategories.map((category) => (
              <div className="col-span-12 lg:col-span-6" key={category.title}>
                <div className="ds-card h-full space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                  <ul className="grid gap-2 text-sm text-foreground/80 sm:grid-cols-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
