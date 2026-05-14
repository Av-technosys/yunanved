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
  SheetTitle,
} from "@/components/ui/sheet";

import { Filter, X } from "lucide-react";
import { FILTERS } from "@/const/category";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export function FilterSidebar() {
  const router = useRouter();
  const search = useSearchParams();

  // Get initial values from URL
  const initialCategories = search.get("cat")?.split(",").filter(Boolean) || [];
  const initialMin = search.get("min") || "0";
  const initialMax = search.get("max") || "100000";

  // Local state for temporary filters
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(initialMin),
    Number(initialMax),
  ]);
  const [isOpen, setIsOpen] = useState(false);

  // Reset local state when sheet opens (sync with URL)
  useEffect(() => {
    if (isOpen) {
      setSelectedCategories(
        search.get("cat")?.split(",").filter(Boolean) || [],
      );
      setPriceRange([
        Number(search.get("min") || "0"),
        Number(search.get("max") || "100000"),
      ]);
    }
  }, [isOpen, search]);

  const handleToggleCategory = (item: string) => {
    const updated = selectedCategories.includes(item)
      ? selectedCategories.filter((i) => i !== item)
      : [...selectedCategories, item];

    setSelectedCategories(updated);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleApplyFilters = useCallback(() => {
    const params = new URLSearchParams(search.toString());

    // Apply categories
    if (selectedCategories.length) {
      params.set("cat", selectedCategories.join(","));
    } else {
      params.delete("cat");
    }

    // Apply price range
    if (priceRange[0] !== 0) {
      params.set("min", String(priceRange[0]));
    } else {
      params.delete("min");
    }

    if (priceRange[1] !== 100000) {
      params.set("max", String(priceRange[1]));
    } else {
      params.delete("max");
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    // Use replaceState to update URL without triggering navigation/re-render
    window.history.replaceState(null, "", newUrl);

    // Close sheet
    setIsOpen(false);

    // Manually trigger a refresh of the page data
    // This is a hack but prevents full re-render
    router.refresh();
  }, [selectedCategories, priceRange, search, router]);

  const handleClearAndApply = useCallback(() => {
    // Clear URL params using replaceState
    window.history.replaceState(null, "", window.location.pathname);

    // Close sheet
    setIsOpen(false);

    // Refresh the page data
    router.refresh();
  }, [router]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <span className="lg:hidden flex items-center gap-1 cursor-pointer">
          Filter <Filter className="h-5 w-5" />
        </span>
      </SheetTrigger>

      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-72 h-full p-0 flex flex-col bg-white"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <SheetTitle className="text-lg font-semibold">Filter</SheetTitle>
          <SheetClose asChild>
            <button type="button" className="p-1 rounded-md hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <Accordion type="single" collapsible defaultValue={FILTERS[0]?.key}>
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
                        onCheckedChange={() => handleToggleCategory(item)}
                        id={`mobile-${filter.key}-${item}`}
                      />

                      <Label
                        className="capitalize"
                        htmlFor={`mobile-${filter.key}-${item}`}
                      >
                        {item}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}

            <AccordionItem value="price">
              <AccordionTrigger>Price</AccordionTrigger>

              <AccordionContent>
                <Slider
                  value={[priceRange[0], priceRange[1]]}
                  min={0}
                  max={100000}
                  step={100}
                  onValueChange={handlePriceChange}
                  className="w-full my-4"
                />

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
                  <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="border-t p-4 space-y-3">
          <Button
            type="button"
            onClick={handleApplyFilters}
            variant="default"
            className="w-full"
          >
            Apply Filter
          </Button>
          <Button
            type="button"
            onClick={handleClearAndApply}
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
