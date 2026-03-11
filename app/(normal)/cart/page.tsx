/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { getProductsForCart, increaseCartItem, decreaseCartItem, removeCartItem } from "@/helper"
import { useCartStore } from "@/store/cartStore"
import { useCheckoutStore } from "@/store/checkoutStore"
import { useClientSideUser } from "@/hooks/getClientSideUser"
import { useIsClient } from "@/hooks/useIsClient"

import { Card, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { toast } from "sonner"

import EmptyCart from "@/components/cart/EmptyCart"
import CartItemsSection from "@/components/cart/CartItemsList"
import OrderSummaryCard from "@/components/cart/OrderSummary"

export default function CartPage() {

  const isClient = useIsClient()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const { userDetails } = useClientSideUser()
  const userId = userDetails?.id

  const items = useCartStore((s) => s.items)
  const increase = useCartStore((s) => s.increase)
  const decrease = useCartStore((s) => s.decrease)
  const removeItem = useCartStore((s) => s.removeItem)

  const initializeCheckout = useCheckoutStore((s) => s.initializeCheckout)

  const [freshProducts, setFreshProducts] = useState<any[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const productKeys = useMemo(
    () => items.map((i) => i.productId).sort().join("|"),
    [items]
  )

  useEffect(() => {
    let cancelled = false

    async function load() {

      if (!items.length) {
        setFreshProducts([])
        return
      }

      setIsFetching(true)

      const data = await getProductsForCart(
        items.map((i) => i.productId)
      )

      if (!cancelled) {
        setFreshProducts(data || [])
        setIsFetching(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }

  }, [productKeys])

  const productMap = useMemo(
    () => new Map(freshProducts.map((p) => [p.id, p])),
    [freshProducts]
  )

  const handleIncrease = (item: any) => {

    increase(item.productId, item.attributes)

    startTransition(async () => {
      try {
        await increaseCartItem(userId, item.productId)
      } catch {
        decrease(item.productId, item.attributes)
        toast.error("Failed to update quantity")
      }
    })
  }

  const handleDecrease = (item: any) => {

    decrease(item.productId, item.attributes)

    startTransition(async () => {
      try {
        await decreaseCartItem(userId, item.productId)
      } catch {
        increase(item.productId, item.attributes)
        toast.error("Failed to update quantity")
      }
    })
  }

  const handleRemove = (item: any) => {

    removeItem(item.productId, item.attributes)

    startTransition(async () => {
      try {
        await removeCartItem(userId, item.productId)
      } catch {
        useCartStore.getState().addItem(item)
        toast.error("Failed to remove item")
      }
    })
  }

  const subtotal = useMemo(() => {

    let total = 0

    for (const item of items) {

      const live = productMap.get(item.productId)

      if (!live) continue

      total += live.basePrice * item.quantity
    }

    return total

  }, [items, productMap])

  const discount = subtotal * 0.2
  const deliveryFee = subtotal > 0 ? 15 : 0
  const total = subtotal - discount + deliveryFee

  const moveToCheckOut = () => {

    initializeCheckout({
      items: items.map((item) => {

        const live = productMap.get(item.productId)

        return {
          productId: item.productId,
          slug: live?.slug,
          quantity: item.quantity,
          price: live?.basePrice || 0,
        }
      }),
      total,
      userId,
    })

    router.push("/checkout")
  }

  if (!isClient) return null

  if (items.length === 0) return <EmptyCart />

  return (

    <div className="flex flex-col">

      <div className="flex-1">

        <div className="grid grid-cols-3 px-2 md:px-4 lg:px-0 mb-5 mt-2 max-w-6xl mx-auto gap-6">

          <Card className="col-span-3 md:col-span-2 bg-white rounded-xl p-6 space-y-4">

            <h1 className="text-lg w-full h-full font-semibold">
              Your cart
            </h1>

            <CardDescription>

              <CartItemsSection
                items={items}
                productMap={productMap}
                isFetching={isFetching}
                isPending={isPending}
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
                handleRemove={handleRemove}
              />

            </CardDescription>

          </Card>

          <OrderSummaryCard
            subtotal={subtotal}
            discount={discount}
            deliveryFee={deliveryFee}
            total={total}
            loading={isFetching}
            isPending={isPending}
            moveToCheckOut={moveToCheckOut}
          />

        </div>

        <Separator />

      </div>

    </div>
  )
}