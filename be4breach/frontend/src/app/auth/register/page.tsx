import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  return (
    <div className="bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16">
        <Card className="w-full max-w-md border-border/60">
          <CardHeader className="space-y-3">
            <Badge className="w-fit bg-primary/10 text-primary">
              Request access
            </Badge>
            <CardTitle className="text-2xl">
              Start a Be4Breach evaluation
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Tell us about your security program and we will provision a secure
              sandbox.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" placeholder="Alex Morgan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="Security Operations Lead" />
              </div>
            </div>
            <Button className="w-full" size="lg">
              Submit request
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have access?{" "}
              <Link className="text-primary underline" href="/auth/login">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
