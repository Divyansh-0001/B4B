"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Lead, Muted } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { Briefcase, Users, Zap, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CareerPage() {
  return (
    <PageLayout>
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Briefcase className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Join Our Team</span>
            </div>
            <H1 className="mb-6 text-white">
              Build the Future of Cybersecurity
            </H1>
            <Lead className="text-gray-300">
              Innovation, efficiency, and adaptability drive our culture at Be4Breach
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      <Section>
        <Container size="lg">
          <div className="mb-12 text-center">
            <H2 className="mb-6">Why Join Be4Breach</H2>
            <P className="mx-auto max-w-3xl leading-relaxed text-muted-foreground">
              At Be4Breach, we believe talent drives innovation. Our work culture emphasizes continuous learning, 
              technical excellence, and collaborative problem-solving. Join a team of security professionals 
              protecting organizations worldwide from evolving cyber threats.
            </P>
          </div>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StaggerItem>
              <div className="rounded-xl border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <H3 className="mb-2 text-lg">Innovation-Driven</H3>
                <Muted className="text-sm">
                  Work with cutting-edge security tools and emerging technologies
                </Muted>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-xl border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <H3 className="mb-2 text-lg">Collaborative Team</H3>
                <Muted className="text-sm">
                  Expert mentorship and knowledge sharing across disciplines
                </Muted>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-xl border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <H3 className="mb-2 text-lg">Work-Life Balance</H3>
                <Muted className="text-sm">
                  Flexible work arrangements and comprehensive benefits
                </Muted>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-xl border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <H3 className="mb-2 text-lg">Global Impact</H3>
                <Muted className="text-sm">
                  Protect critical infrastructure for clients worldwide
                </Muted>
              </div>
            </StaggerItem>
          </StaggerChildren>
        </Container>
      </Section>

      <Section className="bg-muted/30">
        <Container size="lg">
          <H2 className="mb-8 text-center">Open Positions</H2>
          
          <div className="space-y-6">
            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <H3 className="text-xl">Security Consultant</H3>
                    <Muted className="mt-2">
                      Full-time · Pune, India · Hybrid
                    </Muted>
                  </div>
                  <Link href="/contact">
                    <Button>
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </AnimatedCard.Header>
              <AnimatedCard.Content>
                <P className="text-sm text-muted-foreground">
                  Join our security consulting team to deliver penetration testing, security assessments, 
                  and advisory services to enterprise clients. Requires hands-on experience with VAPT, 
                  cloud security, and industry security frameworks.
                </P>
              </AnimatedCard.Content>
            </AnimatedCard>

            <AnimatedCard className="border-l-4 border-primary">
              <AnimatedCard.Header>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <H3 className="text-xl">Security Engineer</H3>
                    <Muted className="mt-2">
                      Full-time · Pune, India · Hybrid
                    </Muted>
                  </div>
                  <Link href="/contact">
                    <Button>
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </AnimatedCard.Header>
              <AnimatedCard.Content>
                <P className="text-sm text-muted-foreground">
                  Design and implement security solutions for enterprise environments. Experience with 
                  security architecture, DevSecOps, and cloud security platforms required.
                </P>
              </AnimatedCard.Content>
            </AnimatedCard>
          </div>

          <div className="mt-12 text-center">
            <Muted className="mb-4">
              Don&apos;t see a role that fits? We&apos;re always looking for talented security professionals.
            </Muted>
            <Link href="/contact">
              <Button variant="outline">
                Send Us Your Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
