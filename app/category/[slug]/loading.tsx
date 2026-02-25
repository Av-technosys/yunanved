import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className=" p-6 flex gap-6 w-full max-w-7xl mx-auto">
            <Skeleton className="h-112 w-[250px]" />

            <div className="grid grid-cols-4 gap-6 w-full">

                <Skeleton className="h-52 w-[250px]" />
                <Skeleton className="h-52 w-[250px]" />
                <Skeleton className="h-52 w-[250px]" />
                <Skeleton className="h-52 w-[250px]" />
            </div>

        </div>
    );
}