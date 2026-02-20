import React from "react";
import { getCategoriesPagination, getFeaturedCategories } from "@/helper";
import FeaturedCategoryClient from "./featuredCategoryClient";
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
  
  
    const result = await getCategoriesPagination({
      page: Number(params.page ?? "1"),
      pageSize: PAGE_SIZE,
      search: params.search ?? "",
      category: params.category ?? undefined,
  
  
    });
  const featuredCategories = await getFeaturedCategories(); 

  return (
    <>
      <FeaturedCategoryClient featuredCategories={featuredCategories} categories={result.items} total={result.totalPages}
      currentPage={result.page}/>
    </>
  );
};

export default Page;
