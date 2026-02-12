// components/admin/mobile-sidebar.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Filter, Menu, X } from "lucide-react";

export function FilterSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="lg:hidden flex items-center gap-1 justify-between">
          Filter <Filter className="h-5 w-5" />
        </span>
      </SheetTrigger>

      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-72 h-full p-0 flex flex-col bg-white"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b bg-white">
          <h2 className="text-lg font-semibold">Filter</h2>

          <SheetClose asChild>
            <button className="p-1 rounded-md hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto px-4 ">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="fashion">
              <AccordionTrigger>Fashion</AccordionTrigger>
              <AccordionContent>Content here</AccordionContent>
            </AccordionItem>

            <AccordionItem value="grocery">
              <AccordionTrigger>Grocery</AccordionTrigger>
              <AccordionContent>Content here</AccordionContent>
            </AccordionItem>

            <AccordionItem value="electronics">
              <AccordionTrigger>Electronics</AccordionTrigger>
              <AccordionContent>Content here</AccordionContent>
            </AccordionItem>

            <AccordionItem value="beauty">
              <AccordionTrigger>Beauty</AccordionTrigger>
              <AccordionContent>
                Reach us via email, live chat, or phone. We respond within 24
                hours during business days.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                <Slider
                  defaultValue={[50, 200]}
                  max={1000}
                  step={5}
                  className="w-full my-4"
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="avaliablity">
              <AccordionTrigger>Avaliablity</AccordionTrigger>
              <AccordionContent>
                <span>In Stock</span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="border-t p-4 space-y-3 bg-white">
          <Button className="w-full bg-[#235A62] hover:bg-[#235A62]">
            Apply Filter
          </Button>

          <Button
            variant="outline"
            className="w-full text-[#235A62] border-[#235A62] hover:bg-white"
          >
            Clear Filter
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
