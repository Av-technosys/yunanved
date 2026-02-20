import React from "react";
import FeaturedProductClient from "./featuredProductClient";
import { getFeaturedProducts, getProducts } from "@/helper";
import { pageSize } from "@/const/globalconst";

interface PageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    search?: string;
    category?:string;
  };
}
const PAGE_SIZE = pageSize
const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  
   const result = await getProducts({
      page: Number(params.page ?? "1"),
      pageSize: Number(PAGE_SIZE),
      search: params.search ?? "",
      category: params.category,
    });

  const featuredProducts = await getFeaturedProducts(); 
  return (
    <>
      <FeaturedProductClient featuredProducts={featuredProducts} products={result.items} total={result.totalPages} currentPage={result.page} />
    </>
  );
};

export default Page;
