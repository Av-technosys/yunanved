"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/landing/Navbar";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type Address = {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
};

const addresses: Address[] = [
  {
    id: "home",
    label: "Home",
    name: "John Doe",
    phone: "+91 6958362514",
    address: "123, Downtown, Mansarovar Jaipur, Rajasthan, 302058",
  },
  {
    id: "work",
    label: "Work",
    name: "John Doe",
    phone: "+91 6958362514",
    address: "123, Downtown, Mansarovar Jaipur, Rajasthan, 302058",
  },
  {
    id: "shop",
    label: "Shop",
    name: "John Doe",
    phone: "+91 6958362514",
    address: "123, Downtown, Mansarovar Jaipur, Rajasthan, 302058",
  },
];

const breadcrumb = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Cart",
    href: "/cart",
  },
  {
    name: "Checkout",
    href: "/checkout",
  },
];

export default function Checkout() {
  const [selected, setSelected] = useState("home");

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 ">
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
        <div className="max-w-6xl  px-2 md:px-4 lg:px-0 mx-auto grid grid-cols-3 gap-6 md:gap-3 lg:gap-6">
          <div className="col-span-3 md:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Checkout</h2>
              <Button variant="link" className="text-sm">
                + Add New
              </Button>
            </div>

            <h3 className="text-sm font-semibold text-gray-700">
              Shipping Address
            </h3>

            <RadioGroup
              value={selected}
              onValueChange={setSelected}
              className="space-y-3"
            >
              {addresses.map((item) => {
                const isActive = selected === item.id;

                return (
                  <Card
                    key={item.id}
                    className={`transition border cursor-pointer
                ${isActive ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                  >
                    <CardContent className="p-4 flex gap-3 items-start justify-between">
                      <div className="w-full flex gap-3 items-start">
                        <RadioGroupItem
                          value={item.id}
                          id={item.id}
                          className="mt-1"
                        />

                        <Label
                          htmlFor={item.id}
                          className="flex flex-col items-start gap-0 justify-start cursor-pointer "
                        >
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-gray-600">
                            {item.name} · {item.phone}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.address}
                          </p>
                        </Label>
                      </div>

                      <Button variant="link" size="sm">
                        Edit
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </RadioGroup>
          </div>

          <div className="col-span-3  md:col-span-1  flex flex-col items-center justify-end">
            <Card className="w-full">
              <CardContent className="p-6  space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Enter coupon code" />
                  <Button>Apply</Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$565</span>
                  </div>

                  <div className="flex justify-between text-red-500">
                    <span>Discount (-20%)</span>
                    <span>- $113</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$15</span>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>$467</span>
                </div>

                {/* <Button className="w-full rounded-full bg-teal-800 hover:bg-teal-900">
                  <Link href="/order-confirmation"> Continue</Link>
                </Button> */}
                <Link href="/order-confirmation">
                  <Button className="w-full text-[16px] md:text-[11px] lg:text-[16px] bg-teal-800 text-white py-3  rounded-full mt-4 hover:bg-teal-900">
                    Continue
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="max-w-6xl w-full px-2 md:px-4 lg:px-0 my-5 mx-auto text-gray-600 flex flex-wrap items-center justify-center  md:justify-between">
        <div>© 2024 Yunanved. All rights reserved.</div>
        <div>Privacy Policy | Terms & Conditions | Shipping Policy</div>
      </div>
    </div>
  );
}
