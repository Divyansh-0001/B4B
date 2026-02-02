import { ShieldCheck, Target, Users } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const principles = [
  {
    title: "Operational clarity",
    description:
      "We design for security teams who need immediate visibility and prescriptive response guidance.",
    icon: Target,
  },
  {
    title: "Resilience by design",
    description:
      "Our platform is built on deterministic response flows to reduce variability during incidents.",
    icon: ShieldCheck,
  },
  {
    title: "Customer-aligned security",
    description:
      "Every feature ties back to measurable outcomes and compliance-ready evidence.",
    icon: Users,
  },
];

const leaders = [
  {
    name: "Amina Ortiz",
    role: "Chief Executive Officer",
    focus: "Previously led security operations at global fintechs.",
  },
  {
    name: "Victor Han",
    role: "Chief Technology Officer",
    focus: "Built large-scale threat detection pipelines at cloud providers.",
  },
  {
    name: "Priya Desai",
    role: "VP, Trust & Compliance",
    focus: "Former auditor and privacy officer focused on regulated sectors.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-6 px-6 py-16">
        <Badge className="w-fit bg-primary/10 text-primary">About us</Badge>
        <h1>We help security leaders move from reactive to resilient.</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Be4Breach was formed by security operators who understand the pressure
          of defending modern enterprises. Our mission is to give teams the
          telemetry, context, and automation they need to prevent disruption and
          protect customer trust.
        </p>
      </AnimatedSection>

      <Separator className="mx-auto w-full max-w-6xl" />

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16">
        <div className="space-y-3">
          <Badge className="w-fit bg-primary/10 text-primary">
            Operating principles
          </Badge>
          <h2>Built on security-first values.</h2>
          <p>
            Our teams partner closely with customers to embed resilience in
            daily operations.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {principles.map((principle) => (
            <Card
              key={principle.title}
              className="border-border/60 bg-card/80 hover-lift"
            >
              <CardHeader>
                <principle.icon className="h-6 w-6 text-primary" />
                <CardTitle className="pt-4 text-lg">
                  {principle.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {principle.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-8 px-6 pb-20">
        <div className="space-y-3">
          <Badge className="w-fit bg-primary/10 text-primary">
            Leadership
          </Badge>
          <h2>Leadership grounded in security operations.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {leaders.map((leader) => (
            <Card
              key={leader.name}
              className="border-border/60 bg-card/80 hover-lift"
            >
              <CardHeader>
                <CardTitle className="text-lg">{leader.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{leader.role}</p>
                <p>{leader.focus}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
