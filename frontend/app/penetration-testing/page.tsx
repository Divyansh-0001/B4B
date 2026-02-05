"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Lead, Muted } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { Globe, Shield, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PenetrationTestingPage() {
  return (
    <PageLayout>
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Core Service</span>
            </div>
            <H1 className="mb-6 text-white">Penetration Testing</H1>
            <Lead className="text-gray-300">
              Comprehensive vulnerability assessments across web, cloud, mobile, network, IoT, and wireless infrastructure
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <P className="mb-12 text-center text-lg leading-relaxed text-muted-foreground">
            Penetration testing reveals how an attacker would compromise your systems—before they actually do. 
            Our assessments simulate real-world attack scenarios across your entire technology stack, identifying 
            exploitable vulnerabilities that put your organization at risk. We don&apos;t just run scanners; 
            we think like attackers to find the weaknesses that matter.
          </P>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <H3 className="mb-3">Web Application Testing</H3>
                  <Muted>
                    OWASP Top 10, business logic flaws, authentication bypass, SQL injection, XSS, and API security testing
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <H3 className="mb-3">Cloud Infrastructure</H3>
                  <Muted>
                    AWS, Azure, GCP security configuration review, IAM policies, storage security, and serverless assessments
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <H3 className="mb-3">Mobile Applications</H3>
                  <Muted>
                    iOS and Android security testing following OWASP MASTG standards with static and dynamic analysis
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <H3 className="mb-3">Network Security</H3>
                  <Muted>
                    Internal and external network testing, segmentation validation, firewall rule review, and lateral movement assessment
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <H3 className="mb-3">IoT Devices</H3>
                  <Muted>
                    Embedded device security, firmware analysis, communication protocol testing, and hardware interface assessment
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <H3 className="mb-3">Wireless Networks</H3>
                  <Muted>
                    WiFi security testing, rogue AP detection, encryption analysis, and wireless client security assessment
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>
          </StaggerChildren>
        </Container>
      </Section>

      <Section className="bg-muted/30">
        <Container size="md">
          <H2 className="mb-8 text-center">Testing Methodology</H2>
          <div className="space-y-6">
            {[
              { step: "1", title: "Reconnaissance & Planning", desc: "Scope definition, asset discovery, and threat modeling" },
              { step: "2", title: "Vulnerability Assessment", desc: "Automated and manual testing to identify security weaknesses" },
              { step: "3", title: "Exploitation", desc: "Safe exploitation of findings to demonstrate real-world impact" },
              { step: "4", title: "Post-Exploitation", desc: "Assess lateral movement potential and privilege escalation risks" },
              { step: "5", title: "Reporting & Remediation", desc: "Detailed findings with actionable remediation guidance and executive summary" }
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <P className="font-semibold">{item.title}</P>
                  <Muted className="mt-1 text-sm">{item.desc}</Muted>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <div className="text-center">
            <H2 className="mb-6 text-white">Ready to Test Your Security?</H2>
            <P className="mb-8 text-xl text-gray-300">
              Schedule a comprehensive penetration test to identify vulnerabilities before attackers do
            </P>
            <Link href="/contact">
              <Button size="lg">
                Request Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
