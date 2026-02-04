import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  noPadding?: boolean;
}

export function Section({
  children,
  className,
  containerSize = "lg",
  noPadding = false,
}: SectionProps) {
  return (
    <section className={cn(!noPadding && "py-16 md:py-24", className)}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
