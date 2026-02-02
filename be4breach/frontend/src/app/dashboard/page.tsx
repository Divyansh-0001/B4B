"use client";

import { AlertTriangle, DatabaseZap, Radar } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AnimatedSection } from "@/components/animated-section";
import { ProtectedRoute } from "@/components/protected-route";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";

const statusCards = [
  {
    title: "Active detections",
    value: "4",
    detail: "Identity anomalies awaiting triage.",
    icon: Radar,
  },
  {
    title: "Escalations",
    value: "2",
    detail: "Pending containment approval.",
    icon: AlertTriangle,
  },
  {
    title: "Telemetry feeds",
    value: "37",
    detail: "Connected data sources streaming.",
    icon: DatabaseZap,
  },
];

const incidentQueue = [
  {
    title: "Impossible travel alert",
    detail: "Executive identity session flagged for travel anomaly.",
    priority: "High",
  },
  {
    title: "Privileged role elevation",
    detail: "Temporary access granted outside policy window.",
    priority: "Medium",
  },
  {
    title: "Suspicious SaaS token",
    detail: "Revoked token linked to inactive contractor.",
    priority: "Medium",
  },
];

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const roleView = searchParams.get("view");
  const derivedRole =
    user?.roles.includes("admin")
      ? "admin"
      : user?.roles.includes("client")
      ? "client"
      : "user";
  const roleLabel =
    roleView === "admin" || roleView === "client" || roleView === "user"
      ? roleView
      : derivedRole;

  const roleDescription =
    {
      admin: "Admin command overview",
      client: "Client security overview",
      user: "User operations overview",
    }[roleLabel] ?? "Role-specific dashboard overview";

  return (
    <ProtectedRoute
      title="Security console access required"
      description="Sign in with your assigned role to access the Be4Breach command center."
    >
      <div className="bg-background">
        <AnimatedSection className="mx-auto w-full max-w-6xl space-y-6 px-6 py-16">
          <Badge className="w-fit bg-primary/10 text-primary">
            Security console
          </Badge>
          <h1>Welcome to your Be4Breach command center.</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            This workspace consolidates your most urgent security signals.
            Connect identity, endpoint, and cloud systems to unlock full
            response automation.
          </p>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-foreground">
              {roleLabel}
            </span>
            <span>{roleDescription}</span>
          </div>
        </AnimatedSection>

        <Separator className="mx-auto w-full max-w-6xl" />

        <AnimatedSection className="mx-auto w-full max-w-6xl space-y-6 px-6 py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {statusCards.map((card) => (
              <Card
                key={card.title}
                className="border-border/60 bg-card/80 hover-lift"
              >
                <CardHeader>
                  <card.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="pt-4 text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-3xl font-semibold text-foreground">
                    {card.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{card.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle className="text-lg">Incident queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              {incidentQueue.map((incident) => (
                <div
                  key={incident.title}
                  className="flex items-start justify-between gap-4 rounded-xl border border-border/60 bg-background/70 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {incident.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {incident.detail}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-primary">
                    {incident.priority}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </ProtectedRoute>
  );
}
