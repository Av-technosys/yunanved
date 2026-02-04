import { db } from "@/lib/db";
import OrderClient from "./orderClient";
import { order } from "@/db/orderSchema";
import { and, asc, or, sql } from "drizzle-orm";

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
    filters.push(or(sql`${order.id}::text ILIKE ${`%${text}%`}`));
  }
  const whereClause = filters.length > 0 ? and(...filters) : undefined;
  const offset = (page - 1) * pageSize;

  const orders = await db
    .select()
    .from(order)
    .orderBy(asc(order.createdAt))
    .limit(PAGE_SIZE)
    .offset(offset)
    .where(whereClause);

  const totalOrders = await db
    .select({
      count: sql`count(*)`,
    })
    .from(order)
    .where(whereClause);

  const totalPages = Math.ceil((totalOrders[0].count as any) / PAGE_SIZE);

  return <OrderClient order={orders} total={totalPages} currentPage={page} />;
};

export default Page;
