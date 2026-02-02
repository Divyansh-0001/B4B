import { ShieldCheck, Lock, FileCheck2, Server } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const commitments = [
  {
    title: "Security program",
    description:
      "Dedicated security operations team with 24/7 monitoring and incident response.",
    icon: ShieldCheck,
  },
  {
    title: "Data protection",
    description:
      "Encryption in transit and at rest with customer-managed key support.",
    icon: Lock,
  },
  {
    title: "Compliance readiness",
    description:
      "Aligned to SOC 2, ISO 27001, and HIPAA with audit evidence retention.",
    icon: FileCheck2,
  },
  {
    title: "Infrastructure resilience",
    description:
      "Multi-region failover, immutable logging, and continuous integrity checks.",
    icon: Server,
  },
];

const disclosures = [
  "Annual third-party penetration testing with remediation tracking.",
  "Continuous vulnerability scanning and SLA-based patch windows.",
  "Data residency controls for regulated industries.",
  "Dedicated customer trust portal with compliance artifacts.",
];

export default function TrustCenterPage() {
  return (
    <div className="bg-background">
      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-6 px-6 py-16">
        <Badge className="w-fit bg-primary/10 text-primary">Trust center</Badge>
        <h1>Security, privacy, and compliance are embedded in every layer.</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Be4Breach maintains rigorous security controls so your team can deploy
          quickly without sacrificing governance. Review our trust commitments
          and evidence library for full transparency.
        </p>
      </AnimatedSection>

      <Separator className="mx-auto w-full max-w-6xl" />

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16">
        <div className="space-y-3">
          <Badge className="w-fit bg-primary/10 text-primary">
            Commitments
          </Badge>
          <h2>Controls aligned to enterprise expectations.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {commitments.map((commitment) => (
            <Card
              key={commitment.title}
              className="border-border/60 bg-card/80 hover-lift"
            >
              <CardHeader>
                <commitment.icon className="h-6 w-6 text-primary" />
                <CardTitle className="pt-4 text-lg">
                  {commitment.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {commitment.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-6 px-6 pb-20">
        <div className="space-y-3">
          <Badge className="w-fit bg-primary/10 text-primary">
            Transparency
          </Badge>
          <h2>Evidence you can take to auditors.</h2>
        </div>
        <Card className="border-border/60 bg-card/80 hover-lift">
          <CardHeader>
            <CardTitle className="text-lg">
              Trust center disclosures
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {disclosures.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
