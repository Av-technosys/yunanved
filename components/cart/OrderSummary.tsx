/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function OrderSummaryCard({
  subtotal,
  discount,
  deliveryFee,
  total,
  loading,
  isPending,
  moveToCheckOut,
}: any) {

  return (
    <Card className="col-span-3 md:col-span-1 bg-white rounded-xl p-6 space-y-4">

      <h2 className="text-lg font-semibold">Order Summary</h2>

      <CardDescription className="flex flex-col gap-2">

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          {loading ? (
            <Skeleton className="h-4 w-16" />
          ) : (
            <span>₹ {subtotal.toFixed(0)}</span>
          )}
        </div>

        <div className="flex justify-between text-sm text-red-500">
          <span>Discount (-20%)</span>
          {loading ? (
            <Skeleton className="h-4 w-16" />
          ) : (
            <span>-₹ {discount.toFixed(0)}</span>
          )}
        </div>

        <div className="flex justify-between text-sm">
          <span>Delivery Fee</span>
          {loading ? (
            <Skeleton className="h-4 w-12" />
          ) : (
            <span>₹ {deliveryFee}</span>
          )}
        </div>

        <hr />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          {loading ? (
            <Skeleton className="h-5 w-20" />
          ) : (
            <span>₹ {total.toFixed(0)}</span>
          )}
        </div>

      </CardDescription>

      <CardFooter className="w-full">

        {loading ? (
          <Skeleton className="h-11 w-full rounded-full mt-4" />
        ) : (
          <Button
            disabled={isPending}
            onClick={moveToCheckOut}
            className="w-full text-[16px] md:text-[11px] lg:text-[16px] bg-teal-800 text-white py-3 rounded-full mt-4 hover:bg-teal-900"
          >
            {isPending ? "Processing" : "Proceed to Checkout"}
          </Button>
        )}

      </CardFooter>

    </Card>
  )
}