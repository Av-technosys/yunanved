import { cognitoForgotPassword } from "@/helper/cognito";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { email } = body;
    try {
        const response = await cognitoForgotPassword({ email });

        return NextResponse.json({
            message: 'Password reset code sent to your email.',
            delivery: response.CodeDeliveryDetails,
        }, { status: 200 });
    } catch (err: any) {
        console.error('ForgotPassword error:', err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

