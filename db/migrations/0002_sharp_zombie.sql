ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN "product_varient_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_product_varient_id_product_variant_id_fk" FOREIGN KEY ("product_varient_id") REFERENCES "public"."product_variant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_item" DROP COLUMN "product_id";