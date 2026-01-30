import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { coupon, couponTransaction, user } from "./userSchema";
import { product } from "./productSchema";
import { relations } from "drizzle-orm";

// ----------------------
// Orders Table
// ----------------------
export const order = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  status: varchar("status").notNull().default("pending"),

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
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id),
  quantity: integer("quantity").notNull(),
  productName: varchar("product_name").notNull(),
  productSlug: varchar("product_slug").notNull(),
  productImage: varchar("product_image").notNull(),
  productPrice: integer("product_price").notNull(),
  productSKU: varchar("product_sku").notNull(),
});

export const payment = pgTable("payment", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id),
  paymentId: varchar("payment_id").notNull(),
  paymentStatus: varchar("payment_status").notNull(),
  paymentMethod: varchar("payment_method").notNull(),
  paymentAmount: integer("payment_amount").notNull(),
  paymentCurrency: varchar("payment_currency").notNull(),
  paymentDescription: varchar("payment_description").notNull(),
  paymentMetadata: varchar("payment_metadata").notNull(),
  paymentGatewayOrderId: varchar("payment_gateway_order_id").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
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
