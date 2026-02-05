"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Lead, Muted, Code } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { FadeIn } from "@/components/ui/FadeIn";
import { Shield, Zap, Lock } from "lucide-react";

export default function ComponentsDemo() {
  return (
    <PageLayout>
      {/* Hero */}
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <FadeIn direction="up" className="text-center">
          <H1 className="text-white">UI Components Demo</H1>
          <Lead className="mt-4 text-gray-300">
            Complete design system with RED & WHITE theme
          </Lead>
        </FadeIn>
      </Section>

      {/* Typography */}
      <Section>
        <H2 className="mb-8">Typography</H2>
        <div className="space-y-6">
          <div>
            <Muted className="mb-2">H1 Heading</Muted>
            <H1>The quick brown fox</H1>
          </div>
          <div>
            <Muted className="mb-2">H2 Heading</Muted>
            <H2>The quick brown fox</H2>
          </div>
          <div>
            <Muted className="mb-2">H3 Heading</Muted>
            <H3>The quick brown fox</H3>
          </div>
          <div>
            <Muted className="mb-2">Paragraph & Lead</Muted>
            <Lead>This is lead text for introductions</Lead>
            <P>This is regular paragraph text with proper spacing and line height.</P>
          </div>
          <div>
            <Muted className="mb-2">Code</Muted>
            <P>Use <Code>npm install</Code> to install dependencies.</P>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section className="bg-muted/50">
        <H2 className="mb-8">Buttons</H2>
        
        <div className="space-y-6">
          <div>
            <H3 className="mb-4">Variants</H3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div>
            <H3 className="mb-4">Sizes</H3>
            <div className="flex items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">→</Button>
            </div>
          </div>

          <div>
            <H3 className="mb-4">Animated Buttons</H3>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton>Hover Me</AnimatedButton>
              <AnimatedButton variant="outline">Outline Animated</AnimatedButton>
            </div>
          </div>
        </div>
      </Section>

      {/* Cards */}
      <Section>
        <H2 className="mb-8">Cards</H2>
        
        <StaggerChildren className="grid gap-6 md:grid-cols-3">
          <StaggerItem>
            <AnimatedCard>
              <AnimatedCard.Header>
                <div className="mb-2 rounded-full bg-primary/10 p-3 w-fit">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <AnimatedCard.Title>Security</AnimatedCard.Title>
                <AnimatedCard.Description>
                  Enterprise-grade security features
                </AnimatedCard.Description>
              </AnimatedCard.Header>
              <AnimatedCard.Content>
                <P className="text-sm">
                  Advanced threat detection and prevention systems.
                </P>
              </AnimatedCard.Content>
              <AnimatedCard.Footer>
                <Button size="sm">Learn More</Button>
              </AnimatedCard.Footer>
            </AnimatedCard>
          </StaggerItem>

          <StaggerItem>
            <AnimatedCard>
              <AnimatedCard.Header>
                <div className="mb-2 rounded-full bg-primary/10 p-3 w-fit">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <AnimatedCard.Title>Performance</AnimatedCard.Title>
                <AnimatedCard.Description>
                  Lightning-fast response times
                </AnimatedCard.Description>
              </AnimatedCard.Header>
              <AnimatedCard.Content>
                <P className="text-sm">
                  Optimized for speed and efficiency.
                </P>
              </AnimatedCard.Content>
              <AnimatedCard.Footer>
                <Button size="sm" variant="outline">
                  Explore
                </Button>
              </AnimatedCard.Footer>
            </AnimatedCard>
          </StaggerItem>

          <StaggerItem>
            <AnimatedCard>
              <AnimatedCard.Header>
                <div className="mb-2 rounded-full bg-primary/10 p-3 w-fit">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <AnimatedCard.Title>Compliance</AnimatedCard.Title>
                <AnimatedCard.Description>
                  Industry standard compliance
                </AnimatedCard.Description>
              </AnimatedCard.Header>
              <AnimatedCard.Content>
                <P className="text-sm">
                  Meet all regulatory requirements.
                </P>
              </AnimatedCard.Content>
              <AnimatedCard.Footer>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </AnimatedCard.Footer>
            </AnimatedCard>
          </StaggerItem>
        </StaggerChildren>
      </Section>

      {/* Animations */}
      <Section className="bg-muted/50">
        <H2 className="mb-8">Animations</H2>
        
        <div className="space-y-8">
          <div>
            <H3 className="mb-4">Fade Directions</H3>
            <div className="grid gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-lg border bg-card p-6 text-center">
                  <P>Fade In</P>
                </div>
              </FadeIn>
              <FadeIn direction="up">
                <div className="rounded-lg border bg-card p-6 text-center">
                  <P>Fade In Up</P>
                </div>
              </FadeIn>
              <FadeIn direction="down">
                <div className="rounded-lg border bg-card p-6 text-center">
                  <P>Fade In Down</P>
                </div>
              </FadeIn>
            </div>
          </div>

          <div>
            <H3 className="mb-4">Stagger Effect</H3>
            <Muted className="mb-4">Items animate in sequence</Muted>
            <StaggerChildren className="grid gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <StaggerItem key={i}>
                  <div className="rounded-lg border bg-card p-6 text-center">
                    <P>Item {i}</P>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </Section>

      {/* Color Palette */}
      <Section>
        <H2 className="mb-8">Color Palette - RED & WHITE Only</H2>
        
        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <div className="mb-3 h-24 rounded-lg bg-primary" />
            <P className="font-semibold">Primary RED</P>
            <Code>#E10600</Code>
          </div>
          <div>
            <div className="mb-3 h-24 rounded-lg border bg-background" />
            <P className="font-semibold">Background WHITE</P>
            <Code>#FFFFFF</Code>
          </div>
          <div>
            <div className="mb-3 h-24 rounded-lg bg-foreground" />
            <P className="font-semibold">Foreground Charcoal</P>
            <Code>Dark Text</Code>
          </div>
          <div>
            <div className="mb-3 h-24 rounded-lg bg-muted" />
            <P className="font-semibold">Muted Gray</P>
            <Code>Subtle</Code>
          </div>
        </div>
      </Section>

      {/* Reduced Motion Info */}
      <Section className="bg-primary/5">
        <div className="rounded-lg border-l-4 border-primary bg-card p-6">
          <H3 className="mb-2 text-primary">Accessibility</H3>
          <P>
            All animations respect <Code>prefers-reduced-motion</Code> settings.
            Users who prefer reduced motion will see instant transitions with no
            movement.
          </P>
        </div>
      </Section>
    </PageLayout>
  );
}
