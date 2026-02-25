/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { paginate } from "@/lib/pagination";
import { and, or, sql, asc, eq, desc, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { order, orderItem, payment } from "@/db/orderSchema";
import { user } from "@/db/userSchema";
import { revalidatePath } from "next/cache";
import { cart, cartItem, productVariant, product } from "@/db";

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
        productVariant: productVariant,
      })
      .from(orderItem)
      .leftJoin(productVariant, eq(orderItem.productVarientId, productVariant.id))
      .where(eq(orderItem.orderId, orderId));

    console.log(rawItems)

    const items = rawItems.map((row) => ({
      ...row.item,
      productVariant: row.productVariant,
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
export async function createOrder({
  items,
  userId,
  fixedAmount,
  address,
  razorpayPaymentId,
  razorpayOrderId,
}: {
  items: { productVarientId: string; quantity: number }[];
  userId: string;
  fixedAmount: number;
  address: any;
  razorpayPaymentId: string;
  razorpayOrderId: string;
}) {
  try {
    if (!items || items.length === 0) {
      throw new Error("Order items are required");
    }

    const productIds = items.map((i) => (i as any).productVarientId || (i as any).productId);

    const products = await db
      .select()
      .from(productVariant)
      .where(inArray(productVariant.id, productIds));

    if (products.length !== items.length) {
      throw new Error("Some products not found");
    }

    const productMap = new Map(products.map((p) => [p.id, p]));


    const safeAmount = Math.round(fixedAmount);


    const result = await db.transaction(async (tx) => {
      const insertedOrder = await tx
        .insert(order)
        .values({
          userId,
          status: "paid",
          totalAmountPaid: safeAmount,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          latitude: address.latitude ?? null,
          longitude: address.longitude ?? null,
        })
        .returning({ id: order.id });

      const orderId = insertedOrder[0].id;


      const orderItemsToInsert = items.map((item) => {
        const variantId = (item as any).productVarientId || (item as any).productId;
        const p = productMap.get(variantId);

        if (!p || !p.name || !p.slug || p.basePrice == null) {
          throw new Error("Invalid product data");
        }

        return {
          orderId,
          productVarientId: p.id,
          quantity: item.quantity,
          productName: p.name,
          productSlug: p.slug,
          productImage: p.bannerImage ?? null,
          productSKU: p.sku ?? null,
          productPrice: p.basePrice,
        };
      });

      await Promise.all([
        tx.insert(orderItem).values(orderItemsToInsert),
        tx.insert(payment).values({
          orderId,
          paymentId: razorpayPaymentId,
          paymentStatus: "success",
          paymentMethod: "razorpay",
          paymentAmount: safeAmount,
          paymentCurrency: "INR",
          paymentDescription: "Order Payment",
          paymentGatewayOrderId: razorpayOrderId,
        }),
      ]);

      return { orderId };
    });
    const cartRes = await db.query.cart.findFirst({
      where: eq(cart.userId, userId),
    });

    if (cartRes) {
      await db.delete(cartItem)
        .where(eq(cartItem.cartId, cartRes.id));

      await db.delete(cart)
        .where(eq(cart.id, cartRes.id));
    }
    return {
      success: true,
      orderId: result.orderId,
    };

  } catch (error) {
    console.error("Order creation failed:", error);
    return {
      success: false,
      message: "Failed to create order",
    };
  }
}

export async function getOrdersByUserId(userId: string) {

  const orders = await db
    .select()
    .from(order)
    .where(eq(order.userId, userId))
    .orderBy(desc(order.createdAt));

  return orders;
}



export async function getOrderById(orderId: string) {
  const rows = await db
    .select({
      order: order,
      item: orderItem,
      productVariant: productVariant,
      payment: payment,
    })
    .from(order)
    .leftJoin(orderItem, eq(order.id, orderItem.orderId))
    .leftJoin(productVariant, eq(orderItem.productVarientId, productVariant.id))
    .leftJoin(payment, eq(order.id, payment.orderId))
    .where(eq(order.id, orderId));

  if (!rows.length) return null;
  console.log(rows)

  const orderData = rows[0].order;

  const items = rows
    .filter((r) => r.item)
    .map((r) => ({
      ...r.item,
      productVariant: r.productVariant ?? null,
    }));

  const paymentData = rows[0].payment ?? null;

  return {
    ...orderData,
    items,
    payment: paymentData,
  };
}