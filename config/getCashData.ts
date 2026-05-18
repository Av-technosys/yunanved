import { unstable_cache } from "next/cache";

export default async function getCashedData(fn: () => any, tags: string[]) {
    return unstable_cache(fn, tags, {
        tags,
        revalidate: 60 * 60 * 2,
    })();
}