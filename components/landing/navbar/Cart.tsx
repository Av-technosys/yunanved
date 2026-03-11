'use client'

import { Button } from "@/components/ui/button"
import {  ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartIcon() {
  const totalItems = useCartStore((s) => s.lineItems());
    
  return (
    <div className="relative cursor-pointer p-2">
      <Link href={"/cart"}>
        <Button className=" rounded-full h-11 w-11">
          <ShoppingCart size={20} />
        </Button>
        {/* Notification Badge */}

        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold min-w-5 h-5 px-1 flex items-center justify-center rounded-full border-2 border-white">
            {totalItems}
          </span>
        )}
      </Link>
    </div>
  )
}
