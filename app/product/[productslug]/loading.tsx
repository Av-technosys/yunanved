"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT SIDE - Thumbnail Images */}
                <div className="hidden lg:flex lg:col-span-1 flex-col gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="w-20 h-20 rounded-md"
                        />
                    ))}
                </div>

                {/* CENTER - Main Image */}
                <div className="lg:col-span-6">
                    <Skeleton className="w-full h-[500px] rounded-xl" />
                </div>

                {/* RIGHT SIDE - Product Details */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Title */}
                    <div className="space-y-3">
                        <Skeleton className="h-8 w-3/4 rounded-md" />
                        <Skeleton className="h-4 w-1/4 rounded-md" />
                    </div>

                    {/* Price */}
                    <Skeleton className="h-8 w-32 rounded-md" />

                    {/* Description */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-4/5 rounded-md" />
                    </div>

                    {/* Quantity Section */}
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-24 rounded-md" />
                        <div className="flex gap-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="h-10 w-16 rounded-lg"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <Skeleton className="h-12 w-40 rounded-full" />
                        <Skeleton className="h-12 w-40 rounded-full" />
                    </div>

                    {/* Delivery Box */}
                    <div className="space-y-4 border rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-4 w-40 rounded-md" />
                        </div>

                        <div className="flex items-center gap-3">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-4 w-48 rounded-md" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}