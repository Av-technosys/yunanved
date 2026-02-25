/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
  boolean,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";

export const product = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // timestamp
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  }
);

export const productVariant = pgTable("product_variant", {
  // about product
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name"),
  sku: varchar("sku").notNull().unique(),
  productId: uuid("product_id").references(() => product.id),
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
  isFreeDelivery: boolean("is_free_delivery").notNull().default(false),

  // timestamp
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
},
  (table) => [
    index("name_idx").on(table.name),
    index("slug_idx").on(table.slug),
  ]
);

export const category: any = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  slug: varchar("slug").unique().notNull(),
  bannerImage: varchar("banner_image"),
  parentId: uuid("parent_id").references(() => category.id),
  parentCount: integer("parent_count").notNull().default(0),
  description: varchar("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const productCategory = pgTable("product_category", {
  productId: uuid("product_id").notNull().references(() => product.id),
  categoryId: uuid("category_id").notNull().references(() => category.id),
}, (table) => ({
  pk: primaryKey({ columns: [table.productId, table.categoryId] }),
}));



export const productVarientMedia = pgTable("product_varient_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  productVarientId: uuid("product_varient_id").notNull().references(() => productVariant.id),
  mediaType: varchar("media_type").notNull(),
  mediaURL: varchar("media_url").notNull(),
});

export const productVarientAttribute = pgTable("product_varient_attribute", {
  id: uuid("id").primaryKey().defaultRandom(),
  productVarientId: uuid("product_varient_id").notNull().references(() => productVariant.id),
  attribute: varchar("attribute").notNull(),
  value: varchar("value").notNull(),
});

export const featuredProductVarient = pgTable("featured_product_varient", {
  id: uuid("id").primaryKey().defaultRandom(),
  productVarientId: uuid("product_varient_id").notNull().references(() => productVariant.id),
});

export const featuredCategory = pgTable("featured_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id").references(() => category.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// export const featuredBanner = pgTable("featured_banner", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   categoryId: uuid("category_id").references(() => category.id),
//   mediaURL: varchar("media_url").notNull(),
//   slug: varchar("slug").unique().notNull(),
//   productId: uuid("product_id").references(() => product.id),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });