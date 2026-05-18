"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useUpdateQuery = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateQuery = useCallback((key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");
    const nextQuery = params.toString();

    if (nextQuery === searchParams.toString()) {
      return;
    }

    router.push(`${pathname}?${nextQuery}`);
  }, [pathname, router, searchParams]);

  return updateQuery;
};
