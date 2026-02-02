import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16">
        <Card className="w-full max-w-md border-border/60">
          <CardHeader className="space-y-3">
            <Badge className="w-fit bg-primary/10 text-primary">Sign in</Badge>
            <CardTitle className="text-2xl">
              Access your Be4Breach console
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Secure sign-in for security teams and trusted partners.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
            </div>
            <Button className="w-full" size="lg">
              Sign in
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <Mail className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
            <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-muted/40 p-4 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
              <span>
                By signing in you acknowledge Be4Breach security policies and
                allow telemetry data to be processed for detection and response.
              </span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Need an account?{" "}
              <Link className="text-primary underline" href="/auth/register">
                Request access
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
