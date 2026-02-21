"use server";

import { paginate } from "@/lib/pagination";
import { and, or, sql, asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { order, orderItem, payment } from "@/db/orderSchema";
import { user } from "@/db/userSchema";
import { product } from "@/db/productSchema";
import { revalidatePath } from "next/cache";
import { userCart, userCartItems } from "@/db/schema";

export const fetchOrders = async ({
  page = 1,
  pageSize = 3,
  search = "",
  status = "",
}) => {
  const filters = [];

  if (search && search.trim() !== "") {
    filters.push(or(sql`${order.id}::text ILIKE ${`%${search}%`}`));
  }

  if (status && status.trim() !== "") {
    filters.push(eq(order.status, status));
  }

  const whereClause = filters.length ? and(...filters) : undefined;

  return paginate({
    table: order,
    page,
    pageSize,
    where: whereClause,
    orderBy: asc(order.createdAt),
  });
};

export const fetchOrderDetails = async (orderId: string) => {
  try {
    const orderInfo = await db
      .select({
        order,
        user,
        payment,
      })
      .from(order)
      .leftJoin(user, eq(order.userId, user.id))
      .leftJoin(payment, eq(payment.orderId, order.id))
      .where(eq(order.id, orderId))
      .limit(1);

    if (!orderInfo.length) return null;

    const rawItems = await db
      .select({
        item: orderItem,
        product: product,
      })
      .from(orderItem)
      .leftJoin(product, eq(orderItem.productId, product.id))
      .where(eq(orderItem.orderId, orderId));

    const items = rawItems.map((row) => ({
      ...row.item,
      product: row.product,
    }));

    return {
      ...orderInfo[0],
      items,
    };
  } catch (error) {
    console.error("fetchOrderDetails error:", error);
    throw new Error("Failed to fetch order details");
  }
};

export const changeOrderStatus = async (id: string, status: string) => {
  const result = await db
    .update(order)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(order.id, id))
    .returning();

  return result[0];
};

export async function updateOrderStatus(id: string, status: string | any) {
  await changeOrderStatus(id, status);
  revalidatePath("/admin/orders");
}

export async function createOrder(
  data: any,
  userId: string,
  fixedAmount: number,
) {
  try {
    await db.transaction(async (tx) => {
      if (!data || data.length === 0) {
        throw new Error("Order items are required");
      }
      const orderResult = await tx
        .insert(order)
        .values({
          userId,
          totalAmountPaid: fixedAmount,
          status: "pending",
        })
        .returning({ id: order.id });

      const orderId = orderResult[0].id;
     
      await tx.insert(orderItem).values(
        data.map((item: any) => ({
          orderId,
          productId: item.productId,
          quantity: item.quantity,
          productName: item.title,
          productSlug: item.slug,
          productImage: item.image,
          productSKU: item.sku,
          productPrice: item.price,
        })),
      );

      const userCartRecord = await tx.query.userCart.findFirst({
        where: eq(userCart.userId, userId),
      });

      if (userCartRecord) {
        await tx
          .delete(userCartItems)
          .where(eq(userCartItems.cartId, userCartRecord.id));

        await tx.delete(userCart).where(eq(userCart.id, userCartRecord.id));
      }
    });
    return { success: true, message: "Order created successfully" };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, message: "Failed to create order" };
  }
}
