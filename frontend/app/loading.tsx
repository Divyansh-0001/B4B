export default function RootLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="layout-container ds-section">
        <div className="ds-card animate-pulse space-y-4">
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="h-8 w-2/3 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
