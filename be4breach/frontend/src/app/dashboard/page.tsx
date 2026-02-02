import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, DatabaseZap, Radar } from "lucide-react";

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

export default function DashboardPage() {
  return (
    <div className="bg-background">
      <section className="mx-auto w-full max-w-6xl space-y-6 px-6 py-16">
        <Badge className="w-fit bg-primary/10 text-primary">
          Security console
        </Badge>
        <h1 className="text-4xl font-semibold text-foreground">
          Welcome to your Be4Breach command center.
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          This workspace consolidates your most urgent security signals. Connect
          identity, endpoint, and cloud systems to unlock full response
          automation.
        </p>
      </section>

      <Separator className="mx-auto w-full max-w-6xl" />

      <section className="mx-auto w-full max-w-6xl space-y-6 px-6 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {statusCards.map((card) => (
            <Card key={card.title} className="border-border/60">
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
      </section>
    </div>
  );
}
