// components/admin/mobile-sidebar.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Label,
} from "@/components/ui";

import { Button } from "@/components/ui";

import {
  Sheet,
  SheetClose,
  SheetContent,

  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui";
import { Filter, Menu, X } from "lucide-react";
import { FILTERS } from "@/const/category";

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
          <Accordion
            type="single"
            collapsible
            defaultValue="fashion"
            className="max-w-lg"
          >
            {FILTERS.map((filter) => (
              <AccordionItem key={filter.key} value={filter.key}>
                <AccordionTrigger>{filter.title}</AccordionTrigger>

                <AccordionContent className="space-y-3">
                  {filter.options.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox id={`${filter.key}-${item}`} />
                      <Label htmlFor={`${filter.key}-${item}`}>{item}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}

            {/* Price (separate because it's a slider) */}
            <AccordionItem value="price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                <Slider
                  defaultValue={[50, 200]}
                  max={1000}
                  step={5}
                  className="w-full my-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹50</span>
                  <span>₹1000</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="border-t p-4 space-y-3 ">
          <Button className="w-full bg-(--bg-product-button)]">
            Apply Filter
          </Button>

          <Button
            variant="outline"
            className="w-full text-(--bg-product-button) border-(--bg-product-button)"
          >
            Clear Filter
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
