"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Lead, Muted } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Smartphone, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MobileAppTestingPage() {
  return (
    <PageLayout>
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Smartphone className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Core Service</span>
            </div>
            <H1 className="mb-6 text-white">Mobile App Penetration Testing</H1>
            <Lead className="text-gray-300">
              Comprehensive security testing for iOS and Android applications using OWASP MASTG
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <P className="mb-12 text-center text-lg leading-relaxed text-muted-foreground">
            Mobile applications handle sensitive data on devices you don&apos;t control. Our mobile security assessments 
            examine code, data storage, network communications, and authentication mechanisms across iOS and Android platforms. 
            We identify vulnerabilities before attackers reverse-engineer your app or intercept user data, 
            following OWASP MASTG standards adapted to your specific implementation.
          </P>

          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Static Analysis</H3>
                <Muted>
                  Source code review, binary analysis, hardcoded secrets detection, and insecure data storage identification
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Dynamic Testing</H3>
                <Muted>
                  Runtime behavior analysis, network traffic inspection, API security testing, and authentication bypass attempts
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Platform-Specific Security</H3>
                <Muted>
                  iOS jailbreak detection, Android root detection, biometric implementation review, and secure enclave validation
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">API & Backend Integration</H3>
                <Muted>
                  REST/GraphQL API security testing, authentication token analysis, and session management validation
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <div className="text-center">
            <H2 className="mb-6 text-white">Secure Your Mobile Applications</H2>
            <P className="mb-8 text-xl text-gray-300">
              Comprehensive mobile app security testing for iOS and Android
            </P>
            <Link href="/contact">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
