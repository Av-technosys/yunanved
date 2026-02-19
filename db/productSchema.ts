/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
  boolean,
  index,
} from "drizzle-orm/pg-core";

export const product = pgTable(
  "products",
  {
    // about product
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name"),
    sku: varchar("sku"),


    description: varchar("description"),
    shortDescription: varchar("short_description"),
    basePrice: integer("base_price"),
    strikethroughPrice: integer("strikethrough_price"),
    slug: varchar("slug").unique().notNull(),
    bannerImage: varchar("banner_image"),
    isInStock: boolean("is_in_stock").notNull().default(true),
    isReturnable: boolean("is_returnable").notNull().default(false),
    isCancelable: boolean("is_cancelable").notNull().default(false),
    rating: integer("rating").notNull().default(0),
    reviewCount: integer("review_count").notNull().default(0),

    //   all the filters
    isDeleted: boolean("is_deleted").notNull().default(false),
    isFreeDelivery: boolean("is_free_delivery").notNull().default(false),

    // timestamp
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("name_idx").on(table.name),
    index("slug_idx").on(table.slug),
    index("is_deleted_idx").on(table.isDeleted),
  ]
);

export const category: any = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  slug: varchar("slug").unique().notNull(),
  bannerImage: varchar("banner_image"),
  parrentId: uuid("parent_id").references(() => category.id),
  description: varchar("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const productCategory = pgTable("product_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").notNull().references(() => product.id),
  categoryId: uuid("category_id").notNull().references(() => category.id),
});

export const productMedia = pgTable("product_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").notNull().references(() => product.id),
  mediaType: varchar("media_type").notNull(),
  mediaURL: varchar("media_url").notNull(),
});

export const productAttribute = pgTable("product_attribute", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").notNull().references(() => product.id),
  attribute: varchar("attribute").notNull(),
  value: varchar("value").notNull(),
});

export const featuredProduct = pgTable("featured_product", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").notNull().references(() => product.id),
});

export const featuredItems = pgTable("featured_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id").references(() => category.id),
  productId: uuid("product_id").references(() => product.id),
  isFeaturedProduct: boolean("is_featured_product").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const featuredBanner = pgTable("featured_banner", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id").references(() => category.id),
  isBanner: boolean("is_banner").notNull().default(false),
  mediaURL: varchar("media_url").notNull(),
  slug: varchar("slug").unique().notNull(),
  productId: uuid("product_id").references(() => product.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});