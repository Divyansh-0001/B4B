"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Lead, Muted } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { Shield, Target, Eye, Award, Globe, Users, Zap, Lock } from "lucide-react";

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Header */}
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">About Be4Breach</span>
            </div>
            <H1 className="mb-6 text-white">
              Young, Ambitious Leader in Cybersecurity
            </H1>
            <Lead className="text-gray-300">
              Headquartered in Pune, India, protecting digital systems worldwide
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      {/* Who We Are */}
      <Section>
        <Container size="md">
          <div className="text-center">
            <H2 className="mb-6">Who We Are</H2>
            <P className="text-lg leading-relaxed">
              Be4Breach was founded on a singular conviction: organizations deserve security partners who understand 
              that breaches are preventable, not inevitable. We combine offensive security expertise with defensive 
              strategy to protect the systems that power modern enterprises.
            </P>
            <P className="mt-6 text-lg leading-relaxed">
              Operating from <span className="font-semibold">Pune, India</span>, our team conducts security 
              assessments for organizations worldwide—from financial institutions to critical infrastructure providers. 
              We test systems the way adversaries attack them, then help build defenses that actually hold.
            </P>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-muted/30">
        <Container size="lg">
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn direction="up">
              <div className="h-full rounded-2xl border-2 border-primary/20 bg-card p-8">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <H2 className="mb-4 text-primary">Our Mission</H2>
                <P className="leading-relaxed">
                  Partner with organizations to establish sustainable security programs that withstand evolving threats. 
                  We deliver testing and advisory services that strengthen security posture without disrupting operations, 
                  building long-term relationships grounded in technical excellence and measurable risk reduction.
                </P>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="h-full rounded-2xl border-2 border-primary/20 bg-card p-8">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <H2 className="mb-4 text-primary">Our Vision</H2>
                <P className="leading-relaxed">
                  Make proactive security testing the foundation of every organization&apos;s defense strategy. 
                  As threats become more sophisticated, we aim to be the security partner that helps organizations 
                  stay ahead—identifying vulnerabilities before they become incidents, and building resilience 
                  into infrastructure from the ground up.
                </P>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Core Values */}
      <Section>
        <Container size="lg">
          <div className="text-center">
            <H2 className="mb-6">Our Core Values</H2>
            <Muted className="mx-auto max-w-2xl">
              The principles that guide our work and define our commitment to excellence in cybersecurity
            </Muted>
          </div>

          <StaggerChildren className="mt-12 grid gap-8 md:grid-cols-2">
            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCard.Title>
                    Protect Critical Data
                  </AnimatedCard.Title>
                  <AnimatedCard.Description className="mt-3 text-base">
                    Security is not a checkbox—it&apos;s a discipline. We treat every assessment as if defending 
                    our own infrastructure, understanding that the data we help protect powers critical business 
                    operations, personal information, and organizational trust.
                  </AnimatedCard.Description>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCard.Title>
                    Cost-Effective Long-Term Security
                  </AnimatedCard.Title>
                  <AnimatedCard.Description className="mt-3 text-base">
                    Security spending must justify itself. Our assessments focus on reducing actual risk, not generating 
                    endless reports. We help prioritize fixes based on business impact, ensuring security investments 
                    deliver measurable protection improvements.
                  </AnimatedCard.Description>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCard.Title>
                    Client Communication & Support
                  </AnimatedCard.Title>
                  <AnimatedCard.Description className="mt-3 text-base">
                    Security projects fail when communication breaks down. We explain findings in business terms, 
                    provide context for technical risks, and remain available for questions long after reports are delivered. 
                    Clear communication builds better security outcomes.
                  </AnimatedCard.Description>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCard.Title>
                    Trusted, Reliable Services
                  </AnimatedCard.Title>
                  <AnimatedCard.Description className="mt-3 text-base">
                    Consistency matters in security partnerships. We maintain the same testing rigor whether conducting 
                    our first assessment or our fiftieth for a client. Our team follows documented methodologies, 
                    maintains confidentiality, and delivers on commitments.
                  </AnimatedCard.Description>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>
          </StaggerChildren>
        </Container>
      </Section>

      {/* What Sets Us Apart */}
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <div className="text-center">
            <H2 className="mb-6 text-white">What Sets Us Apart</H2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <Globe className="mx-auto mb-3 h-8 w-8 text-primary" />
                <H3 className="mb-2 text-white">Global Reach</H3>
                <Muted className="text-gray-400">
                  Serving clients worldwide from our Pune headquarters
                </Muted>
              </div>
              
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <Zap className="mx-auto mb-3 h-8 w-8 text-primary" />
                <H3 className="mb-2 text-white">Next-Gen Approach</H3>
                <Muted className="text-gray-400">
                  Cutting-edge techniques and innovative solutions
                </Muted>
              </div>
              
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <Users className="mx-auto mb-3 h-8 w-8 text-primary" />
                <H3 className="mb-2 text-white">Client-Focused</H3>
                <Muted className="text-gray-400">
                  Long-term partnerships built on trust and results
                </Muted>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}