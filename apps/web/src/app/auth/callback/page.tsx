"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { PageHero } from "@/components/page-hero";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Processing sign-in...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("be4breach_token", token);
      setStatus("Sign-in complete. You can return to the platform.");
    } else {
      setStatus("We could not complete sign-in. Please try again.");
    }
  }, [searchParams]);

  return (
    <div>
      <PageHero
        title="Sign-in status"
        subtitle="Securely completing your Be4Breach session."
      />
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <p className="rounded-3xl border border-frost bg-white p-6 text-base text-steel">
          {status}
        </p>
      </section>
    </div>
  );
}
