"use server";

import { db } from "@/lib/db";
import { cart, cartItem, user, productVariant } from "@/db";
import { eq, and, sql } from "drizzle-orm";
import { tempUserId } from "@/const/globalconst";

export async function addProductToUserCart(
  userId: string,
  productId: string,
  quantity: number
) {
  try {
    return await db.transaction(async (tx) => {
      // 0. Ensure user exists (especially for tempUserId in dev)
      if (userId === tempUserId) {
        const userExists = await tx.select().from(user).where(eq(user.id, userId)).then(r => r[0]);
        if (!userExists) {
          await tx.insert(user).values({
            id: userId,
            first_name: "Guest",
            last_name: "User",
            email: "guest@example.com",
          });
        }
      }

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
            eq(cartItem.productVarientId, productId)
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
          productVarientId: productId,
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
      eq(cartItem.productVarientId, productId)
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
        eq(cartItem.productVarientId, productId),
        sql`${cartItem.quantity} > 1`
      ));

    await db
      .delete(cartItem)
      .where(and(
        eq(cartItem.cartId, existingCart.id),
        eq(cartItem.productVarientId, productId),
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
        eq(cartItem.productVarientId, productId)
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
      .select({
        productId: cartItem.productVarientId,
        sku: productVariant.sku,
        slug: productVariant.slug,
        title: productVariant.name,
        image: productVariant.bannerImage,
        price: productVariant.basePrice,
        originalPrice: productVariant.strikethroughPrice,
        quantity: cartItem.quantity,
      })
      .from(cartItem)
      .innerJoin(productVariant, eq(cartItem.productVarientId, productVariant.id))
      .where(eq(cartItem.cartId, existingCart.id));

    return items.map(item => ({
      ...item,
      attributes: [], // We'll add attribute support if needed later
      addedAt: Date.now(),
    }));
  } catch (err) {
    console.error("❌ Fetch cart failed:", err);
    throw err;
  }
}