/* eslint-disable @typescript-eslint/no-explicit-any */
import ReturnClient from "./ReturnRequestClient";
import { fetchReturnRequests } from "@/helper";

export default async function Page({ searchParams }: any) {
  const params = await searchParams;
  const page = Number(params.page || 1);

  const result = await fetchReturnRequests({
    page,
    pageSize: 10,
  });

  return (
    <ReturnClient
      data={result.data}
      total={result.meta.totalPages}
      currentPage={result.meta.page}
    />
  );
}