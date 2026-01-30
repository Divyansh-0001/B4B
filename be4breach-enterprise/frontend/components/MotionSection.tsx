"use client";

import { motion } from "framer-motion";

type MotionSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function MotionSection({
  children,
  className = "",
  delay = 0
}: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.25 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
