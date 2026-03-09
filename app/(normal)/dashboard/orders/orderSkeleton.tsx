import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const OrdersSkeleton = () => {
  return (
    <div className="w-full animate-pulse">

      {/* Filter Section */}
      <Card className="rounded-[24px] border-none bg-white shadow-sm p-6 mb-6 space-y-6">

        {/* Search + Date */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          <div className="w-full md:w-72 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>

      </Card>

      {/* Empty State Card */}
      <Card className="rounded-2xl border border-gray-100 shadow-sm p-10 flex flex-col items-center gap-4">

        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-4 w-64" />

      </Card>
    </div>
  );
};