"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { H3, P, Small } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  tags: string[];
  featured?: boolean;
}

export function BlogCard({
  id,
  title,
  summary,
  category,
  readTime,
  publishedDate,
  author,
  tags,
  featured = false,
}: BlogCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatedCard className={`group h-full overflow-hidden border-l-4 transition-all hover:shadow-xl hover:shadow-primary/10 ${
      featured ? "border-primary" : "border-primary/50 hover:border-primary"
    }`}>
      <AnimatedCard.Header>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{publishedDate}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            <span>{readTime}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
            {category}
          </span>
        </div>

        <H3 className="mt-4 text-xl transition-colors group-hover:text-primary lg:text-2xl">
          {title}
        </H3>

        <P className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {summary}
        </P>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
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
          By {author}
        </Small>
        <Link href={`/blog/${id}`}>
          <Button variant="outline" className="group/btn">
            Read More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </AnimatedCard.Footer>
    </AnimatedCard>
  );
}
