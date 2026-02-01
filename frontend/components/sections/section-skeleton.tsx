import { Skeleton } from "@/components/ui/skeleton";

export default function SectionSkeleton({ title }: { title: string }) {
  return (
    <section className="py-20">
      <div className="section-shell space-y-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">{title}</p>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-2/3" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-40 w-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
