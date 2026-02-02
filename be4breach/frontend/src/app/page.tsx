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
    title: "Identity defense",
    description:
      "Detect anomalous login paths, privilege escalations, and MFA fatigue in real time.",
    icon: ShieldCheck,
  },
  {
    title: "Cloud exposure management",
    description:
      "Continuously score misconfigurations, risky IAM grants, and asset drift.",
    icon: Cloud,
  },
  {
    title: "Incident orchestration",
    description:
      "Automate triage, isolate impacted assets, and track containment SLAs.",
    icon: AlarmClock,
  },
];

const workflows = [
  {
    title: "Unified telemetry",
    description:
      "Stream endpoint, identity, and SaaS activity into a single signal fabric.",
    icon: Globe,
  },
  {
    title: "Playbook automation",
    description:
      "Trigger response automation based on risk, impact, and owner context.",
    icon: Sparkles,
  },
  {
    title: "Analyst-ready context",
    description:
      "Deliver timelines, evidence packs, and audit trails with every alert.",
    icon: Users,
  },
];

const outcomes = [
  {
    title: "Readiness score",
    value: "92%",
    detail: "Response coverage across critical controls.",
  },
  {
    title: "Median triage time",
    value: "8 min",
    detail: "Automated routing to the right owner.",
  },
  {
    title: "Audit evidence",
    value: "7 days",
    detail: "Generated reports for regulated programs.",
  },
];

const assurances = [
  "Zero trust segmentation across critical workflows",
  "Audit evidence generation for SOC 2, ISO 27001, and HIPAA",
  "Customer-managed keys and deterministic log retention",
];

export default function Home() {
  return (
    <div className="bg-background">
      <Hero />

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-8 px-6 py-14">
        <div className="flex flex-col gap-4">
          <Badge className="w-fit bg-primary/10 text-primary">
            Platform coverage
          </Badge>
          <h2>See what matters. Act on what is urgent.</h2>
          <p className="max-w-2xl">
            Be4Breach consolidates critical security signals into focused
            decision paths so your team can prioritize high-impact response and
            meet executive expectations.
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
            Operational workflow
          </Badge>
          <h2>Orchestrate response with confidence.</h2>
          <p>
            Teams use Be4Breach to standardize response across identity,
            endpoints, and cloud environments, reducing breach impact while
            delivering consistent evidence to auditors.
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
            Assurance highlights
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
            Telemetry ecosystem
          </Badge>
          <h2>Connect every source without losing context.</h2>
          <p className="max-w-2xl">
            Be4Breach harmonizes signals across identity providers, EDR, cloud
            infrastructure, and SaaS applications to keep analysts focused on
            what matters most.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-border/60 bg-card/80 p-6 hover-lift">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <DatabaseZap className="h-4 w-4 text-primary" />
              Unified detection fabric
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Normalize telemetry in real time with adaptive parsers, enrichment
              services, and risk scoring models tuned to your environment.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Okta & Entra ID",
                "CrowdStrike & SentinelOne",
                "AWS, Azure, GCP",
                "ServiceNow & Jira",
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
              Response governance
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Built-in approvals, evidence capture, and customer trust artifacts
              ensure each response is audit ready.
            </p>
            <Button asChild variant="outline" className="mt-6 w-full">
              <Link href="/platform">View integration map</Link>
            </Button>
          </Card>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-8 px-6 py-14">
        <div className="flex flex-col gap-4">
          <Badge className="w-fit bg-primary/10 text-primary">
            Executive outcomes
          </Badge>
          <h2>Deliver measurable security outcomes.</h2>
          <p className="max-w-2xl">
            Track readiness, response, and compliance in one executive view with
            metrics that map directly to business risk.
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
                Ready for pilot
              </Badge>
              <h3 className="text-3xl font-semibold text-foreground">
                Launch a rapid readiness assessment in under two weeks.
              </h3>
              <p className="text-muted-foreground">
                Engage Be4Breach to map your critical assets, align detection
                coverage, and deliver a prioritized response roadmap.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild size="lg">
                <Link href="/auth/register">Book a readiness call</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/platform">View platform capabilities</Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
