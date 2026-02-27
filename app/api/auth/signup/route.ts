import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { cognitoAdminGetUser, cognitoSignUp, cognitoUpdateUserAttribute } from "@/helper/cognito";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { password, email } = body;
    if (!password || !email) {
        return NextResponse.json({ message: 'password, and email are required.' }, { status: 400 });
    }

    try {
        const response = await cognitoAdminGetUser({ email });
        const userStatus = response.UserStatus;
        if (userStatus === 'CONFIRMED') {
            return NextResponse.json({ message: 'User already exists.' }, { status: 401 });
        } else {
            return NextResponse.json({ message: userStatus }, { status: 401 });
        }
    } catch (error: any) {
        if (error.__type === 'UserNotFoundException') {
            const userType = body.user_type === 'student' ? "CANDIDATE" : "COMPANY_ADMIN";

            try {
                let userAttribute = [
                    { Name: 'email', Value: email },
                    { Name: 'custom:user_type', Value: userType.toString() },
                ];
                const createUserResult: any = await cognitoSignUp({
                    email,
                    userAttribute,
                    password,
                });


                console.log(createUserResult, "createUserResult");

                const [userRes] = await db.insert(users).values({
                    email,
                    role: userType,
                    fullName: "",
                    password,
                    cognitoSub: createUserResult?.UserSub || "asdf",
                    isActive: true,
                }).returning();

                userAttribute = [
                    {
                        Name: 'custom:user_id',
                        Value: JSON.stringify(userRes.id),
                    },
                ];
                // const vendorIds = {
                //   vendorEmployeesId: vendorEmployeesRes.vendorEmployeeId,
                //   vendorId: vendorEmployeesRes.vendorId,
                // };
                // add userid to cognito attribute
                await cognitoUpdateUserAttribute({ email, userAttribute });

                return NextResponse.json({
                    message: 'OTP sent to your email.',
                    data: { userId: userRes.id, email },
                }, { status: 201 });
            } catch (err: any) {
                console.error(err);
                return NextResponse.json({ message: err.message }, { status: 500 });
            }
        }
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}