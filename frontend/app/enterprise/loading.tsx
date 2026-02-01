import { Skeleton } from "@/components/ui/skeleton";

export default function EnterpriseLoading() {
  return (
    <div className="section-shell py-16">
      <Skeleton className="h-8 w-1/3" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28 w-full" />
        ))}
      </div>
    </div>
  );
}
