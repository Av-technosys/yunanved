/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card, CardContent } from "@/components/ui";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui";

import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui";
import Link from "next/link";
import { getAddresses } from "@/helper";
// import { tempUserId } from "@/const";
import { useCheckoutStore } from "@/store/checkoutStore";
import { initiateRazorpayPayment } from "@/lib/razorpay";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useClientSideUser } from "@/hooks/getClientSideUser";
import { validateCoupon } from "@/helper";
import CheckoutBreadcrumb from "./components/CheckoutBreadcrumb";
import AddressSelector from "./components/AddressSelector";
import CouponInput from "./components/CouponInput";
import OrderSummary from "./components/OrderSummary";

type ApiAddress = {
  id: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};



export default function Checkout() {
  const [selected, setSelected] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<ApiAddress[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const items = useCheckoutStore((s) => s.items);
  const setPaymentStatus = useCheckoutStore((s) => s.setPaymentStatus);
  const clearCheckout = useCheckoutStore((s) => s.clearCheckout);
  const clearCart = useCartStore((s) => s.clearCart);
  const userId: any = useCheckoutStore((s) => s.userId);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponId, setCouponId] = useState<string | null>(null);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
 
const handleRemoveCoupon = () => {
  setDiscount(0);
  setCouponId(null);
  setAppliedCouponCode(null);
  setCouponCode("");

  toast.success("Coupon removed");
};

const handleApplyCoupon = async () => {
  try {
    const data = await validateCoupon({
      code: couponCode,
      subtotal,
      userId,
    });

    setDiscount(data.discount);
    setCouponId(data.couponId);
    setAppliedCouponCode(couponCode);

    toast.success("Coupon applied 🎉");
  } catch (err: any) {
    toast.error(err.message);
  }
};
  // const discount = subtotal * 0.2;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const finalTotal = subtotal - discount + deliveryFee;

  const { userDetails } = useClientSideUser();
  const tempUserId = userDetails?.id;

  useEffect(() => {
    if (!tempUserId) return;

    const fetchAddresses = async () => {
      try {
        setLoading(true);

        const data: any = await getAddresses(tempUserId);
        setAddresses(data);

        if (data?.length > 0) {
          const defaultAddress =
            data.find((addr: ApiAddress) => addr.isDefault) || data[0];

          setSelected(defaultAddress.id);
        }
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [tempUserId]);

  const handlePayment = async () => {
    if (!selected) {
      toast.error("Please select a shipping address");
      return;
    }

    try {
      setLoading(true);
      setPaymentStatus("processing");

    const res:any =  await initiateRazorpayPayment({
        amount: finalTotal,
        name: "YUNANVED",
        description: "Order Payment",
        items: items,
        userId,
        address: addresses.find((a) => a.id === selected),
        couponId,
        couponCode: appliedCouponCode,
      });
     
      setPaymentStatus("success");
      clearCheckout();
      clearCart();
      toast.success("Payment Successful 🎉");
      router.push(`/order-confirmation/${res?.orderId}`);
    } catch (err) {
      setPaymentStatus("failed");
      toast.error("Payment Failed ❌");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen flex flex-col">

    <div className="flex-1 max-sm:p-2">

      <div className="max-w-6xl px-2 md:px-4 lg:px-0 mx-auto">
        <CheckoutBreadcrumb />
      </div>

<div className="max-w-6xl px-2 md:px-4 lg:px-0 mx-auto grid grid-cols-3 gap-6 md:gap-3 lg:gap-6">
        <AddressSelector
          addresses={addresses}
          selected={selected}
          setSelected={setSelected}
          loading={loading}
        />

        <OrderSummary
          subtotal={subtotal}
          discount={discount}
          deliveryFee={deliveryFee}
          finalTotal={finalTotal}
          appliedCouponCode={appliedCouponCode}
          handleRemoveCoupon={handleRemoveCoupon}
          handlePayment={handlePayment}
          loading={loading}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          handleApplyCoupon={handleApplyCoupon}
        />

      </div>

    </div>

  </div>
);
}

