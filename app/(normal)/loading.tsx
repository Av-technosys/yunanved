import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">

            {/* Hero Banner */}
            <Skeleton className="w-full h-[280px] rounded-2xl" />

            {/* Promo Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="rounded-xl p-6 border space-y-4 h-48 flex flex-col justify-between"
                    >
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-32" />
                        </div>

                        <Skeleton className="h-10 w-28 rounded-lg" />

                        <Skeleton className="absolute right-6 bottom-6 h-16 w-16 rounded-lg opacity-40" />
                    </div>
                ))}
            </div>

            {/* Feature Icons Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-3 border-t">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />

                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Categories Title */}
            <div className="flex justify-center">
                <Skeleton className="h-8 w-64" />
            </div>

            {/* Categories Row */}
            <div className="flex gap-6 overflow-hidden justify-center">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="flex flex-col items-center gap-3">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                ))}
            </div>

        </div>
    )
}