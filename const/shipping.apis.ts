export const shippingAPIs = {
    login: "https://apiv2.shiprocket.in/v1/external/auth/login",
    createOrder: "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    servicable: "https://apiv2.shiprocket.in/v1/external/international/courier/serviceability?order_id=",
    generateAWB: "https://apiv2.shiprocket.in/v1/external/courier/assign/awb",
    generateLabel: "https://apiv2.shiprocket.in/v1/external/courier/generate/label",
    pickupRequest: "https://apiv2.shiprocket.in/v1/external/courier/generate/pickup",
    trackOrderByShipmentId: "https://apiv2.shiprocket.in/v1/external/courier/track/shipment/",
    cancelOrder: "https://apiv2.shiprocket.in/v1/external/orders/cancel"
}