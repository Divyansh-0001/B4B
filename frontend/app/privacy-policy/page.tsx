"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { H1, H2, H3, P, Muted } from "@/components/ui/typography";
import { FadeIn } from "@/components/ui/FadeIn";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <Section className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white">
        <Container size="md">
          <FadeIn direction="up" className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-md">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Legal</span>
            </div>
            <H1 className="mb-6 text-white">Privacy Policy</H1>
            <Muted className="text-gray-400">
              Last updated: {new Date().getFullYear()}
            </Muted>
          </FadeIn>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <div>
                <H2 className="mb-4">Introduction</H2>
                <P className="leading-relaxed text-muted-foreground">
                  Be4Breach (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website or use our services.
                </P>
              </div>

              <div>
                <H2 className="mb-4">Information We Collect</H2>
                <H3 className="mb-3 text-lg">Personal Information</H3>
                <P className="mb-4 leading-relaxed text-muted-foreground">
                  We may collect personal information that you voluntarily provide when you:
                </P>
                <ul className="ml-6 space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Register for an account or client portal access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Submit a contact form or inquiry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Subscribe to our newsletter or blog updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Engage with our cybersecurity services</span>
                  </li>
                </ul>
              </div>

              <div>
                <H2 className="mb-4">How We Use Your Information</H2>
                <P className="leading-relaxed text-muted-foreground">
                  We use collected information for the following purposes:
                </P>
                <ul className="ml-6 mt-4 space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Provide, operate, and maintain our cybersecurity services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Process security assessments and generate reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Communicate with you about services, updates, and security alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Improve our services and develop new security solutions</span>
                  </li>
                </ul>
              </div>

              <div>
                <H2 className="mb-4">Data Security</H2>
                <P className="leading-relaxed text-muted-foreground">
                  As a cybersecurity company, we implement industry-leading security measures to protect your data. 
                  We use encryption, access controls, secure authentication, and regular security audits 
                  to safeguard your information. However, no method of transmission over the internet 
                  is 100% secure, and we cannot guarantee absolute security.
                </P>
              </div>

              <div>
                <H2 className="mb-4">Information Sharing</H2>
                <P className="leading-relaxed text-muted-foreground">
                  We do not sell, trade, or rent your personal information to third parties. 
                  We may share information with trusted service providers who assist us in operating our platform, 
                  conducting business, or servicing you, provided they agree to keep this information confidential.
                </P>
              </div>

              <div>
                <H2 className="mb-4">Your Rights</H2>
                <P className="leading-relaxed text-muted-foreground">
                  You have the right to access, correct, or delete your personal information. 
                  You may also object to or restrict certain processing of your data. 
                  To exercise these rights, please contact us at contact@be4breach.com.
                </P>
              </div>

              <div>
                <H2 className="mb-4">Contact Us</H2>
                <P className="leading-relaxed text-muted-foreground">
                  If you have questions about this Privacy Policy, please contact us at:
                </P>
                <div className="mt-4 rounded-lg border-l-4 border-primary bg-muted/50 p-4">
                  <P className="font-semibold">Be4Breach</P>
                  <P className="mt-2 text-sm text-muted-foreground">
                    Greenfield Rd, Amanora Park Town
                    <br />
                    Hadapsar, Pune, Maharashtra 411028, India
                    <br />
                    Email: contact@be4breach.com
                    <br />
                    Phone: +91 7597285151
                  </P>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
