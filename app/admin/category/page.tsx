import CategoryClient from "./categoryClient";
import { getCategoriesPagination } from "@/helper/index";

interface PageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    search?: string;
    category?:string;
  };
}

const PAGE_SIZE = 3

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;


  const result = await getCategoriesPagination({
    page: Number(params.page ?? "1"),
    pageSize: PAGE_SIZE,
    search: params.search ?? "",
    category: params.category ?? undefined,


  });

  return (
    <CategoryClient
      categories={result.items}
      total={result.totalPages}
      currentPage={result.page}
    />
  );
};

export default Page;
