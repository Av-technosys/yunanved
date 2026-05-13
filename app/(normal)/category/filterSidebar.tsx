"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Label,
  Button,
  Slider,
} from "@/components/ui";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Filter, X } from "lucide-react";
import { FILTERS } from "@/const/category";

import { useRouter, useSearchParams } from "next/navigation";

export function FilterSidebar() {
  const router = useRouter();
  const search = useSearchParams();


  const selectedCategories =
    search.get("cat")?.split(",").filter(Boolean) || [];

  const min = search.get("min") || "0";
  const max = search.get("max") || "100000";


  const handleToggleCategory = (item: string) => {
    const current = search.get("cat")?.split(",").filter(Boolean) || [];

    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];

    const params = new URLSearchParams(search.toString());

    if (updated.length) {
      params.set("cat", updated.join(","));
    } else {
      params.delete("cat");
    }

    router.push(`?${params.toString()}`);
  };


  const handlePriceChange = (value: number[]) => {
    const params = new URLSearchParams(search.toString());

    params.set("min", String(value[0]));
    params.set("max", String(value[1]));

    router.push(`?${params.toString()}`);
  };


  const handleClear = () => {
    router.push(window.location.pathname);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="lg:hidden flex items-center gap-1">
          Filter <Filter className="h-5 w-5" />
        </span>
      </SheetTrigger>

      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-72 h-full p-0 flex flex-col bg-white"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-semibold">Filter</h2>

          <SheetClose asChild>
            <button className="p-1 rounded-md hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </SheetClose>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-4">
          <Accordion
            type="single"
            collapsible
            defaultValue={FILTERS[0]?.key}
          >
            {/* CATEGORY FILTER */}
            {FILTERS.map((filter) => (
              <AccordionItem key={filter.key} value={filter.key}>
                <AccordionTrigger>{filter.title}</AccordionTrigger>

                <AccordionContent className="space-y-3">
                  {filter.options.map((item) => (
                    <div
                      key={`${filter.key}-${item}`}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(item)}
                        onCheckedChange={() =>
                          handleToggleCategory(item)
                        }
                        id={`${filter.key}-${item}`}
                      />
                      <Label
                        className="capitalize"
                        htmlFor={`${filter.key}-${item}`}
                      >
                        {item}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}

            {/* PRICE FILTER */}
            <AccordionItem value="price">
              <AccordionTrigger>Price</AccordionTrigger>

              <AccordionContent>
                <Slider
                  value={[Number(min), Number(max)]}
                  max={100000}
                  step={100}
                  onValueChange={handlePriceChange}
                  className="w-full my-4"
                />

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{min}</span>
                  <span>₹{max}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* FOOTER */}
        <div className="border-t p-4 space-y-3">
          <Button
            onClick={() => router.push(search.toString())}
            className="w-full bg-(--bg-product-button)"
          >
            Apply Filter
          </Button>

          <Button
            onClick={handleClear}
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