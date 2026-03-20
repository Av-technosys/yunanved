/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { paginate } from "@/lib/pagination";
import { and, or, sql, asc, eq, desc, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { cancelRequest, order, orderItem, payment, returnRequest, returnRequestImage } from "@/db/orderSchema";
import { user } from "@/db/userSchema";
import { revalidatePath } from "next/cache";
import { cart, cartItem, productVariant, product } from "@/db";
import { getServerSideUser } from "@/hooks/getServerSideUser";
type CancelStatus = "pending" | "approved" | "rejected" | "refunded";

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
    orderBy: desc(order.createdAt),
  });
};

export const fetchOrderDetails = async (orderId: string) => {
  if (!orderId) {
    return {
      error: "order ID not provided. Unable to fetch order details.",
    };
  }
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
      .leftJoin(
        productVariant,
        eq(orderItem.productVarientId, productVariant.id),
      )
      .where(eq(orderItem.orderId, orderId));

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
  couponTransactionId,
}: {
  items: { productVarientId: string; quantity: number }[];
  userId: string;
  fixedAmount: number;
  address: any;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  couponTransactionId?: string | null;

}) {
  try {
    if (!items || items.length === 0) {
      throw new Error("Order items are required");
    }

    const productIds = items.map(
      (i) => (i as any).productVarientId || (i as any).productId,
    );

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
          couponTransactionId: couponTransactionId ?? null,
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
        const variantId =
          (item as any).productVarientId || (item as any).productId;
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
      await db.delete(cartItem).where(eq(cartItem.cartId, cartRes.id));

      await db.delete(cart).where(eq(cart.id, cartRes.id));
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
  if (!userId) {
    return {
      error: "User ID not provided. Unable to fetch profile.",
    };
  }

  const orders = await db
    .select()
    .from(order)
    .where(eq(order.userId, userId))
    .orderBy(desc(order.createdAt));

  return orders;
}

export async function getOrderById(orderId: string) {
  if (!orderId) {
    return {
      error: "order ID not provided. Unable to fetch order details.",
    };
  }

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

  const cancelReq = await db
    .select()
    .from(cancelRequest)
    .where(eq(cancelRequest.orderId, orderId))
    .limit(1);


  if (!rows.length) return null;

  const orderData = rows[0].order;
  const cancelData = cancelReq[0] ?? null;
  const orderItemIds = rows
    .filter((r) => r.item)
    .map((r) => r.item!.id);

  const returnRequests = await db
    .select()
    .from(returnRequest)
    .where(inArray(returnRequest.orderItemId, orderItemIds));

  const items = rows
    .filter((r) => r.item)
    .map((r) => {
      const variant = r.productVariant;

      let canReturn = false;
      let returnDaysLeft = 0;

      if (variant?.isReturnable && orderData.status === "delivered") {
        const deliveredAt = new Date(orderData.updatedAt);
        const now = new Date();

        const daysPassed =
          (now.getTime() - deliveredAt.getTime()) /
          (1000 * 60 * 60 * 24);

        returnDaysLeft = Math.max(
          0,
          variant.returnDays - Math.floor(daysPassed)
        );

        canReturn = returnDaysLeft > 0;
      }

      const itemReturn = returnRequests.find(
        (rr) => rr.orderItemId === r.item!.id
      );

      return {
        ...r.item,
        productVariant: variant ?? null,
        canReturn,
        returnDaysLeft,
        returnRequest: itemReturn || null,
      };
    });
  const paymentData = rows[0].payment ?? null;

  const canCancel = items.every((i) => i.productVariant?.isCancelable);

  return {
    ...orderData,
    items,
    payment: paymentData,
    canCancel,
    cancelRequest: cancelData,
  };
}




export async function createCancelRequest(orderId: string, reason: string) {

  const user = await getServerSideUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // check existing cancel request
  const existingRequest = await db.query.cancelRequest.findFirst({
    where: eq(cancelRequest.orderId, orderId),
  });

  if (existingRequest) {
    return {
      success: false,
      error: "Cancellation request already submitted. Please wait for admin approval.",
    };
  }

  await db.insert(cancelRequest).values({
    orderId,
    userId: user.id,
    userReason: reason,
  });

  return {
    success: true,
  };
}

export const getCancelRequests = async ({
  page = 1,
  pageSize = 10,
  search = "",
  status = "",
}) => {
  const filters = [];

  if (search) {
    filters.push(
      or(sql`${cancelRequest.orderId}::text ILIKE ${`%${search}%`}`)
    );
  }

  if (status) {
    filters.push(
      eq(cancelRequest.status, status as CancelStatus)
    );
  }

  const whereClause = filters.length ? and(...filters) : undefined;

  const data = await db
    .select({
      cancel: cancelRequest,
      order: order,
      user: user,
    })
    .from(cancelRequest)
    .leftJoin(order, eq(cancelRequest.orderId, order.id))
    .leftJoin(user, eq(cancelRequest.userId, user.id))
    .where(whereClause)
    .orderBy(desc(cancelRequest.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const total = await db
    .select({ count: sql<number>`count(*)` })
    .from(cancelRequest)
    .where(whereClause);

  return {
    data,
    meta: {
      page,
      pageSize,
      totalPages: Math.ceil(Number(total[0].count) / pageSize),
    },
  };
};

export async function updateCancelRequestStatus({
  id,
  status,
  adminReason,
}: {
  id: string;
  status: "approved" | "rejected" | "refunded";
  adminReason?: string;
}) {
  await db
    .update(cancelRequest)
    .set({
      status,
      ...(adminReason && { adminReason }),
    })
    .where(eq(cancelRequest.id, id));
}

export async function createReturnRequest({
  orderItemId,
  reason,
  images,
}: {
  orderItemId: string;
  reason: string;
  images: string[];
}) {
  const user = await getServerSideUser();

  if (!user) throw new Error("Unauthorized");

  const existing = await db.query.returnRequest.findFirst({
    where: eq(returnRequest.orderItemId, orderItemId),
  });

  if (existing) {
    return {
      success: false,
      error: "Return request already exists",
    };
  }

  const [req] = await db
    .insert(returnRequest)
    .values({
      orderItemId,
      userId: user.id,
      reason,
    })
    .returning();


  if (images.length) {
    await db.insert(returnRequestImage).values(
      images.map((img) => ({
        returnRequestId: req.id,
        imageUrl: img,
      }))
    );
  }

  return { success: true };
}
export const fetchReturnRequests = async ({
  page = 1,
  pageSize = 10,
  status = "",
}) => {
  const filters = [];

  if (status) {
    filters.push(eq(returnRequest.status, status as any));
  }

  const whereClause = filters.length ? and(...filters) : undefined;

  const result = await paginate({
    table: returnRequest,
    page,
    pageSize,
    where: whereClause,
    orderBy: desc(returnRequest.createdAt),
  });

  const orderItemIds = result.data.map((r: any) => r.orderItemId);
  const userIds = result.data.map((r: any) => r.userId);

  const items = await db
    .select()
    .from(orderItem)
    .where(inArray(orderItem.id, orderItemIds));

  const users = await db
    .select()
    .from(user)
    .where(inArray(user.id, userIds));

  const images = await db
    .select()
    .from(returnRequestImage)
    .where(
      inArray(
        returnRequestImage.returnRequestId,
        result.data.map((r: any) => r.id)
      )
    );

  const data = result.data.map((req: any) => ({
    return_request: req,
    order_item: items.find((i) => i.id === req.orderItemId),
    user: users.find((u) => u.id === req.userId),
    images: images.filter(
      (img) => img.returnRequestId === req.id
    ),
  }));

  return {
    ...result,
    data,
  };
};

export async function updateReturnRequestStatus({
  id,
  status,
  adminReason,
}: {
  id: string;
  status: "approved" | "rejected" | "refunded";
  adminReason?: string;
}) {
  const updateData: any = {
    status,
    updatedAt: new Date(),
  };


  if (status === "rejected") {
    if (!adminReason) {
      return {
        success: false,
        error: "Reason is required for rejection",
      };
    }

    updateData.adminReason = adminReason;
  }

  await db
    .update(returnRequest)
    .set(updateData)
    .where(eq(returnRequest.id, id));

  return {
    success: true,
  };
}