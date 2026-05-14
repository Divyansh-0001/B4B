"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

  const motionProps: HTMLMotionProps<"section"> = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.55, ease: "easeOut" },
      };

  return (
    <motion.section
      {...motionProps}
      className={cn(!noPadding && "py-16 md:py-24", className)}
    >
      <Container size={containerSize}>{children}</Container>
    </motion.section>
  );
}
