
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { paginate } from "@/lib/pagination";
import { desc, sql } from "drizzle-orm";
import { payment } from "@/db/orderSchema";

export const getPayments = async ({
  page = 1,
  pageSize = 3,
  search = "",
  status = "",
}) => {
  try {
    const filters = [];

    if (search.trim() !== "") {
      filters.push(
        sql`(
        ${payment.orderId}::text ILIKE ${`%${search}%`}
        OR ${payment.paymentId}::text ILIKE ${`%${search}%`}
        OR ${payment.id}::text ILIKE ${`%${search}%`}
      )`
      );
    }

    if (status.trim() !== "") {
      filters.push(sql`${payment.paymentStatus} ILIKE ${`%${status}%`}`);
    }

    const where =
      filters.length > 0
        ? sql`${sql.join(filters, sql` AND `)}`
        : undefined;

    return await paginate({
      table: payment,
      page,
      pageSize,
      where,
      orderBy: desc(payment.createdAt),
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw new Error("Failed to fetch payments");
  }
};