/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui"
import { Separator } from "@/components/ui"

export  function OrderSummaryCard({ orderData }: any) {

  return (
    <Card className="rounded-[24px] border-none shadow-md p-8">

      <h3 className="font-bold text-black text-lg mb-4">
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

        <div className="flex justify-between text-xl font-bold text-black">
          <span>Total</span>
          <span className="text-[#02A9E5]">
            ₹{orderData.totalAmountPaid}
          </span>
        </div>

      </div>
    </Card>
  )
}
