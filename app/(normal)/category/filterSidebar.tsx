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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";

interface FilterSidebarProps {
  categories?: Array<{ id: string; name: string; slug: string }>;
  currentCategorySlug: string;
}

export function FilterSidebar({
  categories = [],
  currentCategorySlug,
}: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  // Get initial values from URL
  const initialFilters = search.get("cat")?.split(",").filter(Boolean) || [];
  const initialCategoriesFromUrl = initialFilters.filter(
    (item) => !["in-stock", "out-of-stock"].includes(item),
  );
  const initialCategories =
    initialCategoriesFromUrl.length > 0
      ? initialCategoriesFromUrl
      : [currentCategorySlug];
  const initialStock = initialFilters.filter((item) =>
    ["in-stock", "out-of-stock"].includes(item),
  );
  const initialMin = search.get("min") || "0";
  const initialMax = search.get("max") || "100000";

  // Local state for temporary filters
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);
  const [selectedStock, setSelectedStock] = useState<string[]>(initialStock);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(initialMin),
    Number(initialMax),
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      const filters = search.get("cat")?.split(",").filter(Boolean) || [];

      const categoriesFromUrl = filters.filter(
        (item) => !["in-stock", "out-of-stock"].includes(item),
      );

      setSelectedCategories(
        categoriesFromUrl.length > 0
          ? categoriesFromUrl
          : [currentCategorySlug],
      );
      setSelectedStock(
        filters.filter((item) => ["in-stock", "out-of-stock"].includes(item)),
      );
      setPriceRange([
        Number(search.get("min") || "0"),
        Number(search.get("max") || "100000"),
      ]);
    }

    setIsOpen(open);
  };

  const handleToggleCategory = (item: string) => {
    const updated = selectedCategories.includes(item)
      ? selectedCategories.filter((i) => i !== item)
      : [...selectedCategories, item];

    setSelectedCategories(updated);
  };

  const handleToggleStock = (item: string) => {
    const updated = selectedStock.includes(item)
      ? selectedStock.filter((i) => i !== item)
      : [...selectedStock, item];

    setSelectedStock(updated);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleClearFilter = () => {
    setSelectedCategories([]);
    setSelectedStock([]);
    setPriceRange([0, 100000]);
  };

  const handleApplyFilters = useCallback(() => {
    const params = new URLSearchParams(search.toString());

    // Combine categories and stock filters
    const allFilters = [...selectedCategories, ...selectedStock];

    if (allFilters.length) {
      params.set("cat", allFilters.join(","));
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

    const nextQuery = params.toString();
    const newUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

    // Close sheet
    setIsOpen(false);

    // Mobile keeps local state while editing and updates products only on Apply.
    router.replace(newUrl, { scroll: false });
  }, [selectedCategories, selectedStock, priceRange, search, pathname, router]);

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
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
          <Accordion
            type="multiple"
            defaultValue={["categories", "stock", "price"]}
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
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={() =>
                          handleToggleCategory(category.slug)
                        }
                        id={`mobile-category-${category.slug}`}
                      />

                      <Label
                        className="capitalize"
                        htmlFor={`mobile-category-${category.slug}`}
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
                    checked={selectedStock.includes("in-stock")}
                    onCheckedChange={() => handleToggleStock("in-stock")}
                    id="mobile-stock-in-stock"
                  />

                  <Label htmlFor="mobile-stock-in-stock">In Stock</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedStock.includes("out-of-stock")}
                    onCheckedChange={() => handleToggleStock("out-of-stock")}
                    id="mobile-stock-out-of-stock"
                  />

                  <Label htmlFor="mobile-stock-out-of-stock">
                    Out of Stock
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Price Filter */}
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
            onClick={handleClearFilter}
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
