/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/landing/Navbar";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getAddresses } from "@/helper";
import { tempUserId } from "@/const";
import { useCheckoutStore } from "@/store/checkoutStore";
import { initiateRazorpayPayment } from "@/lib/razorpay";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";


type ApiAddress = {
  id: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};

const breadcrumb = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Cart",
    href: "/cart",
  },
  {
    name: "Checkout",
    href: "/checkout",
  },
];

export default function Checkout() {

const [selected, setSelected] = useState<string | null>(null);
const [addresses, setAddresses] = useState<ApiAddress[]>([]);
const router = useRouter();
const [loading, setLoading] = useState(false);
const items = useCheckoutStore((s) => s.items);
const setPaymentStatus = useCheckoutStore((s) => s.setPaymentStatus);
const clearCheckout = useCheckoutStore((s) => s.clearCheckout);
const clearCart = useCartStore((s)=> s.clearCart)
const userId:any = useCheckoutStore((s) => s.userId);

const subtotal = items.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);

const discount = subtotal * 0.2;
const deliveryFee = subtotal > 0 ? 15 : 0;
const finalTotal = subtotal - discount + deliveryFee;


useEffect(() => {
  const fetchAddresses = async () => {
    try {
      const data:any = await getAddresses(tempUserId);

      setAddresses(data);

      if (data?.length > 0) {
        const defaultAddress =
          data.find((addr: ApiAddress) => addr.isDefault) || data[0];

        setSelected(defaultAddress.id);
      }
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    }
  };

  fetchAddresses();
}, []);


const handlePayment = async () => {
  if (!selected) {
    toast.error("Please select a shipping address");
    return;
  }

  try {
    setLoading(true);
    setPaymentStatus("processing");

console.log("Items received in backend:", JSON.stringify(items, null, 2));

await initiateRazorpayPayment({
  amount: finalTotal,
  name: "YUNANVED",
  description: "Order Payment",
  items: items,
  userId,
  address: addresses.find(a => a.id === selected)
});
    setPaymentStatus("success");
    clearCheckout();
     clearCart()
    toast.success("Payment Successful 🎉");
    router.push("/order-confirmation");

  } catch (err) {
    setPaymentStatus("failed");
    toast.error("Payment Failed ❌");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 ">
        <Navbar />
        <div className="max-w-6xl px-2 md:px-4 lg:px-0 mx-auto ">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item, index) => (
                <div
                  className="flex items-center justify-center gap-1"
                  key={index}
                >
                  <BreadcrumbItem>
                    <Link href={item.href}>{item.name}</Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="max-w-6xl  px-2 md:px-4 lg:px-0 mx-auto grid grid-cols-3 gap-6 md:gap-3 lg:gap-6">
          <div className="col-span-3 md:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Checkout</h2>
              <Button variant="link" className="text-sm">
                + Add New
              </Button>
            </div>

            <h3 className="text-sm font-semibold text-gray-700">
              Shipping Address
            </h3>

<RadioGroup
  value={selected ?? ""}
  onValueChange={setSelected}
  className="space-y-3"
>
  {addresses.map((item) => {
    const isActive = selected === item.id;

    return (
      <Card
        key={item.id}
        className={`transition border cursor-pointer
        ${isActive ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
      >
        <CardContent className="p-4 flex gap-3 items-start justify-between">
          <div className="w-full flex gap-3 items-start">
            <RadioGroupItem
              value={item.id}
              id={item.id}
              className="mt-1"
            />

          <Label
  htmlFor={item.id}
  className="flex flex-col items-start gap-1 cursor-pointer w-full"
>
  <div className="flex items-center gap-2">
    <p className="font-semibold text-gray-900">
      {item.addressLine1}
    </p>

    {item.isDefault && (
      <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
        Default
      </span>
    )}

    {!item.isDefault && (
      <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
        Saved
      </span>
    )}
  </div>

  <p className="text-sm text-gray-600">
    {item.addressLine2}
  </p>

  <p className="text-sm text-gray-500">
    {item.city}, {item.state} - {item.pincode}
  </p>
</Label>
          </div>

          <Button variant="link" size="sm">
            Edit
          </Button>
        </CardContent>
      </Card>
    );
  })}
</RadioGroup>
          </div>

          <div className="col-span-3  md:col-span-1  flex flex-col items-center justify-end">
            <Card className="w-full">
              <CardContent className="p-6  space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Enter coupon code" />
                  <Button>Apply</Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toFixed(0)}</span>
                  </div>

                  <div className="flex justify-between text-red-500">
                    <span>Discount (-20%)</span>
                   <span>- ₹ {discount.toFixed(0)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                   <span>₹ {deliveryFee}</span>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                <span>₹ {finalTotal.toFixed(0)}</span>
                </div>

                {/* <Button className="w-full rounded-full bg-teal-800 hover:bg-teal-900">
                  <Link href="/order-confirmation"> Continue</Link>
                </Button> */}
               
               <Button
  onClick={handlePayment}
  disabled={loading}
  className="w-full text-[16px] md:text-[11px] lg:text-[16px] bg-teal-800 text-white py-3 rounded-full mt-4 hover:bg-teal-900"
>
  {loading ? "Processing..." : `Pay ₹${finalTotal.toFixed(0)}`}
</Button>
                
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="max-w-6xl w-full px-2 md:px-4 lg:px-0 my-5 mx-auto text-gray-600 flex flex-wrap items-center justify-center  md:justify-between">
        <div>© 2024 Yunanved. All rights reserved.</div>
        <div>Privacy Policy | Terms & Conditions | Shipping Policy</div>
      </div>
    </div>
  );
}
