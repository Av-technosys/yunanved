/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, Button } from "@/components/ui";
import CouponInput from "./CouponInput";

export default function OrderSummary({
  subtotal,
  discount,
  deliveryFee,
  finalTotal,
  appliedCouponCode,
  handleRemoveCoupon,
  handlePayment,
  couponCode,
  setCouponCode,
  handleApplyCoupon,
  loading,
}: any) {
  return (
        <div className="col-span-3 md:col-span-1 flex flex-col items-center justify-end">

    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
          <CouponInput
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            handleApplyCoupon={handleApplyCoupon}
          />
        {appliedCouponCode && (
          <div className="flex justify-between bg-green-50 border p-2 rounded">
            <span>Coupon {`"${appliedCouponCode}"`} applied</span>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveCoupon}
              className="text-red-500"
            >
              Remove
            </Button>
          </div>
        )}

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between text-red-500">
          <span>Discount</span>
          <span>-₹{discount}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{deliveryFee}</span>
        </div>

        <hr />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>

        <Button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-teal-800 text-white rounded-full"
        >
          {loading ? "Processing..." : `Pay ₹${finalTotal}`}
        </Button>
      </CardContent>
    </Card>
    </div>
  );
}