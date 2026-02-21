/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useEffect, useState } from 'react';
import { ChevronRight, CheckCircle2, Circle, MapPin, User, Package, Loader2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getOrderById } from "@/helper/index";

export const OrderDetailsPage = ({ orderId, onBack }: { orderId: string, onBack: () => void }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(orderId);
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="p-10 text-center"> <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <Loader2
            className="h-12 w-12 text-[#1D4E4E] animate-spin"
            strokeWidth={2.5}
          />
        </div>
        </div>;
  if (!orderData) return <div className="p-10 text-center">Order not found.</div>;

  const S3_BASE = process.env.NEXT_PUBLIC_S3_BASE_URL;

  return (
    <div className="w-full ">
      <nav className="flex items-center gap-1 text-[13px] text-gray-500 p-2 cursor-pointer" onClick={onBack}>
        <span>Home</span> <ChevronRight size={12} />
        <span>My Orders</span> <ChevronRight size={12} />
        <span className="font-medium text-gray-800">Order Details</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 ">
        
        {/* Left Column: Status & Tracking */}
        <Card className="lg:col-span-5 rounded-[24px] border-none shadow-sm p-4 flex flex-col justify-between min-h-[300px]">
          <div>
            <h1 className="text-sm font-bold text-[#1D4E4E]">Order #{orderData.id.toUpperCase()}</h1>
            <p className="text-sm text-gray-400 mt-1">
              Placed on {new Date(orderData.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>

            {/* Vertical Timeline - Dynamic Logic based on status */}
            <div className="mt-7 space-y-8 ml-2">
              {[
                { label: "Order Confirmed", date: orderData.createdAt, done: true },
                { label: "Order Shipped", date: orderData.updatedAt, done: orderData.status === "shipped" || orderData.status === "delivered" },
                { label: "Out for Delivery", date: "", done: orderData.status === "out_for_delivery" || orderData.status === "delivered" },
                { label: "Delivered", date: "", done: orderData.status === "delivered" },
              ].map((step, i, arr) => (
                <div key={i} className="relative flex gap-4 items-start">
                  {i !== arr.length - 1 && (
                    <div className={`absolute left-[11px] top-6 w-[2px] h-10 ${step.done ? "bg-[#00B050]" : "bg-gray-200"}`} />
                  )}
                  {step.done ? <CheckCircle2 className="text-[#00B050] z-10 bg-white" size={24} /> : <Circle className="text-gray-300 z-10 bg-white" size={24} />}
                  <div>
                    <p className={`font-semibold ${step.done ? "text-gray-800" : "text-gray-400"}`}>{step.label}</p>
                    {step.date && <p className="text-xs text-gray-400">{new Date(step.date).toLocaleDateString()}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant="outline" className="flex-1 rounded-full h-12">Cancel</Button>
            <Button className="flex-1 rounded-full h-12 bg-[#1D4E4E]">Track Order</Button>
          </div>
        </Card>

        {/* Right Column: Delivery & Summary */}
        <div className="lg:col-span-7 space-y-2">
          <Card className="rounded-[24px] border-none shadow-sm p-8">
            <h3 className="font-bold text-[#1D4E4E] text-lg mb-4">Delivery Details</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="text-gray-400" size={20} />
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-800">Address: </span> 
                  {orderData.addressLine1}, {orderData.city}, {orderData.state} ({orderData.pincode})
                </p>
              </div>
              <div className="flex gap-3">
                <User className="text-gray-400" size={20} />
                {/* Note: John Doe is placeholder as userId doesn't contain name in this response */}
                <p className="text-sm text-gray-600"><span className="font-bold text-gray-800">Customer ID:</span> {orderData.userId.slice(0, 13)}...</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-[24px] border-none shadow-sm p-8">
            <h3 className="font-bold text-[#1D4E4E] text-lg mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{orderData.totalAmountPaid}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>₹0.00</span></div>
              <Separator className="my-4" />
              <div className="flex justify-between text-xl font-bold text-[#1D4E4E]">
                <span>Total</span><span className="text-amber-500">₹{orderData.totalAmountPaid}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Section: Product Table */}
        <Card className="lg:col-span-12 rounded-[24px] border-none shadow-sm p-8 overflow-hidden">
          <div className="flex justify-between text-sm font-semibold text-gray-400 mb-6 px-4">
            <span className="w-1/2">Product</span>
            <span className="w-1/4 text-center">Quantity</span>
            <span className="w-1/4 text-right">Total</span>
          </div>
        <div className="space-y-6">
  {orderData?.items && orderData.items.length > 0 ? (
    orderData.items.map((item: any) => (
      <div key={item.id} className="flex items-center px-4">
        <div className="w-1/2 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100">
            <img
              src={`${S3_BASE}/${item.product?.bannerImage}`}
              className="object-cover h-full w-full"
              alt={item.product?.name || "Product"}
              onError={(e: any) => {
                e.target.src =
                  "https://via.placeholder.com/100?text=Product";
              }}
            />
          </div>
          <div>
            <p className="font-bold text-[#1D4E4E]">
              {item.product?.name || item.productName}
            </p>
            <p className="text-xs text-gray-400">
              {item.product?.sku || "No SKU"}
            </p>
          </div>
        </div>

        <span className="w-1/4 text-center text-gray-600">
          {item.quantity}x
        </span>

        <span className="w-1/4 text-right font-bold text-[#1D4E4E]">
          ₹{item.productPrice}
        </span>
      </div>
    ))
  ) : (
    <div className="py-6 text-center text-gray-400 font-medium">
      No products found
    </div>
  )}
</div>
        </Card>
      </div>
    </div>
  );
};