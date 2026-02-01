"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setStatus("sending");
        window.setTimeout(() => setStatus("sent"), 800);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-white/70">
          Full name
          <input
            required
            name="name"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-lumina-cyan/70"
          />
        </label>
        <label className="space-y-2 text-sm text-white/70">
          Work email
          <input
            required
            type="email"
            name="email"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-lumina-cyan/70"
          />
        </label>
      </div>
      <label className="space-y-2 text-sm text-white/70">
        Organization
        <input
          required
          name="company"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-lumina-cyan/70"
        />
      </label>
      <label className="space-y-2 text-sm text-white/70">
        What do you need secured?
        <textarea
          required
          name="message"
          rows={4}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-lumina-cyan/70"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Securing channel..." : "Request briefing"}
        </Button>
        {status === "sent" && (
          <span className="text-sm text-white/60">
            Request received. Our response team will reach out shortly.
          </span>
        )}
      </div>
    </form>
  );
}
