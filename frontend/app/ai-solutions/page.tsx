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
  Cpu, 
  Lock, 
  Zap, 
  Eye, 
  Shield,
  Database,
  GitBranch,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AISolutionsPage() {
  return (
    <PageLayout>
      {/* Header */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/ai-vertical.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <Container size="lg" className="relative">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Core Vertical</span>
            </div>
            <H1 className="mb-6 text-white">
              Secure AI Engineering & Solutions
            </H1>
            <Lead className="text-gray-300">
              Building AI systems that enhance security operations while remaining 
              secure themselves—from threat detection to secure model deployment
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      {/* AI Security Automation */}
      <Section>
        <Container size="lg">
          <div className="mb-12">
            <H2 className="mb-4">AI-Powered Security Automation</H2>
            <Muted className="max-w-3xl">
              Leverage machine learning and AI to enhance threat detection, automate security operations, and accelerate incident response
            </Muted>
          </div>

          <StaggerChildren className="grid gap-6 md:grid-cols-2">
            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <H3 className="text-xl">Threat Detection & Analysis</H3>
                  <Muted className="mt-2">
                    AI-driven anomaly detection, behavioral analysis, and predictive threat intelligence 
                    for proactive security operations
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full border-l-4 border-primary">
                <AnimatedCard.Header>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <H3 className="text-xl">Automated Response Systems</H3>
                  <Muted className="mt-2">
                    Intelligent security orchestration, automated playbook execution, and self-healing security controls
                  </Muted>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>
          </StaggerChildren>
        </Container>
      </Section>

      {/* Custom AI/ML Development */}
      <Section className="bg-muted/30">
        <Container size="lg">
          <div className="mb-12">
            <H2 className="mb-4">Custom AI/ML Model Development</H2>
            <Muted className="max-w-3xl">
              Tailored machine learning solutions designed for your specific security and operational requirements
            </Muted>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <AnimatedCard className="border-t-4 border-primary">
              <AnimatedCard.Header>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <H3 className="text-lg">Security-Focused Models</H3>
                <Muted className="mt-2 text-sm">
                  Custom ML models for malware detection, phishing identification, and behavioral analysis
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-t-4 border-primary">
              <AnimatedCard.Header>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <GitBranch className="h-6 w-6 text-primary" />
                </div>
                <H3 className="text-lg">Model Training & Optimization</H3>
                <Muted className="mt-2 text-sm">
                  Data pipeline engineering, model fine-tuning, and performance optimization for production deployment
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>

            <AnimatedCard className="border-t-4 border-primary">
              <AnimatedCard.Header>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <H3 className="text-lg">Adversarial Robustness</H3>
                <Muted className="mt-2 text-sm">
                  Hardening AI models against adversarial attacks, data poisoning, and model extraction attempts
                </Muted>
              </AnimatedCard.Header>
            </AnimatedCard>
          </div>
        </Container>
      </Section>

      {/* Secure AI Deployment */}
      <Section>
        <Container size="lg">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <H2 className="mb-4">Secure AI Deployment & MLOps</H2>
              <P className="mb-6 leading-relaxed text-muted-foreground">
                Deploy AI systems with confidence through secure infrastructure, continuous monitoring, 
                and production-grade MLOps pipelines. We ensure your AI models are protected, 
                performant, and compliant throughout their lifecycle.
              </P>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Lock className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <P className="font-semibold">Secure Model Deployment</P>
                    <Muted className="text-sm">
                      Encrypted model storage, access control, and secure inference endpoints
                    </Muted>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Eye className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <P className="font-semibold">Model Monitoring & Drift Detection</P>
                    <Muted className="text-sm">
                      Continuous performance tracking, anomaly detection, and automated retraining triggers
                    </Muted>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <P className="font-semibold">Responsible AI Practices</P>
                    <Muted className="text-sm">
                      Bias detection, explainability frameworks, and ethical AI implementation
                    </Muted>
                  </div>
                </div>
              </div>
            </div>

            <AnimatedCard className="border-l-4 border-primary bg-muted/50">
              <AnimatedCard.Header>
                <H3 className="mb-4 text-primary">Production-Ready AI Systems</H3>
              </AnimatedCard.Header>
              <AnimatedCard.Content>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">Scalable inference infrastructure with load balancing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">CI/CD pipelines for model versioning and deployment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">A/B testing frameworks for model performance validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">Comprehensive logging, metrics, and observability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">Disaster recovery and model rollback capabilities</span>
                  </li>
                </ul>
              </AnimatedCard.Content>
            </AnimatedCard>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <div className="text-center">
            <H2 className="mb-6 text-white">
              Build Secure AI Systems
            </H2>
            <P className="mb-8 text-xl text-gray-300">
              Partner with Be4Breach to develop and deploy AI solutions that are secure, scalable, and production-ready
            </P>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Discuss Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
