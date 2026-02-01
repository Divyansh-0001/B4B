import { Suspense } from "react";

import { PageHero } from "@/components/page-hero";
import { AuthCallbackContent } from "@/app/auth/callback/callback-client";

export default function AuthCallbackPage() {
  return (
    <div>
      <PageHero
        title="Sign-in status"
        subtitle="Securely completing your Be4Breach session."
      />
      <section className="section">
        <div className="container-wide">
          <Suspense fallback={<p className="card text-steel">Processing sign-in...</p>}>
            <AuthCallbackContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
