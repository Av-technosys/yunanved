import ProductClient from "./productClient";
import { getProducts } from "@/helper/index";

interface PageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    search?: string;
    category?: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const result = await getProducts({
    page: Number(params.page ?? "1"),
    pageSize: Number(params.page_size ?? "3"),
    search: params.search ?? "",
    category: params.category,
  });

  return (
    <ProductClient
      products={result.items}
      total={result.totalPages}
      currentPage={result.page}
    />
  );
};


export default Page;
