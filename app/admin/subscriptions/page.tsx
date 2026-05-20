import { pageSize } from "@/const/globalconst";
import { fetchNewsletterSubscriptions } from "@/helper";
import SubscriptionsClient from "./SubscriptionsClient";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    page_size?: string;
    search?: string;
  }>;
}

export type NewsletterSubscription = {
  id: string;
  email: string;
  createdAt: Date | string | null;
};

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

  const result = await fetchNewsletterSubscriptions({
    page,
    pageSize: pageSizeParam,
    search,
  });

  return (
    <SubscriptionsClient
      data={result.data as NewsletterSubscription[]}
      total={result.meta.totalPages}
      currentPage={result.meta.page}
      pageSize={result.meta.pageSize}
    />
  );
}
