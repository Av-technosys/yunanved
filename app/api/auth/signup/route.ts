/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../../../lib/db";
import { user } from "../../../../db/userSchema";
import { cognitoAdminGetUser, cognitoSignUp } from "@/helper/cognito";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, first_name, last_name, user_type , number } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 }
    );
  }

  const role = user_type === "admin" ? "admin" : "user";

  try {
    // Check if user already exists in Cognito
    const existingUser = await cognitoAdminGetUser({ email });

    if (existingUser?.UserStatus === "CONFIRMED") {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "User already registered but not confirmed." },
      { status: 409 }
    );

  } catch (error: any) {

    if (error.__type === "UserNotFoundException") {
      try {
        // Create user in Cognito
        const createUserResult: any = await cognitoSignUp({
          email,
          password,
          userAttribute: [
            { Name: "email", Value: email }
          ]
        });

        console.log("Cognito signup success:", createUserResult);

        // Store user in DB
        const [userRes] = await db.insert(user).values({
          first_name: first_name || "New",
          last_name: last_name || null,
          number: number || null,
          email,
          password: null, // Cognito handles password
          user_type: role,
          isActive: true,
        }).returning();

        return NextResponse.json(
          {
            message: "Signup successful. OTP sent to email.",
            data: {
              userId: userRes.id,
              email,
              role,
            }
          },
          { status: 201 }
        );

      } catch (signupError: any) {
        console.error("Signup error:", signupError);
        return NextResponse.json(
          { message: signupError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}