import { Skeleton } from "@/components/ui/skeleton"

export default function CartItemSkeleton() {
  return (
    <div className="group">
      <hr className="mb-4" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 gap-4">

        {/* Image + Info */}
        <div className="flex flex-1 items-start gap-4">

          <Skeleton className="h-24 w-24 rounded-lg" />

          <div className="flex flex-col gap-2 w-full">

            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-60" />

            <div className="flex gap-4 mt-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>

          </div>
        </div>

        {/* Quantity buttons */}
        <div className="flex items-center gap-3">

          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />

        </div>

      </div>
    </div>
  )
}