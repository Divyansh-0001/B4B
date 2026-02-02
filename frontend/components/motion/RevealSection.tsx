"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "section" | "div" | "article" | "span";
};

export default function RevealSection({
  children,
  className,
  delay = 0,
  y = 16,
  once = true,
  as = "section"
}: RevealSectionProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as;
  const MotionTag =
    as === "article"
      ? m.article
      : as === "div"
        ? m.div
        : as === "span"
          ? m.span
          : m.section;

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <MotionTag
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.25 }}
        variants={{
          hidden: { opacity: 0, y },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay
            }
          }
        }}
      >
        {children}
      </MotionTag>
    </LazyMotion>
  );
}
