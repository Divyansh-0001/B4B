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
              Be4Breach is a young, ambitious leader in{" "}
              <span className="font-semibold text-primary">penetration testing</span>,{" "}
              <span className="font-semibold text-primary">cloud security</span>, and{" "}
              <span className="font-semibold text-primary">next-gen cybersecurity services</span>.
            </P>
            <P className="mt-6 text-lg leading-relaxed">
              With our headquarters in <span className="font-semibold">Pune, India</span>, 
              we protect digital systems, predict threats, and engineer innovative solutions 
              for organizations across the globe.
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
                  To form long-term collaborations globally, build strong security 
                  infrastructures, and ensure complete client satisfaction through 
                  innovative, reliable, and trusted cybersecurity solutions.
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
                  Combat rising attacker sophistication and ensure that data, applications, 
                  and digital assets are protected from unauthorized access, tampering, 
                  theft, and disruption through cutting-edge security practices.
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
                    We safeguard your most valuable digital assets with unwavering vigilance 
                    and state-of-the-art security measures, ensuring your critical data 
                    remains secure at all times.
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
                    Our solutions deliver maximum value and return on investment, 
                    providing sustainable security that grows with your organization 
                    without breaking the budget.
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
                    We maintain transparent, responsive communication with our clients, 
                    providing dedicated support and guidance throughout your security journey.
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
                    Our proven track record and commitment to excellence make us a 
                    reliable partner you can trust with your organization&apos;s security.
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