/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { paginate } from "@/lib/pagination";
import { and, or, sql, asc, eq ,desc, inArray  } from "drizzle-orm";
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
export async function createOrder({
  items,
  userId,
  fixedAmount,
  address,
  razorpayPaymentId,
  razorpayOrderId,
}: {
  items: { productId: string; quantity: number }[];
  userId: string;
  fixedAmount: number;
  address: any;
  razorpayPaymentId: string;
  razorpayOrderId: string;
}) {
  try {
    return await db.transaction(async (tx) => {
      if (!items || items.length === 0) {
        throw new Error("Order items are required");
      }

      const productIds = items.map((i) => i.productId);
      const safeAmount = Math.round(Number(fixedAmount));
      const products = await tx
        .select()
        .from(product)
        .where(inArray(product.id, productIds));

      if (products.length !== items.length) {
        throw new Error("Some products not found");
      }

      const productMap = Object.fromEntries(
        products.map((p) => [p.id, p])
      );

       
      const insertedOrder = await tx
        .insert(order)
        .values({
          userId,
          status: "paid",
         totalAmountPaid:safeAmount,

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

      
const orderItemsToInsert = [];

for (const item of items) {
  const p = productMap[item.productId];

  if (!p) {
    throw new Error("Product not found");
  }

  if (
    p.name == null ||
    p.slug == null ||
    p.basePrice == null
  ) {
    throw new Error("Invalid product data");
  }

  orderItemsToInsert.push({
    orderId,
    productId: p.id,
    quantity: item.quantity,
    productName: p.name,       
    productSlug: p.slug,
    productImage: p.bannerImage ?? null,
    productSKU: p.sku ?? null,
    productPrice: p.basePrice,     
  });
}

await tx.insert(orderItem).values(orderItemsToInsert);

      await tx.insert(payment).values({
        orderId,
        paymentId: razorpayPaymentId,
        paymentStatus: "success",
        paymentMethod: "razorpay",
        paymentAmount: safeAmount,
        paymentCurrency: "INR",
        paymentDescription: "Order Payment",
        paymentGatewayOrderId: razorpayOrderId,
      });

      const userCartRecord = await tx.query.userCart.findFirst({
        where: eq(userCart.userId, userId),
      });

      if (userCartRecord) {
        await tx
          .delete(userCartItems)
          .where(eq(userCartItems.cartId, userCartRecord.id));

        await tx
          .delete(userCart)
          .where(eq(userCart.id, userCartRecord.id));
      }

      return {
        success: true,
        orderId,
      };
    });
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
  const orderRows = await db
    .select()
    .from(order)
    .where(eq(order.id, orderId))
    .limit(1);

  if (!orderRows.length) return null;

  const orderData = orderRows[0];

  const items = await db
    .select()
    .from(orderItem)
    .where(eq(orderItem.orderId, orderId));

const productIds = [
  ...new Set(
    items
      .map((item) => item.productId)
      .filter((id): id is string => id !== null)
  ),
];

  const products = productIds.length
    ? await db
        .select()
        .from(product)
        .where(inArray(product.id, productIds))
    : [];

  const productMap = Object.fromEntries(
    products.map((p) => [p.id, p])
  );

  const itemsWithProduct = items.map((item:any) => ({
    ...item,
    product: productMap[item.productId] || null,
  }));

  const paymentRows = await db
    .select()
    .from(payment)
    .where(eq(payment.orderId, orderId))
    .limit(1);

  const paymentData = paymentRows.length ? paymentRows[0] : null;

  return {
    ...orderData,
    items: itemsWithProduct,
    payment: paymentData,
  };
}
