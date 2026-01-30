"use client";

import { motion } from "framer-motion";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 28px 60px -50px rgba(34, 211, 238, 0.45)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`glass-card ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}
