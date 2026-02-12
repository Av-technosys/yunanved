/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";

import CategoryClient from "./categoryClient";
import { category } from "@/db/productSchema";
import { and, asc, ilike, sql } from "drizzle-orm";

interface PageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    search?: string;
  };
}

const PAGE_SIZE = 3;

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const pageSize = Number(params.page_size ?? PAGE_SIZE);
  const text = params.search ?? "";

  const filters = [];

  if (text && text.trim() !== "") {
    filters.push(ilike(category.name, `%${text}%`));
  }
  const whereClause = filters.length > 0 ? and(...filters) : undefined;
  const offset = (page - 1) * pageSize;

  const categories = await db
    .select()
    .from(category)
    .orderBy(asc(category.createdAt))
    .limit(PAGE_SIZE)
    .offset(offset)
    .where(whereClause);

  const totalCategories = await db
    .select({
      count: sql`count(*)`,
    })
    .from(category)
    .where(whereClause);

  const totalPages = Math.ceil((totalCategories[0].count as any) / PAGE_SIZE);

  return (
    <CategoryClient
      categories={categories}
      total={totalPages}
      currentPage={page}
    />
  );
};

export default Page;
