import CancelRequestClient from "./CancelRequestClient";
import { getCancelRequests } from "@/helper";
import { pageSize } from "@/const/globalconst";

interface PageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    search?: string;
    status?: string;
  };
}

const PAGE_SIZE = pageSize;

function toInt(value: string | undefined, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default async function Page({ searchParams }: PageProps) {

  const params = await searchParams;

  const page = toInt(params.page, 1);
  const pageSizeParam = toInt(params.page_size, PAGE_SIZE);
  const search = params.search ?? "";
  const status = params.status ?? "";

  const result = await getCancelRequests({
    page,
    pageSize: pageSizeParam,
    search,
    status,
  });

  return (
    <CancelRequestClient
      data={result.data}
      total={result.meta.totalPages}
      currentPage={result.meta.page}
      pageSize={result.meta.pageSize}
      status={status}
    />
  );
}