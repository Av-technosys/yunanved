import { pageSize } from "@/const/globalconst";
import PaymentClient from "./PaymentClient";
import { getPayments } from "@/helper/index";

interface PageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    search?: string;
     status?: string;
  };
}

const PAGE_SIZE = pageSize

function toInt(value: string | undefined, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

const Page = async ({ searchParams }: PageProps) => {
  const params =  await searchParams;

  const page = toInt(params.page, 1);
  const pageSize = toInt(params.page_size, PAGE_SIZE);
  const search = params.search ?? "";
const status = params.status ?? "";

const result = await getPayments({
  page,
  pageSize,
  search,
  status,
});
  return (
<PaymentClient
  payment={result.data}
  total={result.meta.totalPages}
  currentPage={result.meta.page}
  pageSize={result.meta.pageSize}
  status={status}
/>

  );
};

export default Page;
