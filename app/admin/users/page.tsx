import { db } from "@/lib/db";
import { product } from "@/db/productSchema";
import { user } from "@/db/userSchema";
import UserClient from "./userClient";
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
    filters.push(ilike(user.name, `%${text}%`));
  }
  const whereClause = filters.length > 0 ? and(...filters) : undefined;
  const offset = (page - 1) * pageSize;

  const users = await db
    .select()
    .from(user)
    .orderBy(asc(user.createdAt))
    .limit(PAGE_SIZE)
    .offset(offset)
    .where(whereClause);

  const totalUsers = await db
    .select({
      count: sql`count(*)`,
    })
    .from(user)
    .where(whereClause);

  const totalPages = Math.ceil((totalUsers[0].count as any) / PAGE_SIZE);
  return <UserClient users={users} total={totalPages} currentPage={page} />;
};

export default Page;
