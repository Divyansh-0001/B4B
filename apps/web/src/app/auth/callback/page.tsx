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
      <section className="section">
        <div className="container-wide">
          <p className="card text-steel">{status}</p>
        </div>
      </section>
    </div>
  );
}
