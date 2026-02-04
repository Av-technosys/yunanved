"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useUpdateQuery = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateQuery = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return updateQuery;
};
