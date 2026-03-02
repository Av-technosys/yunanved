"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Check } from "lucide-react";
import headPhone from "../../public/headphone.png";
import Link from "next/link";

export default function OrderConfirmed() {
  return (
    <>
      <div className="max-w-4xl px-2 md:px-4 lg:px-0 mx-auto my-10 space-y-6">
        <Card>
          <CardContent className="p-8 text-center space-y-3">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                <Check className="text-white w-6 h-6" />
              </div>
            </div>

            <h2 className="text-xl font-semibold">Order Confirmed</h2>

            <p className="text-sm text-gray-600">
              Thank you John, your order is successfully placed
            </p>

            <p className="text-sm text-red-500">
              We have sent confirmation mail to email id john.doe@gmail.com
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-[#D7B36A]">Order ID</p>
                <p className="font-medium text-gray-600">#FZV-KIJ765</p>
              </div>
              <div>
                <p className="text-[#D7B36A]">Order Date</p>
                <p className="font-medium text-gray-600">Aug 23, 2023</p>
              </div>
              <div>
                <p className="text-[#D7B36A]">Payment Method</p>
                <p className="font-medium text-gray-600">UPI</p>
              </div>
              <div>
                <p className="text-[#D7B36A]">Delivery Address</p>
                <p className="font-medium text-gray-600">
                  123, Downtown, Mansarovar Jaipur, Rajasthan - 302058
                </p>
              </div>
            </div>

            <hr />

            <div className="flex justify-between items-center gap-3">
              <div className="w-4/5 flex gap-3">
                <Image
                  src={headPhone}
                  alt="Product"
                  width={80}
                  height={80}
                  className="rounded-lg bg-gray-100"
                />

                <div>
                  <p className="font-medium text-sm md:text-lg">
                    Wireless Boat Noise Cancelling Headphones Gen 2
                  </p>
                  <p className="text-sm text-gray-500">Model: XMR-GHY765</p>
                </div>
              </div>

              <div className="w-1/5 h-full text-right text-sm">
                <p className="font-medium">$265</p>
                <p className="text-gray-500">Qty: 1x</p>
              </div>
            </div>

            <hr />

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2 text-sm">
                <p className="font-medium">Order Summary</p>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>$35.86</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>$5.00</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>$2.87</span>
                </div>

                <hr />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-[#D7B36A]">$43.73</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <Button variant="outline" className="rounded-full">
                Print Invoice
              </Button>
              <Link href={"/category"}>
                <Button className="rounded-full bg-teal-800 hover:bg-teal-900">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
