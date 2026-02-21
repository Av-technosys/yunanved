"use server";

import { db } from "@/lib/db";
import { cart, cartItem } from "@/db/userSchema";
import { eq, and } from "drizzle-orm";

export async function addProductToUserCart(
  userId: string,
  productId: string,
  quantity:number
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
  return await db.transaction(async (transactionDb) => {

    const existingCart = await transactionDb
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .then(r => r[0]);

    if (!existingCart) return { success: false };

    const item = await transactionDb
      .select()
      .from(cartItem)
      .where(and(
        eq(cartItem.cartId, existingCart.id),
        eq(cartItem.productId, productId)
      ))
      .then(r => r[0]);

    if (!item) return { success: false };

    await transactionDb
      .update(cartItem)
      .set({ quantity: item.quantity + 1 })
      .where(eq(cartItem.id, item.id));

    return { success: true };
  });
}


export async function decreaseCartItem(
  userId: string,
  productId: string
) {
  return await db.transaction(async (transactionDb) => {

    const existingCart = await transactionDb
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .then(r => r[0]);

    if (!existingCart) return { success: false };

    const item = await transactionDb
      .select()
      .from(cartItem)
      .where(and(
        eq(cartItem.cartId, existingCart.id),
        eq(cartItem.productId, productId)
      ))
      .then(r => r[0]);

    if (!item) return { success: false };

    const newQty = item.quantity - 1;

    if (newQty <= 0) {
      await transactionDb.delete(cartItem).where(eq(cartItem.id, item.id));
    } else {
      await transactionDb
        .update(cartItem)
        .set({ quantity: newQty })
        .where(eq(cartItem.id, item.id));
    }

    return { success: true };
  });
}


export async function removeCartItem(
  userId: string,
  productId: string
) {
  return await db.transaction(async (transactionDb) => {

    const existingCart = await transactionDb
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .then(r => r[0]);

    if (!existingCart) return { success: false };

    await transactionDb
      .delete(cartItem)
      .where(and(
        eq(cartItem.cartId, existingCart.id),
        eq(cartItem.productId, productId)
      ));
    return { success: true };
  });
}
