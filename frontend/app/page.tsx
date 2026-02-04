"use client";

import { VideoBackground } from "@/components/VideoBackground";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/layout/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { H2, Muted } from "@/components/ui/typography";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Users, Zap, Eye, Database } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Lock,
      title: "Advanced Authentication",
      description: "Multi-factor authentication with JWT, OAuth2, and biometric support",
    },
    {
      icon: Shield,
      title: "Threat Prevention",
      description: "AI-powered threat detection with real-time alerts and automated response",
    },
    {
      icon: Users,
      title: "Access Control",
      description: "Granular role-based permissions with audit trails and compliance",
    },
    {
      icon: Zap,
      title: "Instant Response",
      description: "Lightning-fast incident response with automated playbooks",
    },
    {
      icon: Eye,
      title: "24/7 Monitoring",
      description: "Continuous surveillance with AI-driven anomaly detection",
    },
    {
      icon: Database,
      title: "Data Protection",
      description: "End-to-end encryption with zero-knowledge architecture",
    },
  ];

  return (
    <>
      {/* Full-screen hero with video background */}
      <div className="relative min-h-screen">
        <VideoBackground redOverlay />
        <Hero />
      </div>
      
      {/* Features section */}
      <Section className="bg-background">
        <div className="text-center">
          <H2 className="mb-4">Comprehensive Security Suite</H2>
          <Muted className="mx-auto max-w-2xl">
            Enterprise-grade protection with advanced threat intelligence, 
            real-time monitoring, and automated response systems
          </Muted>
        </div>
        
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <AnimatedCard className="h-full">
                <AnimatedCard.Header>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCard.Title className="text-lg">
                    {feature.title}
                  </AnimatedCard.Title>
                  <AnimatedCard.Description className="mt-2">
                    {feature.description}
                  </AnimatedCard.Description>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>
      
      <Footer />
    </>
  );
}
