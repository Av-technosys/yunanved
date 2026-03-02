/* eslint-disable @typescript-eslint/no-explicit-any */
import { authSingIn } from "@/helper/cognito";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;
  try {
    const data = await authSingIn({ email, password });
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error(err, "err");
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
