import Link from "next/link";
import {
  AlarmClock,
  CheckCircle2,
  Cloud,
  Globe,
  Lock,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
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
      "Ingest endpoint, identity, and SaaS activity in a single streaming fabric.",
    icon: Globe,
  },
  {
    title: "Playbook automation",
    description:
      "Trigger response automation based on risk score, impact, and owner.",
    icon: Sparkles,
  },
  {
    title: "Analyst-ready context",
    description:
      "Provide case timelines, evidence packs, and audit trails with every alert.",
    icon: Users,
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

      <section className="mx-auto w-full max-w-6xl space-y-8 px-6 py-14">
        <div className="flex flex-col gap-4">
          <Badge className="w-fit bg-primary/10 text-primary">
            Platform coverage
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground">
            See what matters. Act on what is urgent.
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Be4Breach consolidates critical security signals into focused
            decision paths so your team can prioritize high-impact response and
            meet executive expectations.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map((capability) => (
            <Card key={capability.title} className="border-border/60">
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
      </section>

      <Separator className="mx-auto w-full max-w-6xl" />

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Badge className="w-fit bg-primary/10 text-primary">
            Operational workflow
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground">
            Orchestrate response with confidence.
          </h2>
          <p className="text-muted-foreground">
            Teams use Be4Breach to standardize response across identity,
            endpoints, and cloud environments, reducing breach impact while
            delivering consistent evidence to auditors.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {workflows.map((workflow) => (
              <div
                key={workflow.title}
                className="rounded-2xl border border-border/60 bg-card p-5"
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
        <div className="space-y-4 rounded-2xl border border-border/60 bg-card p-6">
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
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
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
      </section>
    </div>
  );
}
