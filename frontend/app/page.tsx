"use client";

import { VideoBackground } from "@/components/VideoBackground";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/layout/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { H2, H3, Lead, Muted } from "@/components/ui/typography";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Users, Zap, Eye, Database } from "lucide-react";

export default function Home() {
  const services = [
    {
      icon: Shield,
      title: "Penetration Testing",
      description: "Comprehensive security assessments to identify vulnerabilities before attackers do",
    },
    {
      icon: Database,
      title: "Cloud Security",
      description: "Secure your cloud infrastructure with advanced protection and compliance",
    },
    {
      icon: Eye,
      title: "Threat Intelligence",
      description: "Predict and prevent sophisticated attacks with next-gen threat analysis",
    },
    {
      icon: Lock,
      title: "Security Engineering",
      description: "Custom security solutions engineered for your specific needs",
    },
    {
      icon: Zap,
      title: "Incident Response",
      description: "Rapid response to security incidents with expert guidance and remediation",
    },
    {
      icon: Users,
      title: "Security Consulting",
      description: "Strategic security planning and long-term collaboration for robust protection",
    },
  ];

  return (
    <>
      {/* Full-screen hero with video background */}
      <div className="relative min-h-screen">
        <VideoBackground redOverlay />
        <Hero />
      </div>
      
      {/* About Section */}
      <Section className="bg-background">
        <div className="mx-auto max-w-4xl text-center">
          <H2 className="mb-6">About Be4Breach</H2>
          <Lead className="text-foreground">
            A young, ambitious leader in penetration testing, cloud security, and next-gen cybersecurity services
          </Lead>
          <Muted className="mt-4 text-base">
            Headquartered in Pune, India, we protect digital systems, predict threats, and engineer solutions 
            for organizations worldwide. Our mission is to form long-term collaborations globally, 
            build strong security postures, and ensure complete client satisfaction.
          </Muted>
        </div>
      </Section>

      {/* Services section */}
      <Section className="bg-muted/30">
        <div className="text-center">
          <H2 className="mb-4">Our Services</H2>
          <Muted className="mx-auto max-w-2xl">
            Comprehensive cybersecurity solutions protecting your digital assets from 
            unauthorized access, tampering, theft, and disruption
          </Muted>
        </div>
        
        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <AnimatedCard className="h-full">
                <AnimatedCard.Header>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCard.Title className="text-lg">
                    {service.title}
                  </AnimatedCard.Title>
                  <AnimatedCard.Description className="mt-2">
                    {service.description}
                  </AnimatedCard.Description>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-background">
        <div className="grid gap-8 md:grid-cols-2">
          <AnimatedCard className="border-l-4 border-primary">
            <AnimatedCard.Header>
              <AnimatedCard.Title className="text-primary">
                Our Mission
              </AnimatedCard.Title>
              <AnimatedCard.Description className="mt-4 text-base leading-relaxed">
                To form long-term collaborations globally, build strong security 
                infrastructures, and ensure complete client satisfaction through 
                innovative, reliable cybersecurity solutions.
              </AnimatedCard.Description>
            </AnimatedCard.Header>
          </AnimatedCard>

          <AnimatedCard className="border-l-4 border-primary">
            <AnimatedCard.Header>
              <AnimatedCard.Title className="text-primary">
                Our Vision
              </AnimatedCard.Title>
              <AnimatedCard.Description className="mt-4 text-base leading-relaxed">
                Combat rising attacker sophistication and ensure that data, applications, 
                and digital assets are protected from unauthorized access, tampering, 
                theft, and disruption through cutting-edge security practices.
              </AnimatedCard.Description>
            </AnimatedCard.Header>
          </AnimatedCard>
        </div>
      </Section>

      {/* Core Values */}
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <div className="text-center">
          <H2 className="mb-6 text-white">Our Core Values</H2>
          <Muted className="mx-auto max-w-2xl text-gray-300">
            The principles that guide our work and define our commitment to excellence
          </Muted>
        </div>

        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StaggerItem>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <H3 className="mb-2 text-lg text-white">
                Protect Critical Data
              </H3>
              <Muted className="text-sm text-gray-400">
                Safeguarding your most valuable digital assets with unwavering vigilance
              </Muted>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <H3 className="mb-2 text-lg text-white">
                Cost-Effective Security
              </H3>
              <Muted className="text-sm text-gray-400">
                Long-term security solutions that deliver maximum value and ROI
              </Muted>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <H3 className="mb-2 text-lg text-white">
                Client Communication
              </H3>
              <Muted className="text-sm text-gray-400">
                Transparent communication and dedicated support throughout your journey
              </Muted>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <H3 className="mb-2 text-lg text-white">
                Trusted Services
              </H3>
              <Muted className="text-sm text-gray-400">
                Reliable, proven security services you can depend on
              </Muted>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </Section>
      
      <Footer />
    </>
  );
}
