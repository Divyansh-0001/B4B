"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Lead, Muted, Small } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  tags: string[];
}

export default function BlogPage() {
  const posts: BlogPost[] = [
    {
      id: "halt-data-breaches",
      title: "Five Measures Tech Firms Can Take to Halt Data Breaches",
      summary: "Data breaches follow predictable patterns. Most stem from unpatched systems, misconfigured services, or excessive privilege. This article examines five technical controls that address the root causes: network segmentation to limit lateral movement, privilege access management to reduce credential exposure, vulnerability management with SLA-driven patching, logging and monitoring that detects anomalies, and incident response planning that reduces dwell time.",
      category: "Breach Prevention",
      readTime: "6 min read",
      publishedDate: "2024",
      author: "Be4Breach Security Team",
      tags: ["Data Protection", "Access Control", "Monitoring"]
    },
    {
      id: "docker-use-cases",
      title: "Docker in Security Testing: Five Practical Applications",
      summary: "Containerization solves specific security testing challenges. This article covers five scenarios where Docker improves security workflows: creating isolated testing environments that reset between assessments, packaging security tools with dependencies for consistent execution, building disposable analysis sandboxes for malware examination, orchestrating distributed scanning across target networks, and maintaining versioned testing infrastructure as code.",
      category: "Security Tools",
      readTime: "7 min read",
      publishedDate: "2024",
      author: "Be4Breach Security Team",
      tags: ["Containers", "Testing Tools", "Infrastructure"]
    },
    {
      id: "pam-controls-cloud",
      title: "Privileged Access Management in Cloud Environments",
      summary: "Cloud environments complicate privilege management. Traditional PAM solutions designed for on-premise infrastructure struggle with ephemeral resources, API-driven automation, and federated identity. This article examines critical controls for cloud PAM: just-in-time access provisioning that eliminates standing privileges, session recording for privileged operations, automated credential rotation, break-glass procedures for emergencies, and continuous privilege monitoring.",
      category: "Access Control",
      readTime: "8 min read",
      publishedDate: "2024",
      author: "Be4Breach Security Team",
      tags: ["PAM", "Cloud IAM", "Zero Trust"]
    }
  ];

  return (
    <PageLayout>
      {/* Header */}
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Tag className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Insights & Updates</span>
            </div>
            <H1 className="mb-6 text-white">
              Be4Breach Blog
            </H1>
            <Lead className="text-gray-300">
              Technical analysis, security research, and lessons learned from real-world 
              penetration testing engagements
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      {/* Blog Posts */}
      <Section>
        <Container size="lg">
          <StaggerChildren className="grid gap-8 lg:grid-cols-1">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <AnimatedCard className="group overflow-hidden border-l-4 border-primary/50 transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10">
                  <AnimatedCard.Header>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{post.publishedDate}</span>
                      </div>
                      <div className="h-4 w-px bg-border" />
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="h-4 w-px bg-border" />
                      <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                        {post.category}
                      </span>
                    </div>

                    <H2 className="mt-4 text-2xl transition-colors group-hover:text-primary lg:text-3xl">
                      {post.title}
                    </H2>

                    <P className="mt-4 leading-relaxed text-muted-foreground">
                      {post.summary}
                    </P>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </AnimatedCard.Header>

                  <AnimatedCard.Footer className="flex items-center justify-between">
                    <Small className="text-muted-foreground">
                      By {post.author}
                    </Small>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="outline" className="group/btn">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </AnimatedCard.Footer>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerChildren>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Muted>More articles coming soon</Muted>
          </div>
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm md:p-12">
            <H2 className="mb-4 text-white">Stay Updated</H2>
            <P className="mb-6 text-gray-300">
              Get the latest security insights and updates delivered to your inbox
            </P>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="your@email.com"
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button size="lg">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
