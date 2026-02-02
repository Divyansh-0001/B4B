"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type AnimatedSectionProps = React.ComponentProps<typeof motion.section>;

export function AnimatedSection({
  children,
  className,
  ...props
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
