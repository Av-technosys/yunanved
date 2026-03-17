"use server";

import { order, orderItem, product, user } from "@/db";
import { db } from "@/lib/db";
import { eq, or, sql } from "drizzle-orm";

export async function getOrderDetailsById(id: string) {
  try {
    const rows = await db.execute(sql`
SELECT 
  o.*,

  json_build_object(
    'code', ct.code,
    'isDiscountPercentage', ct.is_discount_percentage,
    'discountPercentage', ct.discount_percentage,
    'discountFixedAmount', ct.discount_fixed_amount
  ) AS coupon,

  json_agg(
    json_build_object(
      'productName', oi.product_name,
      'productSlug', oi.product_slug,
      'productImage', oi.product_image,
      'productPrice', oi.product_price,
      'productSKU', oi.product_sku,
      'quantity', oi.quantity
    )
  ) AS items

FROM "order" o

LEFT JOIN order_item oi 
ON oi.order_id = o.id

LEFT JOIN coupon_transaction ct
ON ct.id = o.coupon_transaction_id

WHERE o.id = ${id}

GROUP BY o.id, ct.id
`);

    return rows[0];
  } catch (error) {
    return null;
  }
}

