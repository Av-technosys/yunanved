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

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCategoryFilteredArray } from "@/helper/getCommaSepratedArray";
import { useEffect, useState } from "react";

interface SidebarFilterWebProps {
  categories?: Array<{ id: string; name: string; slug: string }>;
}

export function SidebarFilterWeb({ categories = [] }: SidebarFilterWebProps) {
  const search = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(search.get("min") || "0"),
    Number(search.get("max") || "100000"),
  ]);
  const searchQuery = search.toString();

  // Current selected filters from URL
  const selectedFilters = getCategoryFilteredArray({
    value: search.get("cat") || "",
  });

  // Separate categories and stock filters
  const categoryFilterValues = selectedFilters.filter(
    (item) => !["in-stock", "out-of-stock"].includes(item),
  );

  const stockFilters = selectedFilters.filter((item) =>
    ["in-stock", "out-of-stock"].includes(item),
  );

  // Local state
  const [selectedCategoriesClientArray, setSelectedCategoriesClientArray] =
    useState<string[]>(categoryFilterValues);

  const [selectedStockClientArray, setSelectedStockClientArray] =
    useState<string[]>(stockFilters);

  // Toggle category checkbox
  function handleCategoryCheckboxClick({ item }: { item: string }) {
    const newSelectedCategory = selectedCategoriesClientArray.includes(item)
      ? selectedCategoriesClientArray.filter((i) => i !== item)
      : [...selectedCategoriesClientArray, item];

    setSelectedCategoriesClientArray(newSelectedCategory);
  }

  // Toggle stock checkbox
  function handleStockCheckboxClick({ item }: { item: string }) {
    const newSelectedStock = selectedStockClientArray.includes(item)
      ? selectedStockClientArray.filter((i) => i !== item)
      : [...selectedStockClientArray, item];

    setSelectedStockClientArray(newSelectedStock);
  }

  // Debounce changes
  const filteredCategoryDebounceValue = useDebounce(
    selectedCategoriesClientArray,
    700,
  );

  const filteredStockDebounceValue = useDebounce(selectedStockClientArray, 700);

  // Update URL when filters change
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(min-width: 768px)").matches
    ) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchQuery);

    // Combine categories and stock filters
    const allFilters = [
      ...filteredCategoryDebounceValue,
      ...filteredStockDebounceValue,
    ];

    if (allFilters.length > 0) {
      newSearchParams.set("cat", allFilters.join(","));
    } else {
      newSearchParams.delete("cat");
    }

    if (priceRange[0] !== 0) {
      newSearchParams.set("min", String(priceRange[0]));
    } else {
      newSearchParams.delete("min");
    }

    if (priceRange[1] !== 100000) {
      newSearchParams.set("max", String(priceRange[1]));
    } else {
      newSearchParams.delete("max");
    }

    const nextQuery = newSearchParams.toString();

    if (searchQuery !== nextQuery) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    }
  }, [
    filteredCategoryDebounceValue,
    filteredStockDebounceValue,
    pathname,
    priceRange,
    router,
    searchQuery,
  ]);

  // Clear all filters
  const handleClearFilter = () => {
    setSelectedCategoriesClientArray([]);
    setSelectedStockClientArray([]);
    setPriceRange([0, 100000]);

    router.replace(pathname, { scroll: false });
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
                type="multiple"
                defaultValue={["categories", "stock", "price"]}
                className="max-w-lg"
              >
                {/* Categories from Database */}
                {categories.length > 0 && (
                  <AccordionItem value="categories">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      {categories.map((category) => (
                        <div
                          key={category.slug}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={selectedCategoriesClientArray.includes(
                              category.slug,
                            )}
                            onCheckedChange={() =>
                              handleCategoryCheckboxClick({
                                item: category.slug,
                              })
                            }
                            id={`category-${category.slug}`}
                          />
                          <Label
                            className="capitalize"
                            htmlFor={`category-${category.slug}`}
                          >
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Stock Filter */}
                <AccordionItem value="stock">
                  <AccordionTrigger>Stock</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedStockClientArray.includes("in-stock")}
                        onCheckedChange={() =>
                          handleStockCheckboxClick({ item: "in-stock" })
                        }
                        id="stock-in-stock"
                      />
                      <Label htmlFor="stock-in-stock">In Stock</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedStockClientArray.includes(
                          "out-of-stock",
                        )}
                        onCheckedChange={() =>
                          handleStockCheckboxClick({ item: "out-of-stock" })
                        }
                        id="stock-out-of-stock"
                      />
                      <Label htmlFor="stock-out-of-stock">Out of Stock</Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Price Filter */}
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
