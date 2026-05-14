export type ShiprocketOrderItem = {
    name: string;
    sku: string;
    units: number;
    selling_price: number;
    discount?: string | number;
    tax?: string | number;
    hsn?: number;
};

export type ShiprocketOrderPayload = {
    order_id: string;
    order_date: string;
    pickup_location: string;
    comment?: string;

    billing_customer_name: string;
    billing_last_name: string;
    billing_address: string;
    billing_address_2?: string;
    billing_city: string;
    billing_pincode: number;
    billing_state: string;
    billing_country: string;
    billing_email: string;
    billing_phone: number;

    shipping_is_billing: boolean;

    shipping_customer_name?: string;
    shipping_last_name?: string;
    shipping_address?: string;
    shipping_address_2?: string;
    shipping_city?: string;
    shipping_pincode?: number | string;
    shipping_country?: string;
    shipping_state?: string;
    shipping_email?: string;
    shipping_phone?: number;

    order_items: ShiprocketOrderItem[];

    payment_method: "Prepaid" | "COD";

    shipping_charges: number;
    giftwrap_charges: number;
    transaction_charges: number;
    total_discount: number;

    sub_total: number;

    length: number;
    breadth: number;
    height: number;
    weight: number;
};

export type assignAWBPayload = {
    shipment_id: string;
    courier_id: string;
}


export type requestShipmentPayload = {
    shipment_id: number[];
}
export type cancelShipmentPayload = {
    ids: number[];
}