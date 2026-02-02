import RoleRedirect from "../../components/auth/RoleRedirect";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <RoleRedirect />
    </main>
  );
}
