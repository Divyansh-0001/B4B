import { Skeleton } from "@/components/ui/skeleton";

export default function ActivityStream() {
  return (
    <div className="glass-panel rounded-[28px] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Latest activity</p>
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-white/40">
          Awaiting live feed
        </span>
      </div>
      <p className="mt-4 text-sm text-white/60">
        Live incident updates and operational signals will appear here once connected.
      </p>
      <div className="mt-6 space-y-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
