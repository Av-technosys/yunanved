ALTER TABLE "contactus" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "featured_product" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "product_category" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "contactus" CASCADE;--> statement-breakpoint
DROP TABLE "featured_product" CASCADE;--> statement-breakpoint
DROP TABLE "product_category" CASCADE;--> statement-breakpoint
ALTER TABLE "order_item" ALTER COLUMN "product_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_image" varchar;