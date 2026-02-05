"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Lead, Muted } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { 
  Shield, 
  Target, 
  Eye, 
  Lock, 
  FileCheck, 
  Users,
  Siren,
  Network,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CybersecurityPage() {
  return (
    <PageLayout>
      {/* Header */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/cybersecurity-vertical.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <Container size="lg" className="relative">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Core Vertical</span>
            </div>
            <H1 className="mb-6 text-white">
              Enterprise Cybersecurity Services
            </H1>
            <Lead className="text-gray-300">
              Proactive defense through offensive security, real-world attack simulation,
              and comprehensive security operations
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      {/* Offensive Security */}
      <Section>
        <Container size="lg">
          <div className="mb-12">
            <H2 className="mb-4">Offensive Security</H2>
            <Muted className="max-w-3xl">
              Identify vulnerabilities before adversaries do through systematic testing and real-world attack simulations
            </Muted>
          </div>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <H3 className="text-xl">Penetration Testing</H3>
                  <Muted className="mt-2 text-sm">
                    Web, mobile, network, cloud, IoT, and wireless infrastructure testing with detailed remediation guidance
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Siren className="h-6 w-6 text-primary" />
                  </div>
                  <H3 className="text-xl">Red Team Operations</H3>
                  <Muted className="mt-2 text-sm">
                    Adversary emulation exercises testing detection, response capabilities, and security posture under real attack scenarios
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Network className="h-6 w-6 text-primary" />
                  </div>
                  <H3 className="text-xl">SCADA/OT Security</H3>
                  <Muted className="mt-2 text-sm">
                    Industrial control system assessments for critical infrastructure with compliance-focused validation
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>
          </StaggerChildren>
        </Container>
      </Section>

      {/* Defensive Security */}
      <Section className="bg-muted/30">
        <Container size="lg">
          <div className="mb-12">
            <H2 className="mb-4">Defensive Security</H2>
            <Muted className="max-w-3xl">
              24/7 monitoring, threat detection, and rapid incident response to protect your organization
            </Muted>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <H3 className="text-xl">Security Operations Center</H3>
                <Muted className="mt-2">
                  Continuous monitoring, SIEM integration, threat hunting, and security event analysis with expert-led operations
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Siren className="h-6 w-6 text-primary" />
                </div>
                <H3 className="text-xl">Incident Response</H3>
                <Muted className="mt-2">
                  Rapid containment, forensic analysis, and recovery services with post-incident hardening recommendations
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>
          </div>
        </Container>
      </Section>

      {/* Compliance & Risk */}
      <Section>
        <Container size="lg">
          <div className="mb-12">
            <H2 className="mb-4">Compliance & Risk Management</H2>
            <Muted className="max-w-3xl">
              CERT-In aligned security posture, regulatory compliance, and governance frameworks
            </Muted>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <AnimatedCard className="border-t-4 border-primary">
              <AnimatedCard.Header>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <H3 className="text-lg">Security Audits</H3>
                <Muted className="mt-2 text-sm">
                  Comprehensive security assessments aligned with industry standards and regulatory requirements
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-t-4 border-primary">
              <AnimatedCard.Header>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <H3 className="text-lg">Risk Assessment</H3>
                <Muted className="mt-2 text-sm">
                  Enterprise risk quantification, threat modeling, and strategic security planning
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-t-4 border-primary">
              <AnimatedCard.Header>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <H3 className="text-lg">Governance Frameworks</H3>
                <Muted className="mt-2 text-sm">
                  ISO 27001, SOC 2, NIST implementation with ongoing compliance management
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>
          </div>
        </Container>
      </Section>

      {/* Security Consulting */}
      <Section className="bg-muted/30">
        <Container size="md">
          <div className="rounded-2xl border-2 border-primary/20 bg-card p-8 md:p-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <H2 className="mb-4">Security Consulting & Advisory</H2>
            <P className="mb-6 leading-relaxed text-muted-foreground">
              Strategic security guidance for enterprise and government organizations. 
              Our consulting services help build robust security architectures, develop incident response capabilities, 
              and establish long-term security roadmaps aligned with business objectives.
            </P>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <Muted>Security architecture design and review</Muted>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <Muted>Incident response planning and tabletop exercises</Muted>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <Muted>Security program development and maturity assessment</Muted>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <div className="text-center">
            <H2 className="mb-6 text-white">
              Ready to Strengthen Your Security Posture?
            </H2>
            <P className="mb-8 text-xl text-gray-300">
              Protect your organization with enterprise-grade cybersecurity services
            </P>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
