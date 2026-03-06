"use server"

import { user } from "@/db";
import { db } from "@/lib/db"
import { eq } from "drizzle-orm";

export const getUserId = async (email: string) => {
    try {
        const userId = await db.select({id: user.id}).from(user).where(eq(user.email, email)).then(r => r[0]?.id);
        return userId
    } catch (error) {
        throw error
    }
}