"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { H2, Muted } from "@/components/ui/typography";

export function CoreVerticalsShowcase() {
  const shouldReduceMotion = useReducedMotion();

  const verticals = [
    {
      title: "Cybersecurity Services",
      tagline: "Offensive & Defensive Security",
      image: "/images/cybersecurity-vertical.svg",
      href: "/cybersecurity",
      description: "Comprehensive penetration testing, threat intelligence, and security operations"
    },
    {
      title: "AI Solutions",
      tagline: "Secure AI Engineering",
      image: "/images/ai-vertical.svg",
      href: "/ai-solutions",
      description: "AI-powered security automation and production-ready ML systems"
    }
  ];

  return (
    <Section className="bg-background" noPadding>
      <div className="py-16 md:py-20">
        <div className="mb-12 text-center">
          <H2 className="mb-4">Our Core Verticals</H2>
          <Muted className="mx-auto max-w-2xl">
            Two specialized domains, one mission: securing the digital future
          </Muted>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {verticals.map((vertical, index) => (
            <motion.div
              key={vertical.href}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.6,
                delay: shouldReduceMotion ? 0 : index * 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Link href={vertical.href} className="group block">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl border-2 border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20"
                >
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={vertical.image}
                      alt={vertical.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                        {vertical.title}
                      </h3>
                      <p className="mb-3 text-sm text-gray-300 md:text-base">
                        {vertical.tagline}
                      </p>
                      <p className="text-xs text-gray-400 md:text-sm">
                        {vertical.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute right-4 top-4 rounded-full bg-primary/10 px-4 py-2 backdrop-blur-sm transition-all group-hover:bg-primary/20">
                    <span className="text-xs font-medium text-white">Explore →</span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
