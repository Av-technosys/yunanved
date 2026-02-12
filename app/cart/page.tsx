"use client";
import Navbar from "@/components/landing/Navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import prod1 from "@/public/prod1.png";
import prod2 from "@/public/prod2.png";
import prod3 from "@/public/prod3.png";
import { Card, CardDescription, CardFooter } from "@/components/ui/card";

import emptyCart from "../../public/emptycart.png";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type initialCartItemsProps = [] | any;

const initialCartItems: initialCartItemsProps = [
  {
    id: 1,
    name: "Wireless Boat Headphone",
    image: prod1,
    size: "Large",
    color: "White",
    price: 145,
    quantity: 1,
  },
  {
    id: 2,
    name: "Fortune Atta",
    image: prod2,
    size: "Medium",
    color: "Red",
    price: 180,
    quantity: 1,
  },
  {
    id: 3,
    name: "Slim Fit Jeans",
    image: prod3,
    size: "Large",
    color: "Blue",
    price: 240,
    quantity: 1,
  },
];

// const initialCartItems: initialCartItemsProps = [];

const breadcrumb = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Cart",
    href: "/cart",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const increaseQty = (id: any) => {
    setCartItems((prev: any) =>
      prev.map((item: any) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id: any) => {
    setCartItems((prev: any) =>
      prev.map((item: any) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = (id: any) => {
    setCartItems((prev: any) => prev.filter((item: any) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum: any, item: any) => sum + item.price * item.quantity,
    0,
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Navbar />
        <div className="max-w-6xl px-2 md:px-4 lg:px-0 mx-auto ">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item, index) => (
                <div
                  className="flex items-center justify-center gap-1"
                  key={index}
                >
                  <BreadcrumbItem>
                    <Link href={item.href}>{item.name}</Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {initialCartItems.length === 0 ? (
          <div className="flex justify-center  items-center h-96">
            <div className="flex flex-col items-center gap-4 ">
              <Image
                src={emptyCart}
                alt={"empty cart"}
                width={100}
                height={70}
                className="rounded-lg bg-gray-100"
              />

              <h1 className="font-bold text-xl">Your Cart is Empty</h1>
              <p className="text-gray-600">
                Looks like your cart is empty. Start shopping to add items
              </p>
              <Button className=" bg-teal-700 text-white py-2  px-3 rounded-full font-medium hover:bg-teal-800">
                <Link href="/category">Start Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 px-2 md:px-4 lg:px-0 mb-5 mt-2 max-w-6xl mx-auto gap-6">
              <Card className="col-span-3 md:col-span-2 bg-white rounded-xl p-6 space-y-4">
                <h1 className="text-lg w-full h-full font-semibold">
                  Your cart
                </h1>

                <CardDescription>
                  {cartItems.map((item: any) => (
                    <div key={item.id}>
                      <hr className="mb-2" />
                      <div className="flex justify-between items-center  pb-4">
                        <div className="flex w-full items-center  gap-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={70}
                            className="rounded-lg bg-gray-100"
                          />

                          <div className="text-sm">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gray-500">Size: {item.size}</p>
                            <p className="text-gray-500">Color: {item.color}</p>
                            <p className="font-semibold mt-1">${item.price}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="px-3 py-1 rounded-full bg-gray-100"
                          >
                            −
                          </button>

                          <span className="w-6 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQty(item.id)}
                            className="px-3 py-1 rounded-full bg-gray-100"
                          >
                            +
                          </button>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 ml-2"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardDescription>
              </Card>

              <Card className="col-span-3 md:col-span-1  bg-white rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>

                <CardDescription className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(0)}</span>
                  </div>

                  <div className="flex justify-between text-sm text-red-500">
                    <span>Discount (-20%)</span>
                    <span>-${discount.toFixed(0)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee}</span>
                  </div>

                  <hr />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(0)}</span>
                  </div>
                </CardDescription>
                <CardFooter className="w-full ">
                  <Link href="/checkout" className="w-full block">
                    <Button className="w-full text-[16px] md:text-[11px] lg:text-[16px] bg-teal-800 text-white py-3  rounded-full mt-4 hover:bg-teal-900">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <Separator />
          </>
        )}
      </div>
      <div className="max-w-6xl px-2 md:px-4 lg:px-2 w-full my-5 mx-auto text-gray-600 flex flex-wrap items-center justify-center md:justify-between">
        <div>© 2024 Yunanved. All rights reserved.</div>
        <div>Privacy Policy | Terms & Conditions | Shipping Policy</div>
      </div>
    </div>
  );
}
