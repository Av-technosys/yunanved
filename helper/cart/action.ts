"use server";

import { db } from "@/lib/db";
import { cart, cartItem } from "@/db/userSchema";
import { eq, and, sql } from "drizzle-orm";


export async function addProductToUserCart(
  userId: string,
  productId: string,
  quantity: number
) {
  try {
    return await db.transaction(async (tx) => {

      let existingCart = await tx
        .select()
        .from(cart)
        .where(eq(cart.userId, userId))
        .then(r => r[0]);

      if (!existingCart) {
        const created = await tx
          .insert(cart)
          .values({ userId })
          .returning();

        existingCart = created[0];
      }

      //  Locking the cart row if A and B have the same cart, only A will proess and B will wait until A is done. 
      await tx.execute(
        sql`SELECT id FROM cart WHERE id = ${existingCart.id} FOR UPDATE`
      );


      const existingCartItem = await tx
        .select()
        .from(cartItem)
        .where(
          and(
            eq(cartItem.cartId, existingCart.id),
            eq(cartItem.productId, productId)
          )
        )
        .then(r => r[0]);

      if (existingCartItem) {
        await tx
          .update(cartItem)
          .set({
            quantity: sql`${cartItem.quantity} + ${quantity}`,
          })
          .where(eq(cartItem.id, existingCartItem.id));
      } else {
        await tx.insert(cartItem).values({
          cartId: existingCart.id,
          productId,
          quantity,
        });
      }


      return { success: true };
    });
  } catch (err) {
    console.error("❌ Add to cart failed:", err);
    return { success: false };
  }
}
export async function increaseCartItem(
  userId: string,
  productId: string
) {
  const existingCart = await db
    .select()
    .from(cart)
    .where(eq(cart.userId, userId))
    .then(r => r[0]);

  if (!existingCart) return { success: false };

  await db
    .update(cartItem)
    .set({
      quantity: sql`${cartItem.quantity} + 1`
    })
    .where(and(
      eq(cartItem.cartId, existingCart.id),
      eq(cartItem.productId, productId)
    ));

  return { success: true };
}

export async function decreaseCartItem(
  userId: string,
  productId: string
) {
  try {
    const existingCart = await db
      .select({ id: cart.id })
      .from(cart)
      .where(eq(cart.userId, userId))
      .then(r => r[0]);

    if (!existingCart) return { success: false };

    await db
      .update(cartItem)
      .set({
        quantity: sql`${cartItem.quantity} - 1`
      })
      .where(and(
        eq(cartItem.cartId, existingCart.id),
        eq(cartItem.productId, productId),
        sql`${cartItem.quantity} > 1`
      ));

    await db
      .delete(cartItem)
      .where(and(
        eq(cartItem.cartId, existingCart.id),
        eq(cartItem.productId, productId),
        sql`${cartItem.quantity} <= 1`
      ));

    return { success: true };

  } catch (error) {
    console.error("decreaseCartItem failed:", error);
    return { success: false };
  }
}

export async function removeCartItem(
  userId: string,
  productId: string
) {
  try {
    const existingCart = await db
      .select({ id: cart.id })
      .from(cart)
      .where(eq(cart.userId, userId))
      .then(r => r[0]);

    if (!existingCart) return { success: false };

    await db
      .delete(cartItem)
      .where(and(
        eq(cartItem.cartId, existingCart.id),
        eq(cartItem.productId, productId)
      ));

    return { success: true };

  } catch (error) {
    console.error("removeCartItem failed:", error);
    return { success: false };
  }
}

export async function getUserCart(userId: string) {
  try {
    const existingCart = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .then(r => r[0]);

    if (!existingCart) {
      return [];
    }

    const items = await db
      .select()
      .from(cartItem)
      .where(eq(cartItem.cartId, existingCart.id));

    return items; 
  } catch (err) {
    console.error("❌ Fetch cart failed:", err);
    throw err;
  }
}