"use client";

import { Card, CardContent } from "@/components/ui";
import { Button } from "@/components/ui";
import Image from "next/image";
import { Check } from "lucide-react";
import Link from "next/link";
import { useClientSideUser } from "@/hooks/getClientSideUser";
import { useSession } from "next-auth/react";

export default function OrderClient({ orderDetails }: any) {
    const { userDetails } = useClientSideUser();
    const { data: session } = useSession();

  return (
    <>
      <div className="max-w-4xl px-2 md:px-4 lg:px-0 mx-auto my-10 max-sm:my-0 space-y-6">
        <Card>
          <CardContent className="p-8 text-center space-y-3">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                <Check className="text-white w-6 h-6" />
              </div>
            </div>

            <h2 className="text-xl font-semibold">Order Confirmed</h2>

            <p className="text-sm text-gray-600">
              Thank you{" "}
              <span className="font-bold text-black">
                {userDetails?.firstName} {userDetails?.lastName}
              </span>
              , your order is successfully placed
            </p>

            <p className="text-sm text-red-500">
              We have sent confirmation mail to email id{" "}
              <span className="font-bold">{session?.user?.email}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* ORDER DETAILS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-[#D7B36A]">Order ID</p>
                <p className="font-medium text-gray-600">#{orderDetails?.id}</p>
              </div>

              <div>
                <p className="text-[#D7B36A]">Order Date</p>
                <p className="font-medium text-gray-600">
                  {new Date(orderDetails?.created_at).toLocaleDateString("en-US")}
                </p>
              </div>

              <div>
                <p className="text-[#D7B36A]">Order Status</p>
                <p className="font-medium text-gray-600">
                  {orderDetails?.status.toUpperCase()}
                </p>
              </div>

              <div>
                <p className="text-[#D7B36A]">Delivery Address</p>
                <p className="font-medium text-gray-600 break-all">
                  {orderDetails?.address_line_1},{orderDetails?.address_line_1},{orderDetails?.city},{orderDetails?.state},{orderDetails?.pincode}
                </p>
              </div>
            </div>

            <hr />

            {/* ITEMS */}
            {orderDetails?.items?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 py-4 border-b"
              >
                {/* IMAGE */}
                <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${item.productImage}`}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* PRODUCT INFO */}
                <div className="flex-1">
                  <p className="font-medium text-sm md:text-base">
                    {item.productName}
                  </p>

                  <p className="text-sm text-gray-500">
                    SKU: {item.productSKU}
                  </p>
                </div>

                {/* PRICE */}
                <div className="text-right">
                  <p className="font-semibold">₹{item.productPrice}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2 text-sm">
                <p className="font-medium">Order Summary</p>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹5.00</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>₹2.87</span>
                </div>
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between  font-semibold">
              <span>Total Amount Paid</span>
              <span className="text-[#D7B36A] text-xl">
                ₹ {orderDetails?.total_amount_paid}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end pt-4">
          <Button variant="outline" className="rounded-full">
            Print Invoice
          </Button>
          <Link href={"/"}>
            <Button className="rounded-full bg-teal-800 hover:bg-teal-900">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
