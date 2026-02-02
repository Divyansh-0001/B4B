import RevealSection from "../../components/motion/RevealSection";

const compliancePrograms = [
  {
    title: "ISO 27001 Audit",
    summary:
      "ISO 27001 is a widely recognized standard for information security management. Audits evaluate the effectiveness of an ISMS and alignment with the standard.",
    benefits: [
      "Improved protection of sensitive information",
      "Increased trust from customers, partners, and regulators",
      "Demonstrated commitment to information security",
      "Enhanced risk management and compliance",
      "Stronger reputation and brand confidence"
    ],
    approach: [
      "Preparation and planning to identify ISMS gaps",
      "Documentation review of policies and procedures",
      "On-site assessment of controls and processes",
      "Reporting with findings and recommendations",
      "Follow-up to ensure continued compliance"
    ]
  },
  {
    title: "PCI DSS",
    summary:
      "The Payment Card Industry Data Security Standard ensures organizations that handle cardholder data maintain a secure environment.",
    benefits: [
      "Improved security for cardholder data",
      "Protection against fraud and data breaches",
      "Alignment with industry requirements",
      "Customer confidence in payment security",
      "Reduced exposure to fines and penalties"
    ],
    approach: [
      "Initial assessment of existing controls",
      "Remediation of identified gaps",
      "Compliance validation via scans and penetration testing",
      "Continuous monitoring for potential threats",
      "Reporting to demonstrate compliance and improvement"
    ]
  },
  {
    title: "SOC 2 Type 2",
    summary:
      "SOC 2 Type 2 audits are based on the AICPA Trust Services Criteria and evaluate controls around security, availability, processing integrity, confidentiality, and privacy.",
    benefits: [
      "Assurance for customers, partners, and regulators",
      "Identification of risks and control gaps",
      "Enhanced trust among stakeholders",
      "Support for compliance with industry standards"
    ],
    approach: [
      "Control assessment aligned to Trust Services Criteria",
      "Review of policies, procedures, and documentation",
      "Testing and monitoring of systems and processes",
      "Detailed reporting with recommendations"
    ]
  },
  {
    title: "Data Privacy Assessments",
    summary:
      "Assessments use industry best practices and regulatory frameworks to identify privacy risks across systems and processes.",
    benefits: [
      "Identification of potential privacy risks",
      "Compliance with relevant regulatory frameworks",
      "Improved privacy and security posture",
      "Increased customer trust",
      "Reduced risk of non-compliance penalties"
    ],
    approach: [
      "Review of data privacy policies and procedures",
      "Analysis of data flow and storage practices",
      "Identification of vulnerabilities and risks",
      "Evaluation of technical controls",
      "Recommendations for remediation"
    ]
  },
  {
    title: "CERT-In Annual Cybersecurity Audits for MSMEs",
    summary:
      "CERT-In has introduced a mandatory annual cybersecurity audit requirement for MSMEs in India that operate digital systems.",
    benefits: [
      "Strengthened national cyber resilience",
      "Reduced cyber risks across supply chains",
      "Uniform baseline security practices",
      "Protection of business and customer data"
    ],
    approach: [
      "Annual audit conducted by a CERT-In empanelled cybersecurity auditing organisation",
      "Baseline controls for assets, secure configuration, access control, and patching",
      "Malware protection, secure storage, and backups",
      "Logging, monitoring, and alerting readiness",
      "Incident response preparedness and documentation"
    ]
  }
];

export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <RevealSection className="ds-section" as="section">
        <div className="layout-container space-y-6">
          <div className="space-y-3">
            <p className="ds-eyebrow">Compliance</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Audit and compliance services grounded in recognized standards.
            </h1>
          </div>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Be4Breach helps organizations evaluate security governance, third-party risk,
            data privacy, and regulatory requirements while aligning with global
            compliance frameworks.
          </p>
        </div>
      </RevealSection>

      <RevealSection className="ds-section" as="section">
        <div className="layout-container grid gap-6">
          {compliancePrograms.map((program) => (
            <div className="ds-card space-y-4" key={program.title}>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{program.title}</h2>
                <p className="text-sm text-muted-foreground">{program.summary}</p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Benefits
                  </h3>
                  <ul className="mt-3 grid gap-2 text-sm text-foreground/80">
                    {program.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Approach
                  </h3>
                  <ul className="mt-3 grid gap-2 text-sm text-foreground/80">
                    {program.approach.map((step) => (
                      <li key={step} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>
    </main>
  );
}
