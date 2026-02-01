import dynamic from "next/dynamic";

import CTA from "@/components/sections/cta";
import ComplianceStrip from "@/components/sections/compliance-strip";
import EnterprisePanel from "@/components/sections/enterprise-panel";
import Hero from "@/components/sections/hero";
import Highlights from "@/components/sections/highlights";
import SectionSkeleton from "@/components/sections/section-skeleton";

const ServicesPreview = dynamic(() => import("@/components/sections/services-preview"), {
  loading: () => <SectionSkeleton title="Services" />,
});

export default function HomePage() {
  return (
    <div className="relative z-10">
      <Hero />
      <div className="section-shell mt-14">
        <div className="glow-divider" />
      </div>
      <Highlights />
      <ServicesPreview />
      <EnterprisePanel />
      <div className="section-shell mt-14">
        <div className="glow-divider" />
      </div>
      <ComplianceStrip />
      <CTA />
    </div>
  );
}
