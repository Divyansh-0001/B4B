"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { fadeIn, fadeInUp, fadeInDown } from "@/lib/animations";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "none";
  delay?: number;
}

export function FadeIn({ 
  children, 
  direction = "none", 
  delay = 0,
  ...props 
}: FadeInProps) {
  const variant = direction === "up" ? fadeInUp : direction === "down" ? fadeInDown : fadeIn;
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variant}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
