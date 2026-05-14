ALTER TABLE "product_variant" ADD COLUMN "height" integer;--> statement-breakpoint
ALTER TABLE "product_variant" ADD COLUMN "length" integer;--> statement-breakpoint
ALTER TABLE "product_variant" ADD COLUMN "width" integer;--> statement-breakpoint
ALTER TABLE "product_variant" ADD COLUMN "weight" integer;--> statement-breakpoint
ALTER TABLE "shipping_token" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "shipping_token" ADD COLUMN "first_name" varchar;--> statement-breakpoint
ALTER TABLE "shipping_token" ADD COLUMN "last_name" varchar;--> statement-breakpoint
ALTER TABLE "shipping_token" ADD COLUMN "email" varchar;