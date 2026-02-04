"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { VideoBackground } from "@/components/VideoBackground";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/layout/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { H2, Muted } from "@/components/ui/typography";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { Shield, Lock, Users } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Lock,
      title: "JWT Authentication",
      description: "Secure token-based authentication with OAuth2 SSO support",
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Granular permissions for Admin, Client, and User roles",
    },
    {
      icon: Shield,
      title: "Real-Time Security",
      description: "Monitor and respond to threats in real-time",
    },
  ];

  return (
    <PageLayout>
      <div className="relative min-h-screen">
        <VideoBackground />
        <Hero />
      </div>
      
      <Section className="bg-background">
        <div className="text-center">
          <H2 className="mb-4">Core Features</H2>
          <Muted className="mx-auto max-w-2xl">
            Enterprise-grade security platform with advanced threat detection and role-based access control
          </Muted>
        </div>
        
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <AnimatedCard>
                <AnimatedCard.Header>
                  <div className="mb-2 rounded-full bg-primary/10 p-3 w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCard.Title>{feature.title}</AnimatedCard.Title>
                  <AnimatedCard.Description>
                    {feature.description}
                  </AnimatedCard.Description>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>
    </PageLayout>
  );
}
