"use server";

import { db } from "@/lib/db";
import { user , userAddress } from "@/db/userSchema";
import { eq } from "drizzle-orm";


export async function getProfile(userId: string) {
  const data = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .then(r => r[0]);

  if (!data) return null;

  const parts = (data.name ?? "").trim().split(" ");

  return {
    id: data.id,
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" ") ?? "",
    email: data.email,
    phone: data.number ?? "",
    memberSince: data.createdAt,
    profileImage: data.profileImage ?? null,

  };
}

export async function updateProfile(userId: string, payload: {
  firstName: string;
  lastName: string;
  phone: string;
  profileImage?: string;

}) {

  const name = `${payload.firstName} ${payload.lastName}`.trim();

  await db
    .update(user)
    .set({
      name,
      number: payload.phone,
      profileImage: payload.profileImage, 
      updatedAt: new Date(),
    })
    .where(eq(user.id, userId));

  return { success: true };
}

export async function getAddresses(userId: string) {
  const rows = await db
    .select()
    .from(userAddress)
    .where(eq(userAddress.userId, userId));

  return rows; 
}


export async function saveAddress(
  userId: string,
  payload: {
    id?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }
) {
  return await db.transaction(async (tx) => {

    if (payload.isDefault) {
      await tx
        .update(userAddress)
        .set({ isDefault: false })
        .where(eq(userAddress.userId, userId));
    }

    if (payload.id) {
      // UPDATE
      await tx
        .update(userAddress)
        .set({
          addressLine1: payload.addressLine1,
          addressLine2: payload.addressLine2,
          city: payload.city,
          state: payload.state,
          pincode: payload.pincode,
          isDefault: payload.isDefault,
          updatedAt: new Date(),
        })
        .where(eq(userAddress.id, payload.id));
    } else {
      // INSERT
      await tx.insert(userAddress).values({
        userId,
        addressLine1: payload.addressLine1,
        addressLine2: payload.addressLine2,
        city: payload.city,
        state: payload.state,
        pincode: payload.pincode,
        isDefault: payload.isDefault,
      });
    }

    return { success: true };
  });
}

export async function deleteAddress(id: string) {
  const address = await db
    .select()
    .from(userAddress)
    .where(eq(userAddress.id, id))
    .limit(1)
    .then(r => r[0]);

  if (!address) {
    throw new Error("Address not found");
  }

  if (address.isDefault) {
    throw new Error(
      "You cannot delete the default address. Please set another address as default first."
    );
  }

  await db.delete(userAddress).where(eq(userAddress.id, id));

  return { success: true };
}