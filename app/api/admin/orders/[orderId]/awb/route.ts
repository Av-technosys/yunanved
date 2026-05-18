// app/api/admin/orders/[orderId]/awb/route.ts

import { shipment } from "@/db";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Replace this with your DB import
// import { db } from "@/lib/db";

type Params = {
    params: Promise<{
        orderId: string;
    }>;
};

// GET AWB
export async function GET(
    req: NextRequest,
    { params }: Params
) {
    try {
        const { orderId } = await params;

        // Replace with your actual DB query
        // Example:
        const [order] = await db.select().from(shipment).where(eq(shipment.orderId, orderId)).limit(1);

        console.log(order, "order")



        // const order = {
        //     id: orderId,
        //     awbCode: "7758493021",
        // };

        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Order not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            awbCode: order.awbCode,
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

// UPDATE AWB
export async function PATCH(
    req: NextRequest,
    { params }: Params
) {
    try {
        const { orderId } = await params;

        const body = await req.json();

        const { awbCode } = body;

        if (!awbCode) {
            return NextResponse.json(
                {
                    success: false,
                    message: "AWB code is required",
                },
                { status: 400 }
            );
        }

        const [updatedShipment] = await db.update(shipment).set({ awbCode, }).where(eq(shipment.orderId, orderId)).returning();

        return NextResponse.json({
            success: true,
            message: "AWB updated successfully",
            data: updatedShipment,
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