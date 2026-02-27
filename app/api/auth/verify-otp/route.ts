/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../../../lib/db";
import { user } from "../../../../db/userSchema";
import { authSingIn, cognitoConfirmSignUp } from "@/helper/cognito";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    console.log('body', body)
    const { email, code } = body;

    if (!email || !code) {
        return NextResponse.json({ message: 'email and confirmation code are required.' }, { status: 400 });
    }

    try {
        const result = await cognitoConfirmSignUp({ email, code });
        const [dbUser] = await db.select().from(user).where(eq(user.email, email));
        if (!dbUser) {
            return NextResponse.json({ message: 'User not found.', result }, { status: 404 });
        }
       // const data = await authSingIn({ email, password: dbUser.password });
        return NextResponse.json({ message: 'Verification successful.' }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}