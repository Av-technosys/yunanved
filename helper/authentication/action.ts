"use server";
import { userTable } from "@/db/schema";
import { user } from "@/db/userSchema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function signUp(userData:any){
    try {
        const user = await db.select().from(userTable).where(eq(userTable.email, userData.email));
        if(user.length > 0){
            return { success: false, message: "User already exists"};
        }
        await db.insert(userTable).values(userData);
        return { success: true};
    } catch (error) {
        throw error;
    }
}

export async function signIn(userData:any){
    try {
        const user = await db.select().from(userTable).where(eq(userTable.email, userData.email));
        if(user.length === 0){
            return { success: false, message: "User does not exist"};
        }
        if(user[0].password !== userData.password){
            return { success: false, message: "Incorrect password"};
        }

        return { success: true};
    } catch (error) {
        throw error;
    }
}