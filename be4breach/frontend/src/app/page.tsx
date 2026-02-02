import Link from "next/link";
import {
  AlarmClock,
  CheckCircle2,
  Cloud,
  DatabaseZap,
  Globe,
  Lock,
  Radar,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { Hero } from "@/components/hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const capabilities = [
  {
    title: "Vulnerability assessment & penetration testing",
    description:
      "Validate security controls across networks, applications, and cloud estates with actionable remediation guidance.",
    icon: ShieldCheck,
  },
  {
    title: "Red teaming & adversary simulation",
    description:
      "Model real-world attacker paths to pressure-test detection, escalation, and response workflows.",
    icon: Cloud,
  },
  {
    title: "Incident response & digital forensics",
    description:
      "Rapid containment, evidence collection, and root-cause analysis for regulated environments.",
    icon: AlarmClock,
  },
];

const workflows = [
  {
    title: "Blue teaming & SOC support",
    description:
      "Improve alert triage, response playbooks, and continuous monitoring maturity.",
    icon: Globe,
  },
  {
    title: "Governance, risk & compliance",
    description:
      "Translate security findings into governance-aligned control improvements and audit-ready reporting.",
    icon: Sparkles,
  },
  {
    title: "Cloud & application security",
    description:
      "Secure modern cloud stacks and critical applications with threat modeling and secure configuration reviews.",
    icon: Users,
  },
];

const outcomes = [
  {
    title: "Assessment impact",
    value: "Actionable",
    detail: "Prioritized findings with clear remediation ownership.",
  },
  {
    title: "Executive reporting",
    value: "Board-ready",
    detail: "Risk narratives aligned to business impact and compliance.",
  },
  {
    title: "Response readiness",
    value: "24/7",
    detail: "Incident response coverage aligned to enterprise SLAs.",
  },
];

const assurances = [
  "CERT-In empanelled for enterprise security engagements",
  "Compliance advisory aligned to regulated industries",
  "Audit-ready documentation and defensible evidence trails",
];

export default function Home() {
  return (
    <div className="dark bg-background text-foreground">
      <Hero />

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-8 px-6 py-14">
        <div className="flex flex-col gap-4">
          <Badge className="w-fit bg-primary/10 text-primary">
            Core services
          </Badge>
          <h2>Independent security assurance for regulated enterprises.</h2>
          <p className="max-w-2xl">
            Be4Breach delivers rigorous testing and response capabilities to
            help security leaders validate defenses, reduce exposure, and meet
            regulatory expectations without disruption.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map((capability) => (
            <Card
              key={capability.title}
              className="border-border/60 bg-card/80 hover-lift"
            >
              <CardHeader>
                <capability.icon className="h-6 w-6 text-primary" />
                <CardTitle className="pt-4 text-lg">
                  {capability.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {capability.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      <Separator className="mx-auto w-full max-w-6xl" />

      <AnimatedSection className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Badge className="w-fit bg-primary/10 text-primary">
            Assurance & resilience
          </Badge>
          <h2>Strengthen detection, response, and governance.</h2>
          <p>
            Be4Breach partners with security teams to improve operational
            maturity, reduce incident impact, and build a defensible compliance
            posture across critical environments.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {workflows.map((workflow) => (
              <div
                key={workflow.title}
                className="rounded-2xl border border-border/60 bg-card/80 p-5 hover-lift"
              >
                <workflow.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {workflow.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {workflow.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-border/60 bg-card/80 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Lock className="h-4 w-4 text-primary" />
            Trust & compliance
          </div>
          <ul className="space-y-4 text-sm text-muted-foreground">
            {assurances.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="w-full">
            <Link href="/trust-center">Review trust center</Link>
          </Button>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-8 px-6 py-14">
        <div className="flex flex-col gap-4">
          <Badge className="w-fit bg-primary/10 text-primary">
            Industries served
          </Badge>
          <h2>Expertise across regulated and critical sectors.</h2>
          <p className="max-w-2xl">
            We operate where security outcomes must be defensible: enterprise
            environments with strict regulatory, operational, and customer
            trust expectations.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-border/60 bg-card/80 p-6 hover-lift">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <DatabaseZap className="h-4 w-4 text-primary" />
              Regulated industry coverage
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Engagements tailored for enterprise risk, regulatory alignment,
              and mission-critical services.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Enterprise & Fortune teams",
                "BFSI & regulated finance",
                "Government & public sector",
                "SaaS & technology providers",
                "Critical infrastructure operators",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-xs text-muted-foreground"
                >
                  <Radar className="h-3 w-3 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-border/60 bg-card/80 p-6 hover-lift">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Critical infrastructure focus
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Security programs built for high-availability services, sensitive
              data, and operational resilience.
            </p>
            <Button asChild variant="outline" className="mt-6 w-full">
              <Link href="/platform">Explore service coverage</Link>
            </Button>
          </Card>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-8 px-6 py-14">
        <div className="flex flex-col gap-4">
          <Badge className="w-fit bg-primary/10 text-primary">
            Executive outcomes
          </Badge>
          <h2>Security posture that stands up to scrutiny.</h2>
          <p className="max-w-2xl">
            Our engagements deliver clear, defensible outputs that help security
            leaders communicate risk, compliance, and investment priorities.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {outcomes.map((outcome) => (
            <Card
              key={outcome.title}
              className="border-border/60 bg-card/80 p-6 hover-lift"
            >
              <CardHeader className="p-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {outcome.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-3xl font-semibold text-foreground">
                  {outcome.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {outcome.detail}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background p-8 md:p-12">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="space-y-4">
          <Badge className="w-fit bg-primary/10 text-primary">
            Engage Be4Breach
          </Badge>
              <h3 className="text-3xl font-semibold text-foreground">
            Launch a focused security assessment within weeks.
              </h3>
              <p className="text-muted-foreground">
            Engage Be4Breach to map critical assets, validate defenses, and
            deliver a prioritized remediation roadmap.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild size="lg">
            <Link href="/register">Request a security briefing</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/platform">View service capabilities</Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
