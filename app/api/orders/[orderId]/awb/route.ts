// app/api/orders/[orderId]/awb/route.ts

import { NextRequest, NextResponse } from "next/server";

// Replace with your actual DB import
import { db } from "@/lib/db";
import { shipment } from "@/db";
import { eq } from "drizzle-orm";

type Params = {
  params: Promise<{
    orderId: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { orderId } = await params;

    // Replace this with your real DB query
    // Example using Prisma:

    const [shipping] = await db.select().from(shipment).where(eq(shipment.orderId, orderId));


    if (!shipping) {
      return NextResponse.json(
        {
          success: false,
          message: "Shipping details not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      awbCode: shipping.awbCode,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}