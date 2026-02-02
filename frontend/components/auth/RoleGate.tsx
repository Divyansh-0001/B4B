"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Role = "admin" | "client" | "user";

type RoleGateProps = {
  requiredRole: Role;
  children: React.ReactNode;
};

export default function RoleGate({ requiredRole, children }: RoleGateProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

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
        if (!data?.role) {
          router.replace("/login");
          return;
        }
        if (data.role !== requiredRole) {
          router.replace(`/dashboard/${data.role}`);
          return;
        }
        if (mounted) {
          setReady(true);
        }
      } catch (error) {
        router.replace("/login");
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [requiredRole, router]);

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Validating access...
      </div>
    );
  }

  if (reduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
