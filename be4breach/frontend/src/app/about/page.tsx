import { ShieldCheck, Target, Users } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const principles = [
  {
    title: "Security-first execution",
    description:
      "We approach every engagement with a security-first mindset grounded in evidence, precision, and measurable outcomes.",
    icon: Target,
  },
  {
    title: "Compliance-driven delivery",
    description:
      "Our methodology aligns with regulatory frameworks and audit requirements common to regulated industries.",
    icon: ShieldCheck,
  },
  {
    title: "Enterprise partnership",
    description:
      "We operate as an extension of enterprise security teams with clear communication and defensible recommendations.",
    icon: Users,
  },
];

const leaders = [
  {
    name: "Security Advisory Board",
    role: "Enterprise & Government Expertise",
    focus: "Guidance from leaders across BFSI, SaaS, and public sector programs.",
  },
  {
    name: "Incident Response Practice",
    role: "Digital Forensics Leadership",
    focus: "Experienced responders with deep experience in regulated environments.",
  },
  {
    name: "Compliance & Audit Office",
    role: "GRC & CERT-In Alignment",
    focus: "Advisory practice focused on audit readiness and regulatory alignment.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-6 px-6 py-16">
        <Badge className="w-fit bg-primary/10 text-primary">About us</Badge>
        <h1>Enterprise-grade cybersecurity services, built on trust.</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Be4Breach is a cybersecurity consulting and services firm delivering
          VAPT, red teaming, incident response, and compliance advisory for
          regulated enterprises and government entities. We operate with a
          precise, security-first approach built for executive accountability.
        </p>
      </AnimatedSection>

      <Separator className="mx-auto w-full max-w-6xl" />

      <AnimatedSection className="mx-auto w-full max-w-6xl space-y-10 px-6 py-16">
        <div className="space-y-3">
          <Badge className="w-fit bg-primary/10 text-primary">
            Operating principles
          </Badge>
          <h2>Security philosophy grounded in precision.</h2>
          <p>
            Our engagements are designed to be rigorous, defensible, and aligned
            with the expectations of CISOs, CTOs, and regulators.
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
            Enterprise credibility
          </Badge>
          <h2>Experience across regulated environments.</h2>
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
