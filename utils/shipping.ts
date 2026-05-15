import { shiprocket } from "@/config/shipping";
import { shippingAPIs } from "@/const/shipping.apis";
import { shipment, shippingToken } from "@/db";
import { db } from "@/lib/db";
import { desc } from "drizzle-orm";
import axios from "axios";
import { assignAWBPayload, requestShipmentPayload, ShiprocketOrderPayload } from "@/types/shipping";

export async function getShippingTokenFromDB() {
    const data = await db.select().from(shippingToken).orderBy(desc(shippingToken.createdAt)).limit(1);
    const token = data[0]?.token;
    const expiresAt = data[0]?.expiresAt;
    if (expiresAt && expiresAt < new Date()) {
        return null;
    }
    return token;
}
export async function createNewShipingToken(): Promise<string> {
    const res = await axios.post(shippingAPIs.login, shiprocket);
    const { token, first_name, last_name, email, created_at } = res.data;
    const expiresAt = new Date(created_at);
    expiresAt.setDate(expiresAt.getDate() + 8)
    const tokenInsert = await db.insert(shippingToken).values({
        token,
        firstName: first_name,
        lastName: last_name,
        email,
        expiresAt,
        createdAt: new Date(created_at)
    }).returning();

    return tokenInsert[0]?.token || "";

}
export async function createShiprocketOrder(token: string, orderData: ShiprocketOrderPayload) {
    const res = await axios.post(
        shippingAPIs.createOrder,
        orderData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    const {
        order_id,
        channel_order_id,
        shipment_id,
        status,
        status_code,
        onboarding_completed_now,
        awb_code,
        courier_company_id,
        courier_name,
        new_channel,
        packaging_box_error
    } = res.data;

    console.log(res.data, " res data");

    await db.insert(shipment).values({
        orderId: channel_order_id,
        shipmentId: shipment_id,
        shipmentOrderId: order_id,
        awbCode: awb_code,
        courierName: courier_name,
        pickupStatus: status,
        trackingStatus: status_code,
        labelUrl: "",
        invoiceUrl: "",
    });

    return res.data;
}
export async function checkServiceability(token: string, orderId: string) {
    const res = await axios.get(
        `${shippingAPIs.servicable}${orderId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
}
export async function generateAWB(token: string, payload: assignAWBPayload) {
    const res = await axios.post(
        shippingAPIs.generateAWB,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return res.data;
}
export async function generateLabel(token: string, shipmentId: number) {
    const res = await axios.post(
        shippingAPIs.generateLabel,
        {
            shipment_id: [shipmentId],
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return res.data;
}
export async function requestPickup(token: string, payload: requestShipmentPayload) {
    const res = await axios.post(
        shippingAPIs.pickupRequest,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return res.data;
}
export async function trackShipment(token: string, shipmentId: number) {
    const res = await axios.get(
        `${shippingAPIs.trackOrderByShipmentId}${shipmentId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
}
export async function cancelShiprocketOrder(token: string, payload: any) {
    const res = await axios.post(
        shippingAPIs.cancelOrder,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return res.data;
}
function calculatePackageDimensions(items: any) {
    let length = 0;
    let breadth = 0;
    let height = 0;

    items.forEach((item: any) => {
        length = Math.max(length, item.length);
        breadth = Math.max(breadth, item.breadth);
        height += item.height * item.quantity;
    });

    return {
        length,
        breadth,
        height
    };
}