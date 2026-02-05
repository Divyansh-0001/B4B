"use client";

import Link from "next/link";
import { VideoBackground } from "@/components/VideoBackground";
import { Hero } from "@/components/Hero";
import { CoreVerticalsShowcase } from "@/components/sections/CoreVerticalsShowcase";
import { Section } from "@/components/layout/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { H2, H3, Lead, Muted, P } from "@/components/ui/typography";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { TestimonialCarousel, Testimonial } from "@/components/ui/TestimonialCarousel";
import { ClientLogos } from "@/components/ClientLogos";
import { Footer } from "@/components/layout/Footer";
import { 
  Shield, 
  Lock, 
  Users, 
  Zap, 
  Eye, 
  Database,
  Globe,
  Target,
  Cloud,
  Cpu,
  Smartphone,
  Mail,
  ArrowRight
} from "lucide-react";

export default function Home() {
  // Testimonials - Add real testimonials here
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Organizations of all sizes rely on Be4Breach for comprehensive security products and services that protect their digital infrastructure.",
      author: "Security Director",
      role: "Chief Information Security Officer",
      company: "Enterprise Client"
    },
    {
      id: 2,
      quote: "Be4Breach provides exceptional penetration testing services with detailed reporting and actionable recommendations that significantly improved our security posture.",
      author: "IT Manager",
      role: "Head of IT Security",
      company: "Technology Company"
    },
    {
      id: 3,
      quote: "Their cloud security expertise helped us migrate to the cloud safely and cost-effectively while maintaining the highest security standards.",
      author: "CTO",
      role: "Chief Technology Officer",
      company: "SaaS Provider"
    }
  ];

  const services = [
    {
      icon: Globe,
      title: "Penetration Testing",
      description: "Be4Breach conducts web, cloud, mobile, network, IoT, and wireless penetration tests to find vulnerabilities before attackers do.",
    },
    {
      icon: Target,
      title: "Breach Impact Analysis",
      description: "Assess enterprise security posture against real-world adversaries.",
    },
    {
      icon: Cloud,
      title: "Cloud Security",
      description: "Ensure scalable cloud infrastructure protection, reduce risks and costs.",
    },
    {
      icon: Cpu,
      title: "SCADA/OT Penetration Testing",
      description: "Simulate attacks on industrial control systems to find vulnerabilities and improve compliance.",
    },
    {
      icon: Smartphone,
      title: "Mobile App Penetration Testing",
      description: "Identify and fix vulnerabilities in mobile applications and devices using standard frameworks like OWASP MASTG.",
    },
    {
      icon: Mail,
      title: "Phishing Simulation",
      description: "AI-driven phishing awareness simulations and reporting to build human firewalls.",
    },
    {
      icon: Lock,
      title: "Security Engineering",
      description: "Design and deploy measures that protect systems from unauthorized access.",
    },
  ];

  return (
    <>
      {/* Full-screen hero with video background */}
      <div className="relative min-h-screen">
        <VideoBackground redOverlay />
        <Hero />
      </div>

      {/* Core Verticals Showcase */}
      <CoreVerticalsShowcase />
      
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
          {services.slice(0, 6).map((service, index) => (
            <StaggerItem key={index}>
              <AnimatedCard className="group h-full border-t-4 border-primary/50 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10">
                <AnimatedCard.Header>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCard.Title className="text-lg">
                    {service.title}
                  </AnimatedCard.Title>
                  <AnimatedCard.Description className="mt-2 text-sm leading-relaxed">
                    {service.description}
                  </AnimatedCard.Description>
                </AnimatedCard.Header>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-8 text-center">
          <Link href="/services">
            <Button size="lg" variant="outline">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
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

      {/* Client Trust Section */}
      <Section className="bg-background">
        <div className="text-center">
          <H2 className="mb-4">Trusted by Organizations Worldwide</H2>
          <P className="mx-auto max-w-2xl text-muted-foreground">
            Organizations of all sizes rely on Be4Breach for security products and services
          </P>
        </div>

        {/* Client Logos */}
        <div className="mt-12">
          <ClientLogos />
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </Section>

      {/* Latest Blog Posts */}
      <Section className="bg-background">
        <div className="text-center">
          <H2 className="mb-4">Latest Insights</H2>
          <Muted className="mx-auto max-w-2xl">
            Expert security insights and best practices from the Be4Breach team
          </Muted>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatedCard className="group border-l-4 border-primary/50 hover:border-primary">
            <AnimatedCard.Header>
              <div className="mb-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary w-fit">
                Data Security
              </div>
              <H3 className="mt-3 text-lg group-hover:text-primary transition-colors">
                Five Measures Tech Firms Can Take to Halt Data Breaches
              </H3>
              <Muted className="mt-2 text-sm">
                Critical security measures to prevent unauthorized access and protect sensitive data
              </Muted>
            </AnimatedCard.Header>
            <AnimatedCard.Footer>
              <Link href="/blog/halt-data-breaches" className="w-full">
                <Button variant="ghost" size="sm" className="w-full group/btn">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </AnimatedCard.Footer>
          </AnimatedCard>

          <AnimatedCard className="group border-l-4 border-primary/50 hover:border-primary">
            <AnimatedCard.Header>
              <div className="mb-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary w-fit">
                Cloud Technology
              </div>
              <H3 className="mt-3 text-lg group-hover:text-primary transition-colors">
                Docker&apos;s Five Most Unusual and Amazing Use Cases
              </H3>
              <Muted className="mt-2 text-sm">
                Innovative ways organizations leverage Docker beyond traditional containerization
              </Muted>
            </AnimatedCard.Header>
            <AnimatedCard.Footer>
              <Link href="/blog/docker-use-cases" className="w-full">
                <Button variant="ghost" size="sm" className="w-full group/btn">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </AnimatedCard.Footer>
          </AnimatedCard>

          <AnimatedCard className="group border-l-4 border-primary/50 hover:border-primary">
            <AnimatedCard.Header>
              <div className="mb-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary w-fit">
                Cloud Security
              </div>
              <H3 className="mt-3 text-lg group-hover:text-primary transition-colors">
                Critical PAM Controls for Modern Cloud Environments
              </H3>
              <Muted className="mt-2 text-sm">
                Essential Privileged Access Management controls for securing cloud infrastructure
              </Muted>
            </AnimatedCard.Header>
            <AnimatedCard.Footer>
              <Link href="/blog/pam-controls-cloud" className="w-full">
                <Button variant="ghost" size="sm" className="w-full group/btn">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </AnimatedCard.Footer>
          </AnimatedCard>
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog">
            <Button size="lg" variant="outline">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
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
