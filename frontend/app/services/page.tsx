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
  Globe, 
  Cloud, 
  Smartphone, 
  Shield, 
  Target, 
  Mail, 
  Lock,
  Network,
  Cpu,
  Eye,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: Globe,
      title: "Penetration Testing",
      slug: "penetration-testing",
      description: "Be4Breach conducts web, cloud, mobile, network, IoT, and wireless penetration tests to find vulnerabilities before attackers do.",
      features: [
        "Web Application Testing",
        "Cloud Infrastructure Testing",
        "Mobile Application Security",
        "Network Security Assessment",
        "IoT Device Testing",
        "Wireless Network Testing"
      ],
      color: "primary"
    },
    {
      icon: Target,
      title: "Breach Impact Analysis",
      slug: "breach-impact-analysis",
      description: "Assess enterprise security posture against real-world adversaries.",
      features: [
        "Real-World Attack Simulation",
        "Security Posture Assessment",
        "Adversary Emulation",
        "Impact Quantification",
        "Remediation Roadmap",
        "Executive Reporting"
      ],
      color: "primary"
    },
    {
      icon: Cloud,
      title: "Cloud Security",
      slug: "cloud-security",
      description: "Ensure scalable cloud infrastructure protection, reduce risks and costs.",
      features: [
        "Cloud Configuration Review",
        "Multi-Cloud Security",
        "Container Security",
        "Serverless Security",
        "Cloud Compliance",
        "Cost Optimization"
      ],
      color: "primary"
    },
    {
      icon: Cpu,
      title: "SCADA/OT Penetration Testing",
      slug: "scada-ot-testing",
      description: "Simulate attacks on industrial control systems to find vulnerabilities and improve compliance.",
      features: [
        "Industrial Control Systems",
        "SCADA Security Testing",
        "Operational Technology Assessment",
        "Critical Infrastructure Protection",
        "Compliance Validation",
        "Safety System Reviews"
      ],
      color: "primary"
    },
    {
      icon: Smartphone,
      title: "Mobile App Penetration Testing",
      slug: "mobile-app-testing",
      description: "Identify and fix vulnerabilities in mobile applications and devices using standard frameworks like OWASP MASTG.",
      features: [
        "iOS Security Testing",
        "Android Security Testing",
        "OWASP MASTG Framework",
        "API Security Testing",
        "Data Storage Analysis",
        "Runtime Security"
      ],
      color: "primary"
    },
    {
      icon: Mail,
      title: "Phishing Simulation",
      slug: "phishing-simulation",
      description: "AI-driven phishing awareness simulations and reporting to build human firewalls.",
      features: [
        "Realistic Phishing Campaigns",
        "AI-Driven Scenarios",
        "Employee Awareness Training",
        "Detailed Reporting",
        "Security Culture Building",
        "Ongoing Simulation Programs"
      ],
      color: "primary"
    },
    {
      icon: Lock,
      title: "Security Engineering",
      slug: "security-engineering",
      description: "Design and deploy measures that protect systems from unauthorized access.",
      features: [
        "Security Architecture Design",
        "Zero Trust Implementation",
        "Access Control Systems",
        "Secure Development",
        "Infrastructure Hardening",
        "Security Automation"
      ],
      color: "primary"
    }
  ];

  return (
    <PageLayout>
      {/* Header */}
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Services</span>
            </div>
            <H1 className="mb-6 text-white">
              Comprehensive Cybersecurity Solutions
            </H1>
            <Lead className="text-gray-300">
              Next-generation security services protecting your digital assets from emerging threats
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section>
        <Container size="xl">
          <StaggerChildren className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <Link href={`/${service.slug}`}>
                  <AnimatedCard className="group h-full border-t-4 border-primary transition-shadow hover:shadow-xl hover:shadow-primary/10">
                    <AnimatedCard.Header>
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <service.icon className="h-7 w-7 text-primary" />
                      </div>
                      <AnimatedCard.Title className="text-xl">
                        {service.title}
                      </AnimatedCard.Title>
                      <AnimatedCard.Description className="mt-3 text-base leading-relaxed">
                        {service.description}
                      </AnimatedCard.Description>
                    </AnimatedCard.Header>
                    
                    <AnimatedCard.Content>
                      <div className="space-y-2">
                        <P className="text-sm font-semibold text-foreground">
                          Key Capabilities:
                        </P>
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AnimatedCard.Content>

                    <AnimatedCard.Footer>
                      <Button variant="outline" className="w-full group/btn">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </AnimatedCard.Footer>
                  </AnimatedCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Why Choose Be4Breach */}
      <Section className="bg-muted/30">
        <Container size="lg">
          <div className="text-center">
            <H2 className="mb-6">Why Choose Be4Breach</H2>
            <Muted className="mx-auto max-w-3xl">
              We combine cutting-edge technology with deep expertise to deliver 
              comprehensive security solutions that protect your organization
            </Muted>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <H3 className="mb-2 text-lg">Expert Team</H3>
              <Muted className="text-sm">
                Certified security professionals with real-world experience
              </Muted>
            </div>

            <div className="rounded-xl border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Network className="h-6 w-6 text-primary" />
              </div>
              <H3 className="mb-2 text-lg">Global Reach</H3>
              <Muted className="text-sm">
                Serving clients worldwide from our Pune headquarters
              </Muted>
            </div>

            <div className="rounded-xl border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <H3 className="mb-2 text-lg">Next-Gen Tools</H3>
              <Muted className="text-sm">
                AI-driven analysis and cutting-edge security technologies
              </Muted>
            </div>

            <div className="rounded-xl border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <H3 className="mb-2 text-lg">Proven Results</H3>
              <Muted className="text-sm">
                Track record of protecting critical digital assets
              </Muted>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <div className="text-center">
            <H2 className="mb-6 text-white">
              Ready to Secure Your Digital Assets?
            </H2>
            <P className="mb-8 text-xl text-gray-300">
              Get started with Be4Breach and experience next-generation cybersecurity protection
            </P>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full border-white bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
