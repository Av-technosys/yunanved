/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input } from "@/components/ui";

export default function CouponInput({
  couponCode,
  setCouponCode,
  handleApplyCoupon,
}: any) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter coupon code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <Button onClick={handleApplyCoupon}>Apply</Button>
    </div>
  );
}