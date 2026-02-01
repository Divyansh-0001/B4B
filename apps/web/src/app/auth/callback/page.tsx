"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { PageHero } from "@/components/page-hero";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Processing sign-in...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("be4breach_token", token);
      const storedRole =
        sessionStorage.getItem("be4breach_role") ||
        localStorage.getItem("be4breach_role") ||
        "user";
      const safeRole = ["admin", "client", "user"].includes(storedRole)
        ? storedRole
        : "user";
      localStorage.setItem("be4breach_role", safeRole);
      sessionStorage.removeItem("be4breach_role");
      setStatus("Sign-in complete. Redirecting...");
      router.replace(`/dashboard/${safeRole}`);
    } else {
      setStatus("We could not complete sign-in. Please try again.");
    }
  }, [searchParams, router]);

  return (
    <div>
      <PageHero
        title="Sign-in status"
        subtitle="Securely completing your Be4Breach session."
      />
      <section className="section">
        <div className="container-wide">
          <p className="card text-steel">{status}</p>
        </div>
      </section>
    </div>
  );
}
