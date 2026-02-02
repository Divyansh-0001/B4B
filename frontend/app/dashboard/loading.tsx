export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="layout-container ds-section">
        <div className="ds-card animate-pulse space-y-4">
          <div className="h-3 w-20 rounded bg-muted" />
          <div className="h-7 w-1/2 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
