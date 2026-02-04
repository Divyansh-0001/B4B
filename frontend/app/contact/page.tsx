"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, P, Lead, Muted } from "@/components/ui/typography";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/api/v1/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to submit inquiry");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      if (error instanceof Error) {
        if (error.message.includes("429")) {
          setErrorMessage("Too many submissions. Please try again later.");
        } else {
          setErrorMessage("Unable to submit your inquiry. Please try again or contact us directly.");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageLayout>
      {/* Header */}
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <H1 className="mb-6 text-white">Get In Touch</H1>
            <Lead className="text-gray-300">
              Have questions about our services? We&apos;re here to help secure your digital assets
            </Lead>
          </FadeIn>
        </Container>
      </Section>

      {/* Contact Info + Form */}
      <Section>
        <Container size="lg">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <FadeIn>
                <H2 className="mb-6">Contact Information</H2>
                
                <StaggerChildren className="space-y-6">
                  <StaggerItem>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <P className="font-semibold">Office Address</P>
                        <Muted className="mt-1">
                          Greenfield Rd, Amanora Park Town,
                          <br />
                          Hadapsar, Pune,
                          <br />
                          Maharashtra 411028, India
                        </Muted>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <P className="font-semibold">Phone</P>
                        <a 
                          href="tel:+917597285151"
                          className="mt-1 block text-sm text-muted-foreground hover:text-primary"
                        >
                          +91 7597285151
                        </a>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <P className="font-semibold">Email</P>
                        <a 
                          href="mailto:contact@be4breach.com"
                          className="mt-1 block text-sm text-muted-foreground hover:text-primary"
                        >
                          contact@be4breach.com
                        </a>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerChildren>

                <div className="mt-8 rounded-lg border-l-4 border-primary bg-card p-4">
                  <P className="text-sm font-semibold text-primary">Business Hours</P>
                  <Muted className="mt-2 text-sm">
                    Monday - Friday: 9:00 AM - 6:00 PM IST
                    <br />
                    Saturday: 10:00 AM - 2:00 PM IST
                  </Muted>
                </div>
              </FadeIn>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <FadeIn direction="up">
                <AnimatedCard className="border-t-4 border-primary">
                  <AnimatedCard.Header>
                    <H2>Send Us a Message</H2>
                    <Muted>
                      Fill out the form below and we&apos;ll get back to you within 24 hours
                    </Muted>
                  </AnimatedCard.Header>

                  <AnimatedCard.Content>
                    {/* Success Message */}
                    {submitStatus === "success" && (
                      <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                        <div>
                          <P className="font-semibold text-green-700 dark:text-green-400">
                            Message Sent Successfully!
                          </P>
                          <Muted className="mt-1 text-sm">
                            Thank you for contacting us. We&apos;ll respond within 24 hours.
                          </Muted>
                        </div>
                      </div>
                    )}

                    {/* Error Message */}
                    {submitStatus === "error" && (
                      <div className="mb-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/10 p-4">
                        <AlertCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <P className="font-semibold text-primary">
                            Submission Failed
                          </P>
                          <Muted className="mt-1 text-sm">
                            {errorMessage}
                          </Muted>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium">
                            Name <span className="text-primary">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                            placeholder="Your full name"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium">
                            Email <span className="text-primary">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                            placeholder="+91 1234567890"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium">
                            Company
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                            placeholder="Your company name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Subject <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Message <span className="text-primary">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          rows={6}
                          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                          placeholder="Tell us about your security needs..."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full md:w-auto"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </AnimatedCard.Content>
                </AnimatedCard>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Section */}
      <Section className="bg-muted/30">
        <Container size="lg">
          <div className="overflow-hidden rounded-2xl border">
            <div className="aspect-video w-full bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.2837270847373!2d73.93947631489616!3d18.49839638741562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1c6c6c6c6c7%3A0x1234567890abcdef!2sAmanora%20Park%20Town%2C%20Hadapsar%2C%20Pune!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Be4Breach Office Location"
              />
            </div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
