"use server";

import { subscription } from "@/db";
import { db } from "@/lib/db";
import { paginate } from "@/lib/pagination";
import { desc, eq, ilike } from "drizzle-orm";

export async function subscribeToNewsletter(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    return { success: false, message: "Please enter your email address" };
  }

  try {
    const existingSubscription = await db
      .select({ id: subscription.id })
      .from(subscription)
      .where(eq(subscription.email, normalizedEmail))
      .limit(1);

    if (existingSubscription.length > 0) {
      return {
        success: true,
        message: "You are already subscribed",
        subscribed: true,
      };
    }

    await db.insert(subscription).values({
      email: normalizedEmail,
    });

    return {
      success: true,
      message: "Subscribed successfully",
      subscribed: true,
    };
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return { success: false, message: "Failed to subscribe. Please try again" };
  }
}

export async function fetchNewsletterSubscriptions({
  page = 1,
  pageSize = 3,
  search = "",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  const whereClause = search.trim()
    ? ilike(subscription.email, `%${search.trim()}%`)
    : undefined;

  return paginate({
    table: subscription,
    page,
    pageSize,
    where: whereClause,
    orderBy: desc(subscription.createdAt),
  });
}
