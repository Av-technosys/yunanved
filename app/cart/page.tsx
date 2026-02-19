"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Navbar from "@/components/landing/Navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Trash2, Loader2, RotateCcw, Star } from "lucide-react"; // Added Loader2
import { Card, CardDescription, CardFooter } from "@/components/ui/card";
import { getProductsForCart } from "@/helper/index";
import { useEffect, useMemo, useState, useTransition } from "react";
import {
  increaseCartItem,
  decreaseCartItem,
  removeCartItem
} from "@/helper/index";

import { toast } from "sonner";
import emptyCart from "../../public/emptycart.png";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useIsClient } from "../hooks/useIsClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/landing/Footer";
import { tempUserId } from "@/const/globalconst";

const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Cart", href: "/cart" },
];

export default function CartPage() {
  const isClient = useIsClient();
  const [isPending, startTransition] = useTransition();

  const userId = tempUserId; // later from auth/session

  const items = useCartStore((s) => s.items);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const removeItem = useCartStore((s) => s.removeItem);

  const [freshProducts, setFreshProducts] = useState<any[]>([]);
const [isFetching, setIsFetching] = useState(false);

const productSlugs = useMemo(
  () => items.map(i => i.slug).sort().join("|"),
  [items]
);

useEffect(() => {
  let cancelled = false;

  async function load() {
    if (!items.length) {
      setFreshProducts([]);
      return;
    }

    setIsFetching(true);

    const data = await getProductsForCart(items.map((i) => i.slug));
    if (!cancelled) {
      setFreshProducts(data || []);
      setIsFetching(false);
    }
  }

  load();

  return () => {
    cancelled = true;
  };
}, [productSlugs]);



  const productMap = useMemo(() => {
    return new Map(freshProducts.map((p) => [p.slug, p]));
  }, [freshProducts]);


  const handleIncrease = (item: any) => {

  increase(item.productId, item.attributes);


  startTransition(async () => {
    try {
      await increaseCartItem(userId, item.productId);
    } catch (e) {
      console.log("error", e)
      decrease(item.productId, item.attributes);
      toast.error("Failed to update quantity");
    }
  });
};

const handleDecrease = (item: any) => {
  decrease(item.productId, item.attributes);

  startTransition(async () => {
    try {
      await decreaseCartItem(userId, item.productId);
    } catch (e) {
      console.log(e)
      increase(item.productId, item.attributes);
      toast.error("Failed to update quantity");
    }
  });
};


const handleRemove = (item: any) => {
  removeItem(item.productId, item.attributes);

  startTransition(async () => {
    try {
      await removeCartItem(userId, item.productId);
    } catch (e) {
      console.log(e)
      useCartStore.getState().addItem(item);
      toast.error("Failed to remove item");
    }
  });
};

  const subtotal = useMemo(() => {
    let total = 0;
    for (const item of items) {
      const live = productMap.get(item.slug);
      if (!live) continue;
      total += live.basePrice * item.quantity;
    }
    return total;
  }, [items, productMap]);

  const discount = subtotal * 0.2;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Navbar />
        <div className="max-w-6xl px-2 md:px-4 lg:px-0 mx-auto ">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item, index) => (
                <div className="flex items-center justify-center gap-1" key={index}>
                  <BreadcrumbItem>
                    <Link href={item.href}>{item.name}</Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {items.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <div className="flex flex-col items-center gap-4 ">
              <Image src={emptyCart} alt={"empty cart"} width={100} height={70} className="rounded-lg bg-gray-100" />
              <h1 className="font-bold text-xl">Your Cart is Empty</h1>
              <p className="text-gray-600">Looks like your cart is empty. Start shopping to add items</p>
              <Button className="bg-teal-700 text-white py-2 px-3 rounded-full font-medium hover:bg-teal-800">
                <Link href="/category">Start Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 px-2 md:px-4 lg:px-0 mb-5 mt-2 max-w-6xl mx-auto gap-6">
              <Card className="col-span-3 md:col-span-2 bg-white rounded-xl p-6 space-y-4">
                <h1 className="text-lg w-full h-full font-semibold">Your cart</h1>
<CardDescription>
    {isFetching ? (
      <div className="flex flex-col  items-center justify-center py-10 gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-teal-700" />
        <p className="text-sm text-muted-foreground">Loading your cart...</p>
      </div>
    ) : (
      items.map((item: any) => {
        const live = productMap.get(item.slug);
        
        // Safety check in case productMap isn't populated yet
        if (!live) return null;

        return (
      <div key={item.productId + JSON.stringify(item.attributes)} className="group">
    <hr className="mb-4" />
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 gap-4">
      
      {/* Product Image & Details */}
      <div className="flex flex-1 items-start gap-4">
        <div className="relative h-24 w-24 flex-shrink-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${live.bannerImage}`}
            alt={live.name}
            fill
            className="rounded-lg bg-gray-100 object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-900 text-base">{live.name}</p>
            {live.rating > 0 && (
              <div className="flex items-center gap-1 bg-green-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-green-700">
                {live.rating} <Star size={10} fill="currentColor" />
              </div>
            )}
          </div>
          
          <p className="text-md text-gray-500 line-clamp-1 italic">
            {live.description}
          </p>

          <div className="flex items-center gap-4 mt-1">
            <p className="font-bold text-black">₹{live.basePrice}</p>
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

      {/* Quantity Controls & Delete */}
      <div className="flex items-center justify-between w-full md:w-auto gap-6">
        <div className="flex items-center gap-3 bg-gray-50 border rounded-full px-2 py-1">
          <button
           disabled={isPending}
            onClick={() => handleDecrease(item)}
            className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-gray-600"
          >
            −
          </button>
          <span className="w-4 text-center text-sm font-semibold">{item.quantity}</span>
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
        );
      })
    )}
  </CardDescription>
              </Card>

              <Card className="col-span-3 md:col-span-1 bg-white rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>

                <CardDescription className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toFixed(0)}</span>
                  </div>

                  <div className="flex justify-between text-sm text-red-500">
                    <span>Discount (-20%)</span>
                    <span>-₹ {discount.toFixed(0)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>₹ {deliveryFee}</span>
                  </div>

                  <hr />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹ {total.toFixed(0)}</span>
                  </div>
                </CardDescription>
                <CardFooter className="w-full">
                  <Link href="/checkout" className="w-full block">
                    <Button className="w-full text-[16px] md:text-[11px] lg:text-[16px] bg-teal-800 text-white py-3 rounded-full mt-4 hover:bg-teal-900">Proceed to Checkout</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <Separator />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
