"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Lead, Muted } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { Cloud, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CloudSecurityPage() {
  return (
    <PageLayout>
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Cloud className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Core Service</span>
            </div>
            <H1 className="mb-6 text-white">Cloud Security</H1>
            <Lead className="text-gray-300">
              Scalable cloud infrastructure protection reducing risks and operational costs
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <P className="mb-12 text-center text-lg leading-relaxed text-muted-foreground">
            Cloud misconfigurations remain among the most common causes of data breaches. Our cloud security 
            assessments examine IAM policies, storage permissions, network configurations, and service integrations 
            to identify exposures before they lead to incidents. We help organizations leverage cloud scalability 
            without accepting unnecessary risk.
          </P>

          <StaggerChildren className="grid gap-6 md:grid-cols-2">
            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <H3 className="mb-3">Multi-Cloud Security</H3>
                  <Muted>
                    Unified security posture across AWS, Azure, GCP with centralized visibility, policy enforcement, and threat detection
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <H3 className="mb-3">Container & Kubernetes Security</H3>
                  <Muted>
                    Image scanning, runtime protection, network policies, and secrets management for containerized workloads
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <H3 className="mb-3">Serverless Security</H3>
                  <Muted>
                    Function-level security, event source validation, IAM least privilege, and dependency vulnerability management
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <H3 className="mb-3">Cloud Compliance</H3>
                  <Muted>
                    CIS Benchmarks, NIST framework alignment, continuous compliance monitoring, and audit-ready documentation
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>
          </StaggerChildren>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <div className="text-center">
            <H2 className="mb-6 text-white">Secure Your Cloud Infrastructure</H2>
            <P className="mb-8 text-xl text-gray-300">
              Get expert cloud security assessment and continuous protection
            </P>
            <Link href="/contact">
              <Button size="lg">
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
