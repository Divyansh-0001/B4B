import {
  Activity,
  CloudCog,
  Fingerprint,
  Radar,
  ShieldAlert,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const modules = [
  {
    title: "Identity risk engine",
    description:
      "Continuously score login anomalies, privileged actions, and unusual device posture.",
    icon: Fingerprint,
  },
  {
    title: "Threat detection fabric",
    description:
      "Normalize and enrich telemetry to prioritize high-risk events across sources.",
    icon: Radar,
  },
  {
    title: "Response orchestration",
    description:
      "Automate containment, ticketing, and evidence gathering with guided playbooks.",
    icon: Workflow,
  },
  {
    title: "Cloud posture guardrails",
    description:
      "Track asset drift and policy violations across multi-cloud accounts.",
    icon: CloudCog,
  },
  {
    title: "Executive risk reporting",
    description:
      "Deliver metrics aligned to business impact, regulatory exposure, and SLAs.",
    icon: Activity,
  },
  {
    title: "Continuous assurance",
    description:
      "Maintain compliance evidence and surface gaps before audit windows close.",
    icon: ShieldAlert,
  },
];

const architecture = [
  {
    title: "Ingestion layer",
    detail:
      "Streaming pipeline built for identity, endpoint, and SaaS telemetry.",
  },
  {
    title: "Correlation layer",
    detail:
      "Event stitching, entity resolution, and automated risk prioritization.",
  },
  {
    title: "Response layer",
    detail:
      "Playbooks, ticketing integrations, and approvals with SLA tracking.",
  },
];

export default function PlatformPage() {
  return (
    <div className="bg-background">
      <section className="mx-auto w-full max-w-6xl space-y-6 px-6 py-16">
        <Badge className="w-fit bg-primary/10 text-primary">Platform</Badge>
        <h1 className="text-4xl font-semibold text-foreground">
          A unified security operations platform built for real-world response.
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Be4Breach consolidates detection, response, and compliance into one
          system of action. Teams adopt it to eliminate tool sprawl and deliver
          repeatable outcomes across their security programs.
        </p>
      </section>

      <Separator className="mx-auto w-full max-w-6xl" />

      <section className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16">
        <div className="space-y-3">
          <Badge className="w-fit bg-primary/10 text-primary">
            Platform modules
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground">
            Capabilities aligned to your security lifecycle.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Card key={module.title} className="border-border/60">
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
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-8 px-6 pb-20">
        <div className="space-y-3">
          <Badge className="w-fit bg-primary/10 text-primary">
            Architecture
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground">
            Designed for high-volume security data.
          </h2>
          <p className="text-muted-foreground">
            Modular architecture supports rapid deployment while delivering
            consistent performance across environments.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {architecture.map((layer) => (
            <Card key={layer.title} className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">{layer.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {layer.detail}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
