"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, P, Lead, Muted } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  // In a real implementation, fetch post data based on slug
  // For now, show placeholder

  return (
    <PageLayout>
      <Section>
        <Container size="md">
          <FadeIn>
            <Link href="/blog">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                <span>2024</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <span>5 min read</span>
              </div>
            </div>

            <H1 className="mb-6">Blog Post Content</H1>
            
            <Lead className="mb-8">
              This is a placeholder for the full blog post content. Add your article content here.
            </Lead>

            <div className="prose prose-lg max-w-none">
              <P>
                This page displays the full blog post based on the slug: <strong>{slug}</strong>
              </P>
              
              <div className="mt-8 rounded-lg border-l-4 border-primary bg-card p-6">
                <H2 className="mb-4 text-primary">Add Blog Content</H2>
                <P>
                  To add the full article content, edit this file and replace this placeholder
                  with your actual blog post content. You can use the typography components
                  (H2, H3, P, etc.) to structure your article.
                </P>
              </div>
            </div>

            <div className="mt-12 rounded-xl border bg-muted/50 p-6">
              <Muted className="text-center">
                Written by Be4Breach Security Team
              </Muted>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Related Posts */}
      <Section className="bg-muted/30">
        <Container size="md">
          <H2 className="mb-8 text-center">Related Articles</H2>
          <div className="text-center">
            <Link href="/blog">
              <Button variant="outline">
                View All Blog Posts
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
