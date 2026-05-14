"use server";
import { contact } from "@/db";
import { db } from "@/lib/db";
import { paginate } from "@/lib/pagination";
import { and, desc, eq, or, sql } from "drizzle-orm";

export async function sendContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    await db.insert(contact).values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });
    return { success: true, message: "Message sent successfully" };
  } catch (error) {
    return { success: false, message: "Failed to send message" };
  }
}

export const fetchContactMessages = async ({
  page = 1,
  pageSize = 3,
  search = "",
}) => {
  const filters = [];

if (search && search.trim() !== "") {
  filters.push(
    or(
      sql`${contact.name} ILIKE ${`%${search}%`}`,
      sql`${contact.email} ILIKE ${`%${search}%`}`
    )
  );
}

  const whereClause = filters.length ? and(...filters) : undefined;

  return paginate({
    table: contact,
    page,
    pageSize,
    where: whereClause,
    orderBy: desc(contact.createdAt),
  });
};