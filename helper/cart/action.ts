"use server";

import { db } from "@/lib/db";
import { cart, cartItem } from "@/db/userSchema";
import { eq, and, sql } from "drizzle-orm";

export async function addProductToUserCart(
  userId: string,
  productId: string,
  quantity: number
) {
  return await db.transaction(async (transactionDb) => {


    let existingCart = await transactionDb
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .then(r => r[0]);

    if (!existingCart) {
      const createdCart = await transactionDb
        .insert(cart)
        .values({ userId })
        .returning();

      existingCart = createdCart[0];
    }

    const existingCartItem = await transactionDb
      .select()
      .from(cartItem)
      .where(and(
        eq(cartItem.cartId, existingCart.id),
        eq(cartItem.productId, productId)
      ))
      .then(r => r[0]);

    if (existingCartItem) {
      await transactionDb
        .update(cartItem)
        .set({ quantity: existingCartItem.quantity + quantity })
        .where(eq(cartItem.id, existingCartItem.id));
    } else {
      await transactionDb.insert(cartItem).values({
        cartId: existingCart.id,
        productId,
        quantity,
      });
    }

    return { success: true };
  });
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