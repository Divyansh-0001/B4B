"use client";

import { cn } from "@/lib/utils";
import {
  Shield,
  Target,
  Cloud,
  Lock,
  Eye,
  Zap,
  Users,
  FileCheck,
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Penetration Testing",
      description:
        "Comprehensive security assessments across web, cloud, mobile, and network infrastructure.",
      icon: <Target />,
    },
    {
      title: "Cloud Security",
      description:
        "Multi-cloud security posture management with configuration review and compliance validation.",
      icon: <Cloud />,
    },
    {
      title: "Threat Intelligence",
      description:
        "Real-time threat detection and analysis powered by advanced security monitoring.",
      icon: <Eye />,
    },
    {
      title: "SCADA/OT Security",
      description: "Industrial control system testing for critical infrastructure protection.",
      icon: <Zap />,
    },
    {
      title: "Security Engineering",
      description: "Zero-trust architecture design and secure infrastructure implementation.",
      icon: <Lock />,
    },
    {
      title: "Incident Response",
      description:
        "24/7 rapid response services with forensic analysis and containment strategies.",
      icon: <Shield />,
    },
    {
      title: "Compliance Audits",
      description:
        "Regulatory compliance assessments aligned with industry standards and frameworks.",
      icon: <FileCheck />,
    },
    {
      title: "Security Consulting",
      description: "Strategic security advisory for enterprise and government organizations.",
      icon: <Users />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-border",
        (index === 0 || index === 4) && "lg:border-l border-border",
        index < 4 && "lg:border-b border-border"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-primary">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-muted group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
