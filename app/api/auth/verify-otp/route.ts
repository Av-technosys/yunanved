import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
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
        const [user] = await db.select().from(users).where(eq(users.email, email));
        if (!user) {
            return NextResponse.json({ message: 'User not found.', result }, { status: 404 });
        }
        const data = await authSingIn({ email, password: user.password });
        return NextResponse.json({ message: 'Login successful.', data }, { status: 200 });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}