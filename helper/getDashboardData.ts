
import { db } from "@/lib/db";
import { order, orderItem } from "@/db/orderSchema";
import { user } from "@/db/userSchema";
import { productVariant } from "@/db/productSchema";
import { sql, count, desc, gte } from "drizzle-orm";

export const getDashboardData = async () => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0,0,0,0);
  const [
    totalUsers,
    totalProducts,
    totalOrders,
    revenue,
    orderStatusCounts,
    recentOrders
  ] = await Promise.all([

    db.select({ count: count() }).from(user),

    db.select({ count: count() }).from(productVariant),

      db.select({ count: count() })
      .from(order)
      .where(gte(order.createdAt, startOfMonth)),

      db.select({
      revenue: sql<number>`COALESCE(SUM(${order.totalAmountPaid}),0)`
    })
      .from(order)
      .where(gte(order.createdAt, startOfMonth)),


    // order status counts
    db.select({
      status: order.status,
      count: count()
    })
    .from(order)
    .groupBy(order.status),

    // recent orders
    db.select({
      id: order.id,
      customer: sql<string>`CONCAT(${user.first_name}, ' ', ${user.last_name})`,
      total: order.totalAmountPaid,
      status: order.status,
      items: sql<number>`COUNT(${orderItem.id})`
    })
    .from(order)
    .leftJoin(user, sql`${user.id} = ${order.userId}`)
    .leftJoin(orderItem, sql`${orderItem.orderId} = ${order.id}`)
    .groupBy(order.id, user.first_name, user.last_name)
    .orderBy(desc(order.createdAt))
    .limit(6)
  ]);

  return {
    stats: {
      totalUsers: totalUsers[0].count,
      totalProducts: totalProducts[0].count,
      totalOrders: totalOrders[0].count,
      totalRevenue: revenue[0].revenue
    },

    orderStatus: orderStatusCounts,

    recentOrders
  };
};