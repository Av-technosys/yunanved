"use server";

import { user, userAddress } from "@/db";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";

// export const getUserId = async (email: string) => {
//     try {
//         const userId = await db.select({id: user.id}).from(user).where(eq(user.email, email)).then(r => r[0]?.id);
//         return userId
//     } catch (error) {
//         throw error
//     }
// }

export const getUserIdByEmailId = async (email: any) => {
  try {
    const userDetails = await db
      .select({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        profileImage: user.profileImage,
        email: user.email,
        city: userAddress.city,
        state: userAddress.state,
      })
      .from(user)
      .leftJoin(userAddress, and(eq(user.id, userAddress.userId), eq(userAddress.isPrimary, true)))
      .where(eq(user.email, email));
    return userDetails[0];
  } catch (error) {
    return null;
  }
};

export const getUserEmailByUserId = async (userId: any) => {
  try {
    const userDetails = await db.select({ email: user.email }).from(user).where(eq(user.id, userId));
    return userDetails[0];
  } catch (error) {
    return null;
  }
};
