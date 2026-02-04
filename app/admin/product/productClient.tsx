"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { CATEGORY_1 } from "@/const";
import ProductTable from "./productTable";
import { Select } from "@/components/select";
import ProductPagination from "@/components/pagination";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";

interface Props {
  products: any[];
  total: number;
  currentPage: number;
}

const ProductClient = ({ products, total, currentPage }: Props) => {
  const router = useRouter();
  const updateQuery = useUpdateQuery();

  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useDebounce(searchText, 800);

  useEffect(() => {
    updateQuery("search", debouncedSearch);
  }, [debouncedSearch]);

  const CATEGORY = useMemo(
    () =>
      CATEGORY_1.map((c) => ({
        value: c.slug,
        label: c.name,
      })),
    [],
  );
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedStockStatus, setSelectedStockStatus] = useState<string>();
  const [selectedVisibility, setSelectedVisibility] = useState<string>();

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") ?? undefined);
    setSelectedStockStatus(searchParams.get("stock") ?? undefined);
    setSelectedVisibility(searchParams.get("visibility") ?? undefined);
  }, [searchParams]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <div className="w-full p-1">
      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Manage your products here</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-end mb-4">
            <Button onClick={() => router.push("/admin/product/add")}>
              <Plus />
              Add Product
            </Button>
          </div>

          <div className="flex gap-3 mb-6">
            <div className="w-full max-w-xl">
              <InputGroup className="flex items-center  bg-white rounded-full   py-2 shadow-none">
                <InputGroupAddon>
                  <Search className="text-gray-500" />
                </InputGroupAddon>

                <InputGroupInput
                  onChange={handleInputChange}
                  value={searchText}
                  type="text"
                  placeholder="Search By Product Name"
                  className="bg-transparent  focus:outline-none w-32 focus:w-56 transition-all duration-200"
                />
              </InputGroup>
            </div>

            <Select
              placeholder="Select Category"
              label="Category"
              selectItems={CATEGORY}
              value={selectedCategory}
              onValueChange={(val) => updateQuery("category", val)}
            />

            <Select
              placeholder="Select Stock Status"
              label="Stock Status"
              selectItems={[
                { value: "in_stock", label: "In Stock" },
                { value: "out_of_stock", label: "Out of Stock" },
              ]}
              value={selectedStockStatus}
              onValueChange={(val) => updateQuery("stock", val)}
            />

            {/* <Select
              placeholder="Select Visibility"
              label="Visibility"
              selectItems={[
                { value: "visible", label: "Visible" },
                { value: "hidden", label: "Hidden" },
              ]}
              value={selectedVisibility}
              onValueChange={setSelectedVisibility}
            /> */}
            <Select
              placeholder="Select Visibility"
              label="Visibility"
              selectItems={[
                { value: "visible", label: "Visible" },
                { value: "hidden", label: "Hidden" },
              ]}
              value={selectedVisibility}
              onValueChange={(val) => updateQuery("visibility", val)}
            />
          </div>
          <ProductTable
            products={products}
            total={total}
            currentPage={currentPage}
          />
          <ProductPagination currentPage={currentPage} totalPages={total} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductClient;
