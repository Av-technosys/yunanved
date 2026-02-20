import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { product } from "./productSchema";

export const user = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name"),
  email: varchar("email").unique().notNull(),
  number: varchar("number"),
  password: varchar("password"),
  profileImage: varchar("profile_image"),
  user_type: varchar("user_type").notNull().default("0"),
  loyaltyPoints: integer("loyalty_points").notNull().default(0),
  //   timestamp
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userAddress = pgTable("user_address", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => user.id),
  addressLine1: varchar("address_line_1"),
  addressLine2: varchar("address_line_2"),
  city: varchar("city"),
  state: varchar("state"),
  pincode: varchar("pincode"),
  latitude: varchar("latitude"),
  longitude: varchar("longitude"),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const coupon = pgTable("coupon", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 20 }).notNull(),
  description: varchar("description", { length: 100 }),
  code: varchar("code", { length: 20 }).notNull().unique(),
  isDiscountPercentage: boolean("is_discount_percentage").notNull().default(false),
  discountPercentage: integer("discount_percentage"),
  discountFixedAmount: integer("discount_fixed_amount"),
  minimumOrderValue: integer("minimum_order_value").notNull().default(0),
  maximumDiscountAmount: integer("maximum_discount_amount").notNull().default(0),
  useOnce: boolean("use_once").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const couponTransaction = pgTable("coupon_transaction", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  couponId: uuid("coupon_id")
    .notNull()
    .references(() => coupon.id),
  code: varchar("code", { length: 20 }).notNull(),
  isDiscountPercentage: boolean("is_discount_percentage").notNull().default(false),
  discountPercentage: integer("discount_percentage"),
  discountFixedAmount: integer("discount_fixed_amount"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const cart = pgTable("cart", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => user.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const cartItem = pgTable("cart_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cart_id").notNull().references(() => cart.id),
  productId: uuid("product_id").notNull().references(() => product.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const contactus = pgTable("contactus", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 20 }).notNull(),
  email: varchar("email").unique().notNull(),
  number: varchar("number"),
  message: varchar("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const newsletter = pgTable("newsletter", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email").unique().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});