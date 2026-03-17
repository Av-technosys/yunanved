import { Skeleton } from "../ui";

export default function HomeCategorySkleton() {
    return (
        <div className="flex gap-4">
            <Skeleton className=" size-32 rounded-full" />
            <Skeleton className=" size-32 rounded-full" />
            <Skeleton className=" size-32 rounded-full" />
            <Skeleton className=" size-32 rounded-full" />
        </div>
    );
}