/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";


import { useEffect, useMemo, useState } from "react";

import { getAddresses, getCheckoutPricingQuote } from "@/helper";
// import { tempUserId } from "@/const";
import { useCheckoutStore } from "@/store/checkoutStore";
import { initiateRazorpayPayment } from "@/lib/razorpay";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useClientSideUser } from "@/hooks/getClientSideUser";
import CheckoutBreadcrumb from "./components/CheckoutBreadcrumb";
import AddressSelector from "./components/AddressSelector";
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
  const [couponCode, setCouponCode] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [pricing, setPricing] = useState({
    subtotal: 0,
    discount: 0,
    deliveryFee: 0,
    total: 0,
  });

  const quoteItems = useMemo(
    () =>
      items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    [items],
  );



  const handleRemoveCoupon = () => {
    setAppliedCouponCode(null);
    setCouponCode("");

    toast.success("Coupon removed");
  };

  const handleApplyCoupon = async () => {
    try {
      const data = await getCheckoutPricingQuote({
        items: quoteItems,
        couponCode,
      });

      setPricing(data);
      setAppliedCouponCode(couponCode);

      toast.success("Coupon applied 🎉");
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const { subtotal, discount, deliveryFee, total: finalTotal } = pricing;

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

  useEffect(() => {
    let cancelled = false;

    async function loadPricing() {
      if (!items.length) {
        setPricing({
          subtotal: 0,
          discount: 0,
          deliveryFee: 0,
          total: 0,
        });
        return;
      }

      try {
        const data = await getCheckoutPricingQuote({
          items: quoteItems,
          couponCode: appliedCouponCode,
        });

        if (!cancelled) {
          setPricing(data);
        }
      } catch (err: any) {
        if (!cancelled) {
          toast.error(err.message || "Failed to calculate checkout total");
        }
      }
    }

    loadPricing();

    return () => {
      cancelled = true;
    };
  }, [items.length, quoteItems, appliedCouponCode]);

  const handlePayment = async () => {
    if (!selected) {
      toast.error("Please select a shipping address");
      return;
    }

    try {
      setLoading(true);
      setPaymentStatus("processing");

      const res: any = await initiateRazorpayPayment({
        name: "YUNANVED",
        description: "Order Payment",
        items: items,
        address: addresses.find((a) => a.id === selected),
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
