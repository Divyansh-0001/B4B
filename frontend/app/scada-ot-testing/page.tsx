"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Lead, Muted } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SCADAOTTestingPage() {
  return (
    <PageLayout>
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Specialized Service</span>
            </div>
            <H1 className="mb-6 text-white">SCADA/OT Penetration Testing</H1>
            <Lead className="text-gray-300">
              Industrial control system security testing for critical infrastructure protection
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <P className="mb-12 text-center text-lg leading-relaxed text-muted-foreground">
            Industrial systems face unique security challenges. Legacy protocols, long equipment lifecycles, and 
            safety-critical operations require specialized testing approaches. We assess SCADA and OT environments 
            with deep understanding of industrial protocols, air-gap requirements, and operational constraints—identifying 
            security weaknesses without disrupting production systems.
          </P>

          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Industrial Control Systems Assessment</H3>
                <Muted>
                  Security testing of PLCs, DCS, HMI systems, and field devices with minimal operational disruption 
                  and comprehensive vulnerability identification.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">SCADA Network Security</H3>
                <Muted>
                  Protocol analysis, network segmentation validation, and authentication mechanism testing 
                  for Modbus, DNP3, OPC, and proprietary protocols.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Compliance & Standards</H3>
                <Muted>
                  Testing aligned with IEC 62443, NIST SP 800-82, and NERC CIP standards 
                  to ensure regulatory compliance and industry best practices.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Safety System Validation</H3>
                <Muted>
                  Verification of safety instrumented systems, emergency shutdown procedures, and failsafe mechanisms 
                  with no risk to operational safety.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <div className="text-center">
            <H2 className="mb-6 text-white">Protect Critical Infrastructure</H2>
            <P className="mb-8 text-xl text-gray-300">
              Secure your industrial control systems with specialized SCADA/OT testing
            </P>
            <Link href="/contact">
              <Button size="lg">
                Schedule Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
