import { Skeleton } from "@/components/ui"


export const ProfileSkeleton= () => {
  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-14" />
      </div>

      <div className="bg-white rounded-[24px] p-8 shadow-sm border">
        
        {/* Header */}
        <div className="mb-10">
          <Skeleton className="h-6 w-[220px] mb-2" />
          <Skeleton className="h-4 w-[300px]" />
        </div>

        {/* Avatar + Info */}
        <div className="flex items-center gap-8 mb-12">
          <Skeleton className="w-24 h-24 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-5 w-[180px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[120px]" />
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>

        <Skeleton className="h-3 w-[320px] mb-10" />

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Skeleton className="h-12 w-32 rounded-full" />
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}