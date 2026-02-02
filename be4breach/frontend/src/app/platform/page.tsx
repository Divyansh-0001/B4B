import {
  Activity,
  CloudCog,
  Fingerprint,
  Radar,
  ShieldAlert,
  Workflow,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const modules = [
  {
    title: "Vulnerability assessment & penetration testing (VAPT)",
    description:
      "Identify exploitable weaknesses across infrastructure, applications, and cloud environments with clear remediation paths.",
    icon: Fingerprint,
  },
  {
    title: "Red teaming & adversary simulation",
    description:
      "Simulate real-world attacker behavior to validate detection controls and executive response readiness.",
    icon: Radar,
  },
  {
    title: "Blue teaming & SOC support",
    description:
      "Strengthen monitoring, alert triage, and incident workflows with guided operational improvements.",
    icon: Workflow,
  },
  {
    title: "Incident response & digital forensics",
    description:
      "Rapid containment, evidence preservation, and root-cause analysis for high-impact events.",
    icon: Activity,
  },
  {
    title: "Governance, risk & compliance (GRC)",
    description:
      "Translate technical findings into governance-aligned risk management and audit-ready reporting.",
    icon: ShieldAlert,
  },
  {
    title: "CERT-In compliance, audits & advisory",
    description:
      "CERT-In empanelled assessments, readiness reviews, and regulatory alignment support.",
    icon: ShieldAlert,
  },
  {
    title: "Cloud & application security",
    description:
      "Threat modeling, secure configuration reviews, and SDLC security assurance for modern stacks.",
    icon: CloudCog,
  },
  {
    title: "Enterprise & government security programs",
    description:
      "Security programs tailored to large enterprises and government agencies with strict compliance needs.",
    icon: Activity,
  },
];

const architecture = [
  {
    title: "Assess",
    detail:
      "Comprehensive testing to identify exploitable vulnerabilities and control gaps.",
  },
  {
    title: "Simulate",
    detail:
      "Adversary-driven exercises that validate real-world detection and response.",
  },
  {
    title: "Strengthen",
    detail:
      "Compliance-led remediation guidance, governance alignment, and operational hardening.",
  },
];

export default function PlatformPage() {
  return (
    <div className="bg-background">
      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-6 px-6 py-16">
        <Badge className="w-fit bg-primary/10 text-primary">Services</Badge>
        <h1>
          Enterprise cybersecurity services built for regulated environments.
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Be4Breach delivers security assessments, advisory, and response
          services tailored to enterprise and government requirements. Each
          engagement is designed to reduce risk and improve defensible security
          posture.
        </p>
      </AnimatedSection>

      <Separator className="mx-auto w-full max-w-6xl" />

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16">
        <div className="space-y-3">
          <Badge className="w-fit bg-primary/10 text-primary">
            Service portfolio
          </Badge>
          <h2>Clear scope, measurable impact, defensible outcomes.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Card
              key={module.title}
              className="border-border/60 bg-card/80 hover-lift"
            >
              <CardHeader>
                <module.icon className="h-6 w-6 text-primary" />
                <CardTitle className="pt-4 text-lg">{module.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {module.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-8 px-6 pb-20">
        <div className="space-y-3">
          <Badge className="w-fit bg-primary/10 text-primary">
            Engagement model
          </Badge>
          <h2>Structured delivery for enterprise stakeholders.</h2>
          <p>
            We align assessment execution with executive reporting and
            compliance milestones to ensure security outcomes are actionable.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {architecture.map((layer) => (
            <Card
              key={layer.title}
              className="border-border/60 bg-card/80 hover-lift"
            >
              <CardHeader>
                <CardTitle className="text-lg">{layer.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {layer.detail}
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
