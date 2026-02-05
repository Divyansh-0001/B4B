"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Lead, Muted } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Target, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BreachImpactAnalysisPage() {
  return (
    <PageLayout>
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Core Service</span>
            </div>
            <H1 className="mb-6 text-white">Breach Impact Analysis</H1>
            <Lead className="text-gray-300">
              Assess your enterprise security posture against real-world adversary tactics
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <P className="mb-12 text-center text-lg leading-relaxed text-muted-foreground">
            Understanding your organization&apos;s exposure requires more than vulnerability lists. Breach impact 
            analysis quantifies what attackers could actually accomplish if they compromised your systems—which data 
            they could exfiltrate, which operations they could disrupt, and what business consequences would follow. 
            This analysis informs security investment decisions with business context.
          </P>

          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Real-World Attack Simulation</H3>
                <Muted>
                  Emulate sophisticated threat actor techniques using MITRE ATT&CK framework to test your organization&apos;s 
                  detection and response capabilities under realistic conditions.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Security Posture Evaluation</H3>
                <Muted>
                  Comprehensive assessment of security controls, monitoring systems, and incident response procedures 
                  to identify gaps in your defensive architecture.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Business Impact Quantification</H3>
                <Muted>
                  Calculate financial exposure, operational disruption, reputational damage, and regulatory consequences 
                  of potential security incidents.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Strategic Remediation Planning</H3>
                <Muted>
                  Prioritized remediation roadmap with resource allocation guidance and timeline recommendations 
                  for closing critical security gaps.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <div className="text-center">
            <H2 className="mb-6 text-white">Understand Your Security Risks</H2>
            <P className="mb-8 text-xl text-gray-300">
              Get a comprehensive breach impact analysis tailored to your organization
            </P>
            <Link href="/contact">
              <Button size="lg">
                Request Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
