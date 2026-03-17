import { Skeleton } from "@/components/ui";

export const AddressListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">

      {/* Address Card Skeleton */}
      {[1,2,3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4"
        >
          {/* Title */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-5 w-36" />
          </div>

          {/* Address lines */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />

          {/* Divider */}
          <Skeleton className="h-[1px] w-full" />

          {/* Action buttons */}
          <div className="flex justify-end gap-3">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>
        </div>
      ))}

     
    </div>
  );
};