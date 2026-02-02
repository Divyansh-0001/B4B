"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Role = "admin" | "client" | "user";

export default function RoleRedirect() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [message, setMessage] = useState("Checking session...");

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        const response = await fetch("/api/v1/protected/me", {
          credentials: "include"
        });
        if (!response.ok) {
          router.replace("/login");
          return;
        }
        const data = (await response.json()) as { role: Role };
        const role = data?.role ?? "user";
        if (mounted) {
          setMessage("Redirecting...");
        }
        router.replace(`/dashboard/${role}`);
      } catch (error) {
        router.replace("/login");
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (reduceMotion) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        {message}
      </div>
    );
  }

  return (
    <motion.div
      className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {message}
    </motion.div>
  );
}
