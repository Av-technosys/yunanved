/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card"
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env"

export default function OrderItemsTable({ orderData }: any) {

  const S3_BASE = NEXT_PUBLIC_S3_BASE_URL

  return (
    <Card className="lg:col-span-12 rounded-[24px] border-none shadow-sm p-8 overflow-hidden">

      <div className="flex justify-between text-sm font-semibold text-gray-400 mb-6 px-4">
        <span className="w-1/2">Product</span>
        <span className="w-1/4 text-center">Quantity</span>
        <span className="w-1/4 text-right">Total</span>
      </div>

      <div className="space-y-6">

        {orderData?.items?.map((item: any) => (

          <div key={item.id} className="flex items-center px-4">

            <div className="w-1/2 flex items-center gap-4">

              <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden">

                <img
                  src={`${S3_BASE}/${item.productImage}`}
                  className="object-cover h-full w-full"
                  alt="product"
                />

              </div>

              <div>
                <p className="font-bold text-[#1D4E4E]">
                  {item.product?.name || item.productName}
                </p>

                <p className="text-xs text-gray-400">
                  {item.product?.sku || "No SKU"}
                </p>
              </div>

            </div>

            <span className="w-1/4 text-center text-gray-600">
              {item.quantity}x
            </span>

            <span className="w-1/4 text-right font-bold text-[#1D4E4E]">
              ₹{item.productPrice}
            </span>

          </div>

        ))}

      </div>

    </Card>
  )
}