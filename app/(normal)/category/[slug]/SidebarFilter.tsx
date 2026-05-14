"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  Checkbox,
  Label,
  useDebounce,
} from "@/components/ui";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui";
import { Separator } from "@/components/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { Slider } from "@/components/ui";

import { FILTERS } from "@/const/category";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategoryFilteredArray } from "@/helper/getCommaSepratedArray";
import { useEffect, useState } from "react";

export function SidebarFilterWeb() {
  const search = useSearchParams();
  const router = useRouter();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  // Current selected categories from URL
  const selectedCategory = getCategoryFilteredArray({
    value: search.get("cat") || "",
  });

  // Local state
  const [selectedCategoriesClientArray, setSelectedCategoriesClientArray] =
    useState<string[]>(selectedCategory);

  // Keep state in sync when URL changes
  useEffect(() => {
    setSelectedCategoriesClientArray(selectedCategory);
  }, [search.toString()]);

  // Toggle checkbox
  function handleCheckboxClick({ item }: { item: string }) {
    const newSelectedCategory = selectedCategoriesClientArray.includes(item)
      ? selectedCategoriesClientArray.filter((i) => i !== item)
      : [...selectedCategoriesClientArray, item];

    setSelectedCategoriesClientArray(newSelectedCategory);
  }

  // Debounce changes
  const filteredCategoryDebounceValue = useDebounce(
    selectedCategoriesClientArray,
    700,
  );

  // Update URL when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams(search.toString());

    // Categories
    if (filteredCategoryDebounceValue.length > 0) {
      newSearchParams.set("cat", filteredCategoryDebounceValue.join(","));
    } else {
      newSearchParams.delete("cat");
    }

    // Price range
    newSearchParams.set("min", String(priceRange[0]));
    newSearchParams.set("max", String(priceRange[1]));

    const currentQuery = search.toString();
    const nextQuery = newSearchParams.toString();

    if (currentQuery !== nextQuery) {
      router.push(`?${nextQuery}`);
    }
  }, [filteredCategoryDebounceValue, priceRange, router, search]);
  // Clear all filters
const handleClearFilter = () => {
  setSelectedCategoriesClientArray([]);
  setPriceRange([0, 100000]);

  router.push(window.location.pathname);
};

  return (
    <div className="flex flex-col gap-3">
      <div className="sticky top-4">
        <Card>
          <CardContent>
            <CardTitle className="flex w-full my-5 items-center justify-between">
              <strong>Filter</strong>
              <Filter />
            </CardTitle>

            <Separator />

            <CardDescription>
              <Accordion
                type="single"
                collapsible
                defaultValue={FILTERS[0]?.key}
                className="max-w-lg"
              >
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
                            checked={selectedCategoriesClientArray.includes(
                              item,
                            )}
                            onCheckedChange={() =>
                              handleCheckboxClick({ item })
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

                <AccordionItem value="price">
                  <AccordionTrigger>Price</AccordionTrigger>
                  <AccordionContent>
                    <Slider
                      value={priceRange}
                      onValueChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                      min={0}
                      max={100000}
                      step={100}
                      className="w-full my-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
                      <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardDescription>

            <Separator />

            <CardFooter>
              <div className="w-full flex flex-col gap-3 my-5">
                <Button className="w-full text-base md:text-xs lg:text-base bg-(--bg-product-button) hover:bg-(--bg-product-button-hover)">
                  Apply Filter
                </Button>

                <Button
                  variant="outline"
                  onClick={handleClearFilter}
                  className="w-full text-base md:text-xs lg:text-base text-(--bg-product-button) border-(--bg-product-button)"
                >
                  Clear Filter
                </Button>
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
