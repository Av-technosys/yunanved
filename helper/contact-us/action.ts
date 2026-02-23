"use server";
import { contactTable } from "@/db/schema";
import { db } from "@/lib/db";

export async function sendContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    await db.insert(contactTable).values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });
    return { success: true, message: "Message sent successfully" };
  } catch (error) {
    return { success: false, message: "Failed to send message" };
  }
}
