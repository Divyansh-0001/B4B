"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Lead, Muted } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SecurityEngineeringPage() {
  return (
    <PageLayout>
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Lock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Engineering Service</span>
            </div>
            <H1 className="mb-6 text-white">Security Engineering</H1>
            <Lead className="text-gray-300">
              Design and deploy comprehensive security measures protecting systems from unauthorized access
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <P className="mb-12 text-center text-lg leading-relaxed text-muted-foreground">
            Security engineering embeds protection into systems during design rather than bolting it on afterward. 
            We help organizations architect security controls that scale with business growth, implement zero-trust 
            principles that assume breach, and build infrastructure where security failures require multiple 
            simultaneous control breakdowns—not just one mistake.
          </P>

          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Security Architecture Design</H3>
                <Muted>
                  End-to-end security architecture development, threat modeling, security control selection, 
                  and resilient system design for enterprise environments.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Zero Trust Implementation</H3>
                <Muted>
                  Never trust, always verify. Implement identity-centric security with micro-segmentation, 
                  least privilege access, and continuous authentication.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Secure Development Integration</H3>
                <Muted>
                  DevSecOps pipeline integration, secure coding practices, automated security testing, 
                  and vulnerability management in CI/CD workflows.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Infrastructure Hardening</H3>
                <Muted>
                  Server hardening, network segmentation, firewall optimization, and security baseline configuration 
                  for on-premise and cloud infrastructure.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <div className="text-center">
            <H2 className="mb-6 text-white">Engineer Secure Systems</H2>
            <P className="mb-8 text-xl text-gray-300">
              Build security into your infrastructure from day one
            </P>
            <Link href="/contact">
              <Button size="lg">
                Consult With Experts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
