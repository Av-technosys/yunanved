ALTER TABLE "product_variant" ADD COLUMN "is_replacement" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ADD COLUMN "return_days" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ADD COLUMN "replacement_days" integer DEFAULT 0 NOT NULL;