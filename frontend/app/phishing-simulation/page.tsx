"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Lead, Muted } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PhishingSimulationPage() {
  return (
    <PageLayout>
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Training Service</span>
            </div>
            <H1 className="mb-6 text-white">Phishing Simulation & Awareness</H1>
            <Lead className="text-gray-300">
              Build human firewalls through AI-driven phishing simulations and security awareness training
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <P className="mb-12 text-center text-lg leading-relaxed text-muted-foreground">
            Transform your employees into your strongest defense layer with realistic phishing campaigns 
            that educate, measure awareness, and build lasting security culture.
          </P>

          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Realistic Campaign Design</H3>
                <Muted>
                  Industry-specific phishing scenarios mimicking current threat actor techniques, 
                  spear-phishing templates, and credential harvesting simulations.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">AI-Powered Scenarios</H3>
                <Muted>
                  Machine learning algorithms generate personalized phishing attacks based on employee roles, 
                  behaviors, and historical response patterns.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Comprehensive Reporting</H3>
                <Muted>
                  Detailed analytics on click rates, credential submission, attachment opening, 
                  and departmental vulnerability trends with actionable insights.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <H3 className="mb-4">Ongoing Training Programs</H3>
                <Muted>
                  Continuous awareness campaigns, micro-learning modules, and targeted training 
                  for users who fall for simulated attacks.
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <div className="text-center">
            <H2 className="mb-6 text-white">Strengthen Your Human Firewall</H2>
            <P className="mb-8 text-xl text-gray-300">
              Launch phishing simulation campaigns to build security awareness
            </P>
            <Link href="/contact">
              <Button size="lg">
                Start Campaign
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
