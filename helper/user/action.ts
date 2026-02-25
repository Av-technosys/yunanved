"use server";

import { db } from "@/lib/db";
import { user, userAddress } from "@/db/userSchema";
import { eq } from "drizzle-orm";


export async function getProfile(userId: string) {
  const data = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .then(r => r[0]);

  if (!data) return null;

  const firstName = data.first_name ?? "";
  const lastName = data.last_name ?? "";

  return {
    id: data.id,
    firstName: firstName,
    lastName: lastName,
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

  await db
    .update(user)
    .set({
      first_name: payload.firstName,
      last_name: payload.lastName,
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
        .set({ isPrimary: false })
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
          isPrimary: payload.isDefault,
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
        isPrimary: payload.isDefault,
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

  if (address.isPrimary) {
    throw new Error(
      "You cannot delete the default address. Please set another address as default first."
    );
  }

  await db.delete(userAddress).where(eq(userAddress.id, id));

  return { success: true };
}