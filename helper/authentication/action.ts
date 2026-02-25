/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { user } from "@/db";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function signUp(userData: any) {
    try {
        const userRes = await db.select().from(user).where(eq(user.email, userData.email));
        if (userRes.length > 0) {
            return { success: false, message: "User already exists" };
        }
        await db.insert(user).values(userData);
        return { success: true };
    } catch (error) {
        throw error;
    }
}

export async function signIn(userData: any) {
    try {
        const userRes = await db.select().from(user).where(eq(user.email, userData.email));
        if (userRes.length === 0) {
            return { success: false, message: "User does not exist" };
        }
        if (userRes[0].password !== userData.password) {
            return { success: false, message: "Incorrect password" };
        }

        return { success: true };
    } catch (error) {
        throw error;
    }
}