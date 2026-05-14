import { fetchContactMessages } from "@/helper/contact-us/action";
import ContactMessagesClient from "./ContactRequest";
import { pageSize } from "@/const/globalconst";

interface PageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    search?: string;
  };
}

export type ContactMessage = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  message: string | null;
  createdAt: Date | string;
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

  const result = await fetchContactMessages({
    page,
    pageSize: pageSizeParam,
    search,
  });

  return (
    <ContactMessagesClient
      data={result.data as ContactMessage[]}
      total={result.meta.totalPages}
      currentPage={result.meta.page}
      pageSize={result.meta.pageSize}
    />
  );
}
