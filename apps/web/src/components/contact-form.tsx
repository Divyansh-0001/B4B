"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { submitContact } from "@/lib/api";

const initialState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      await submitContact({
        name: formState.name,
        email: formState.email,
        company: formState.company || undefined,
        message: formState.message,
      });
      setStatus("success");
      setFormState(initialState);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Full name
          </label>
          <input
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-frost bg-white px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-frost bg-white px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium text-ink">
          Company (optional)
        </label>
        <input
          id="company"
          name="company"
          value={formState.company}
          onChange={handleChange}
          className="w-full rounded-2xl border border-frost bg-white px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full rounded-2xl border border-frost bg-white px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit request"}
      </button>

      {status === "success" && (
        <p className="text-sm text-emerald-600">Thanks! We will reach out shortly.</p>
      )}
      {status === "error" && <p className="text-sm text-red-500">{errorMessage}</p>}
    </form>
  );
}
