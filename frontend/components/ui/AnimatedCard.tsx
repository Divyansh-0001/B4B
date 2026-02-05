"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { cardHover } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function AnimatedCard({ children, className, hover = true }: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={hover ? cardHover : undefined}
      className={cn("h-full", className)}
    >
      <Card className="h-full">{children}</Card>
    </motion.div>
  );
}

AnimatedCard.Header = CardHeader;
AnimatedCard.Title = CardTitle;
AnimatedCard.Description = CardDescription;
AnimatedCard.Content = CardContent;
AnimatedCard.Footer = CardFooter;
