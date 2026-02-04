"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm"
        >
          <Shield className="h-4 w-4" />
          <span>Enterprise Security Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Be4Breach Platform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12 text-xl text-gray-300 sm:text-2xl"
        >
          Advanced security monitoring with role-based access control,
          <br />
          OAuth2 authentication, and real-time threat detection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" className="group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" className="border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
            Learn More
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-24 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3"
      >
        <FeatureCard
          icon={<Lock className="h-8 w-8" />}
          title="JWT Authentication"
          description="Secure token-based authentication with OAuth2 SSO support"
        />
        <FeatureCard
          icon={<Users className="h-8 w-8" />}
          title="Role-Based Access"
          description="Granular permissions for Admin, Client, and User roles"
        />
        <FeatureCard
          icon={<Shield className="h-8 w-8" />}
          title="Real-Time Security"
          description="Monitor and respond to threats in real-time"
        />
      </motion.div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-lg bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
