/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2, RotateCcw, Star, Trash2 } from "lucide-react"
import Image from "next/image"
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env"
import {CartItemSkeleton} from "./CartItemSkeleton"

export  function CartItemsSection({
  items,
  productMap,
  isFetching,
  isPending,
  handleIncrease,
  handleDecrease,
  handleRemove,
}: any) {
  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-2 gap-2">
        <>
    <CartItemSkeleton />
    <CartItemSkeleton />
    <CartItemSkeleton />
  </>
      </div>
    )
  }

  return(
  
  items.map((item: any) => {
    const live = productMap.get(item.productId)
    if (!live) return null

    return (
      <div
        key={item.productId + JSON.stringify(item.attributes)}
        className="group"
      >
        <hr className="mb-4" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 gap-4">

          <div className="flex flex-1 items-start gap-4">

            <div className="relative h-24 w-24 flex-shrink-0">
              <Image
                src={`${NEXT_PUBLIC_S3_BASE_URL}/${live.bannerImage}`}
                alt={live.name}
                fill
                className="rounded-lg bg-gray-100 object-cover"
              />
            </div>

            <div className="flex flex-col gap-1">

              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900 text-base">
                  {live.name}
                </p>

                {live.rating > 0 && (
                  <div className="flex items-center gap-1 bg-green-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-green-700">
                    {live.rating}
                    <Star size={10} fill="currentColor" />
                  </div>
                )}
              </div>

              <p className="text-md text-gray-500 line-clamp-1 italic">
                {live.description}
              </p>

              <div className="flex items-center gap-4 mt-1">
                <p className="font-bold text-black">
                  ₹{live.basePrice}
                </p>

                {live.isReturnable ? (
                  <span className="flex items-center gap-1 text-[10px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                    <RotateCcw size={10} />
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                    Non-returnable
                  </span>
                )}
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-6">

            <div className="flex items-center gap-3 bg-gray-50 border rounded-full px-2 py-1">

              <button
                disabled={isPending}
                onClick={() => handleDecrease(item)}
                className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-gray-600"
              >
                −
              </button>

              <span className="w-4 text-center text-sm font-semibold">
                {item.quantity}
              </span>

              <button
                disabled={isPending}
                onClick={() => handleIncrease(item)}
                className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-gray-600"
              >
                +
              </button>

            </div>

            <button
              disabled={isPending}
              onClick={() => handleRemove(item)}
              className="p-2 text-red-500 bg-red-50 rounded-full transition-colors"
            >
              <Trash2 size={18} />
            </button>

          </div>

        </div>
      </div>
    )
  })
)
}