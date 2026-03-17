import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { user } from "./userSchema";
import { productVariant } from "./productSchema";

export const review = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => user.id),
  productVarientId: uuid("product_varient_id").notNull().references(() => productVariant.id),
  name: varchar("name"),
  email: varchar("email"),
  rating: integer("rating").notNull(),
  message: varchar("message"),
  isAdminApproved: boolean("is_admin_approved").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reviewMedia = pgTable("review_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  reviewId: uuid("review_id").notNull().references(() => review.id),
  mediaType: varchar("media_type").notNull(),
  mediaURL: varchar("media_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});