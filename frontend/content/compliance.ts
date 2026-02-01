export const complianceOverview = {
  summary:
    "Be4Breach presents compliance as a governance requirement, aligning technical controls with regulatory obligations and audit evidence.",
  emphasis:
    "Focuses on audit readiness, transparent reporting, and measurable security practices for regulated organizations.",
};

export const compliancePrograms = [
  {
    name: "CERT-In annual cybersecurity audit (MSMEs in India)",
    summary:
      "CERT-In requires MSMEs operating digital systems to complete an annual cybersecurity audit performed by a CERT-In empanelled auditor.",
    requirements: [
      "Baseline cybersecurity controls across assets, access, patching, endpoint protection, logging, and backups.",
      "Formal audit of IT and cybersecurity environment with documented gaps and corrective actions.",
      "Incident reporting to CERT-In within prescribed timelines.",
    ],
    typicalScope: [
      "Asset inventory review, network and firewall analysis, and vulnerability testing.",
      "Endpoint security checks, access rights review, and backup and recovery evaluation.",
      "Policy documentation, security awareness, and incident response readiness.",
    ],
    complianceImpact: [
      "Non-compliance can lead to penalties, legal liability, reputational damage, and tender disqualification.",
    ],
    businessBenefits: [
      "Reduced breach risk, improved resilience, and stronger stakeholder confidence.",
      "Better preparedness for enterprise, PSU, and government requirements.",
    ],
    preparationGuidance: [
      "Perform readiness assessments, document assets, address gaps, and engage auditors early.",
    ],
  },
  {
    name: "ISO 27001 Audit",
    summary:
      "ISO 27001 sets the standard for an information security management system (ISMS) and ongoing risk management.",
    benefits: [
      "Improved protection of sensitive information.",
      "Greater confidence from customers, partners, and regulators.",
      "Demonstrated commitment to security and compliance.",
    ],
    approach: [
      "Preparation and planning to identify ISMS gaps.",
      "Documentation review of policies, procedures, and records.",
      "On-site assessment of security management processes and controls.",
      "Reporting with findings and recommendations plus follow-up support.",
    ],
  },
  {
    name: "PCI DSS",
    summary:
      "PCI DSS is the industry standard for securing environments that store, process, or transmit payment card data.",
    benefits: [
      "Reduced risk of data breaches and fraud.",
      "Stronger protection of cardholder information.",
      "Compliance with industry requirements and avoidance of penalties.",
    ],
    approach: [
      "Assess existing security controls and identify vulnerabilities.",
      "Remediate gaps and implement required safeguards.",
    ],
  },
  {
    name: "SOC 2 Type 2 Audit",
    summary:
      "SOC 2 Type 2 audits evaluate controls using the AICPA Trust Services Criteria.",
    coverage: [
      "Security, availability, processing integrity, confidentiality, and privacy.",
    ],
    benefits: [
      "Assurance for customers, partners, and regulators.",
      "Visibility into risks across systems and processes.",
      "Improved trust and compliance readiness.",
    ],
    approach: [
      "Review policies, procedures, and evidence.",
      "Test controls and monitor operational effectiveness.",
      "Deliver a detailed report with improvement recommendations.",
    ],
  },
];
