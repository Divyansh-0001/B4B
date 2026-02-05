"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { H3, Muted } from "@/components/ui/typography";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  delay?: number;
}

export function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  features,
  delay = 0 
}: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: shouldReduceMotion ? 0.01 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="h-full"
    >
      <AnimatedCard className="group h-full border-t-4 border-primary/50 transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/10">
        <AnimatedCard.Header>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
            <Icon className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-6" />
          </div>
          <H3 className="text-xl">{title}</H3>
          <Muted className="mt-3 text-base leading-relaxed">
            {description}
          </Muted>
        </AnimatedCard.Header>

        {features && features.length > 0 && (
          <AnimatedCard.Content>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">
                Key Capabilities:
              </p>
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedCard.Content>
        )}
      </AnimatedCard>
    </motion.div>
  );
}
