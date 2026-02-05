"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Shield, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants with reduced-motion support
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom easing for cinematic feel
      },
    },
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      {/* Radial gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-black/40 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md shadow-lg shadow-primary/20">
            <Shield className="h-4 w-4 text-primary" />
            <span>Pune, India · Global Cybersecurity Leader</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="mb-6 bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          Security Testing
          <br />
          <span className="bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text">
            Before Breaches Happen
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="mb-12 text-xl leading-relaxed text-gray-300 sm:text-2xl lg:text-3xl"
        >
          Offensive security testing and proactive defense strategies
          <br />
          <span className="font-semibold text-white">for enterprises that cannot afford compromise</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/login">
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className="group h-14 gap-2 px-8 text-base shadow-2xl shadow-primary/30"
              >
                Get Started
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </Link>
          
          <Link href="#contact">
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 gap-2 border-white/20 bg-white/5 px-8 text-base text-white backdrop-blur-md hover:bg-white/10"
              >
                <Play className="h-5 w-5" />
                Contact Us
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60"
        >
          <div className="text-sm text-gray-400">
            <span className="font-semibold text-white">Penetration</span> Testing
          </div>
          <div className="h-4 w-px bg-gray-600" />
          <div className="text-sm text-gray-400">
            <span className="font-semibold text-white">Cloud</span> Security
          </div>
          <div className="h-4 w-px bg-gray-600" />
          <div className="text-sm text-gray-400">
            <span className="font-semibold text-white">24/7</span> Support
          </div>
        </motion.div>
      </motion.div>

      {/* Floating particles effect (subtle, GPU-optimized) */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={shouldReduceMotion ? {} : {
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
