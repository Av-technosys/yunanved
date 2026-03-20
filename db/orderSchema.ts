import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { couponTransaction, user } from "./userSchema";
import { productVariant } from "./productSchema";
import { text } from "drizzle-orm/pg-core";
import { orderStatusEnum , returnRequestStatusEnum, cancelRequestStatusEnum } from "./enum";
import { ORDER_STATUS } from "@/const";
// ----------------------
// Orders Table
// ----------------------
export const order = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  status: orderStatusEnum("status").default(ORDER_STATUS.PENDING),

  addressLine1: varchar("address_line_1"),
  addressLine2: varchar("address_line_2"),
  city: varchar("city"),
  state: varchar("state"),
  pincode: varchar("pincode"),
  latitude: varchar("latitude"),
  longitude: varchar("longitude"),

  totalAmountPaid: integer("total_amount_paid"),
  couponTransactionId: uuid("coupon_transaction_id").references(() => couponTransaction.id),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ----------------------
// Order Items Table
// ----------------------
export const orderItem = pgTable("order_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id),
  productVarientId: uuid("product_varient_id").references(() => productVariant.id),
  quantity: integer("quantity"),
  productName: varchar("product_name").notNull(),
  productSlug: varchar("product_slug").notNull(),
  productImage: varchar("product_image"),
  productPrice: integer("product_price").notNull(),
  productSKU: varchar("product_sku"),
});

export const payment = pgTable("payment", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id),
  paymentId: varchar("payment_id").notNull(),
  paymentStatus: varchar("payment_status"),
  paymentMethod: varchar("payment_method"),
  paymentAmount: integer("payment_amount"),
  paymentCurrency: varchar("payment_currency"),
  paymentDescription: varchar("payment_description"),
  paymentMetadata: varchar("payment_metadata"),
  paymentGatewayOrderId: varchar("payment_gateway_order_id"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export const cancelRequest = pgTable("cancel_request", {

  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  userReason: text("user_reason"),
  adminReason: text("admin_reason"),
  status: cancelRequestStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export const returnRequest = pgTable("return_request", {
  id: uuid("id").primaryKey().defaultRandom(),

  orderItemId: uuid("order_item_id")
    .notNull()
    .references(() => orderItem.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  reason: text("reason").notNull(),
  adminReason: text("admin_reason"),
  status: returnRequestStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const returnRequestImage = pgTable("return_request_image", {
  id: uuid("id").primaryKey().defaultRandom(),
  returnRequestId: uuid("return_request_id")
    .notNull()
    .references(() => returnRequest.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
// // ----------------------
// // Relations
// // ----------------------
// export const orderRelations = relations(order, ({ many, one }) => ({
//   items: many(orderItem),
//   user: one(user, {
//     fields: [order.userId],
//     references: [user.id],
//   }),
// }));

// export const orderItemRelations = relations(orderItem, ({ one }) => ({
//   order: one(order, {
//     fields: [orderItem.orderId],
//     references: [order.id],
//   }),
//   product: one(product, {
//     fields: [orderItem.productId],
//     references: [product.id],
//   }),
// }));
