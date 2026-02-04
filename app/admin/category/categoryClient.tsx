"use client";

import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryTable from "./categoryTable";
import ProductPagination from "@/components/pagination";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface Props {
  categories: any[];
  total: number;
  currentPage: number;
}

const CategoryClient = ({ categories, total, currentPage }: Props) => {
  const pathname = usePathname();
  const updateQuery = useUpdateQuery();

  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useDebounce(searchText, 800);

  useEffect(() => {
    updateQuery("search", debouncedSearch);
  }, [debouncedSearch]);

  const VISIBILITY = [
    { value: "visible", label: "Visible" },
    { value: "hidden", label: "Hidden" },
  ];

  const [selectedVisibility, setSelectedVisibility] = useState<
    string | undefined
  >();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <div className="w-full min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
          <CardDescription>Manage your categories here</CardDescription>
        </CardHeader>

        <CardContent>
          <Link href={`${pathname}/add`} className="flex justify-end">
            <Button>
              <Plus />
              Add Category
            </Button>
          </Link>

          <div className="flex gap-3">
            <div className="w-full max-w-xl">
              <InputGroup className="flex items-center  bg-white rounded-full   py-2 shadow-none">
                <InputGroupAddon>
                  <Search className="text-gray-500" />
                </InputGroupAddon>

                <InputGroupInput
                  onChange={handleInputChange}
                  value={searchText}
                  type="text"
                  placeholder="Search By Category Name"
                  className="bg-transparent  focus:outline-none w-32 focus:w-56 transition-all duration-200"
                />
              </InputGroup>
            </div>

            <Select
              placeholder="Select Visibility"
              label="Visibility"
              selectItems={VISIBILITY}
              value={selectedVisibility}
              onValueChange={setSelectedVisibility}
            />
          </div>

          {/* page is controlled by URL */}
          <CategoryTable page={currentPage} categories={categories} />

          <ProductPagination currentPage={currentPage} totalPages={total} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryClient;
