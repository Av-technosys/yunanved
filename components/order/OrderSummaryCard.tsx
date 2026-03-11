/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderSummaryCard({ orderData }: any) {

  return (
    <Card className="rounded-[24px] border-none shadow-sm p-8">

      <h3 className="font-bold text-[#1D4E4E] text-lg mb-4">
        Order Summary
      </h3>

      <div className="space-y-3">

        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{orderData.totalAmountPaid}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>₹0.00</span>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between text-xl font-bold text-[#1D4E4E]">
          <span>Total</span>
          <span className="text-amber-500">
            ₹{orderData.totalAmountPaid}
          </span>
        </div>

      </div>
    </Card>
  )
}