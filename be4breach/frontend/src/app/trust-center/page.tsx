import { ShieldCheck, Lock, FileCheck2, Server } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const commitments = [
  {
    title: "CERT-In empanelled",
    description:
      "Recognized for delivering security assessments aligned with Indian regulatory requirements.",
    icon: ShieldCheck,
  },
  {
    title: "Compliance advisory",
    description:
      "Audit readiness support for regulated industries with defensible reporting and evidence.",
    icon: FileCheck2,
  },
  {
    title: "Risk governance alignment",
    description:
      "Security recommendations mapped to governance objectives and executive accountability.",
    icon: Lock,
  },
  {
    title: "Operational resilience",
    description:
      "Incident response readiness planning and post-incident review support.",
    icon: Server,
  },
];

const disclosures = [
  "CERT-In readiness assessments and advisory for regulated entities.",
  "Compliance gap analysis with prioritized remediation plans.",
  "Audit documentation support aligned to sector-specific requirements.",
  "Executive reporting that links technical findings to risk exposure.",
];

export default function TrustCenterPage() {
  return (
    <div className="bg-background">
      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-6 px-6 py-16">
        <Badge className="w-fit bg-primary/10 text-primary">
          Compliance & CERT-In
        </Badge>
        <h1>Compliance-led cybersecurity advisory for regulated enterprises.</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Be4Breach is CERT-In empanelled and trusted by regulated industries to
          deliver security assessments, audits, and advisory services that
          stand up to regulatory scrutiny.
        </p>
      </AnimatedSection>

      <Separator className="mx-auto w-full max-w-6xl" />

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16">
        <div className="space-y-3">
          <Badge className="w-fit bg-primary/10 text-primary">
            Compliance commitments
          </Badge>
          <h2>Advisory grounded in regulatory alignment.</h2>
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
            Audit readiness
          </Badge>
          <h2>Evidence packages built for audit teams.</h2>
        </div>
        <Card className="border-border/60 bg-card/80 hover-lift">
          <CardHeader>
            <CardTitle className="text-lg">
              Compliance support coverage
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
