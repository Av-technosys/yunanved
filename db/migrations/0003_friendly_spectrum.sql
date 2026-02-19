ALTER TABLE "products" ADD COLUMN "is_in_stock" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "coupon" ADD COLUMN "minimum_order_value" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "coupon" ADD COLUMN "maximum_discount_amount" integer DEFAULT 0 NOT NULL;