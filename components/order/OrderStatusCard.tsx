/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card } from "@/components/ui"
import { Button } from "@/components/ui"
import { CheckCircle2, Circle } from "lucide-react"
import { useRouter } from "next/navigation"

export  function OrderStatusCard({ orderData, setOrderReview }: any) {

  const router = useRouter()

  return (
    <Card className="lg:col-span-5 rounded-[24px] border-none shadow-sm p-4 flex flex-col justify-between min-h-[300px]">

      <div>
        <h1 className="text-sm font-bold text-[#1D4E4E]">
          Order #{orderData.id.toUpperCase()}
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Placed on{" "}
          {new Date(orderData.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        <div className="mt-7 space-y-8 ml-2">

          {[
            {
              label: "Order Confirmed",
              date: orderData.createdAt,
              done: true,
            },
            {
              label: "Order Shipped",
              date: orderData.updatedAt,
              done:
                orderData.status === "shipped" ||
                orderData.status === "delivered",
            },
            {
              label: "Out for Delivery",
              date: "",
              done:
                orderData.status === "out_for_delivery" ||
                orderData.status === "delivered",
            },
            {
              label: "Delivered",
              date: "",
              done: orderData.status === "delivered",
            },
          ].map((step, i, arr) => (

            <div key={i} className="relative flex gap-4 items-start">

              {i !== arr.length - 1 && (
                <div
                  className={`absolute left-[11px] top-6 w-[2px] h-10 ${
                    step.done ? "bg-[#00B050]" : "bg-gray-200"
                  }`}
                />
              )}

              {step.done ? (
                <CheckCircle2
                  className="text-[#00B050] z-10 bg-white"
                  size={24}
                />
              ) : (
                <Circle
                  className="text-gray-300 z-10 bg-white"
                  size={24}
                />
              )}

              <div>
                <p
                  className={`font-semibold ${
                    step.done ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>

                {step.date && (
                  <p className="text-xs text-gray-400">
                    {new Date(step.date).toLocaleDateString()}
                  </p>
                )}
              </div>

            </div>
          ))}

        </div>
      </div>

      <div className="flex gap-4 mt-8">

        {orderData.status === "delivered" ? (
          <Button
            onClick={() => router.push(`/invoice/${orderData.id}`)}
            className="flex-1 rounded-full h-12 bg-[#1D4E4E] text-white"
          >
            Invoice
          </Button>
        ) : (
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex-1 rounded-full h-12"
          >
            Cancel
          </Button>
        )}

        {orderData.status === "delivered" ? (
          <Button
            onClick={() => setOrderReview(true)}
            className="flex-1 rounded-full h-12 bg-[#1D4E4E]"
          >
            Review
          </Button>
        ) : (
          <Button className="flex-1 rounded-full h-12 bg-[#1D4E4E]">
            Track Order
          </Button>
        )}

      </div>
    </Card>
  )
}