/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,

} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui";
import { Loader2, Search } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";

import { ProductPagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { toast } from "sonner";
import { addFeaturedCategory } from "@/helper";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  categories: any[];
  total: number;
  currentPage: number;
}

const AddFeaturedCategoryDialog = ({
  open,
  setOpen,
  categories,
  total,
  currentPage,
}: Props) => {
  const updateQuery = useUpdateQuery();

  const [isPending, startTransition] = useTransition();

  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 800);

  useEffect(() => {
    startTransition(() => updateQuery("search", debouncedSearch));
  }, [debouncedSearch]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  const addCategoryHandler =(categoryId: string) => {
    startTransition(async () => {
     const response = await addFeaturedCategory(categoryId);

     if(response?.success == true){
      toast.success(response.message ?? "Category added to featured");
      setOpen(false);
     }else{
      toast.error(response?.message ?? "Failed to add category to featured");
     }
    });
  }

  return (
    <>
<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent className="max-sm:w-[95vw] max-sm:overflow-hidden">
    <AlertDialogHeader>
      <AlertDialogTitle>Add Featured Category</AlertDialogTitle>

      <div className="w-full my-3">
        <div className="w-full mb-2">
          <InputGroup className="flex items-center bg-white rounded-full py-2 shadow-none border">
            <InputGroupAddon className="pl-3">
              <Search className="text-gray-500 w-4 h-4" />
            </InputGroupAddon>

            <InputGroupInput
              onChange={handleInputChange}
              value={searchText}
              type="text"
              placeholder="Search By Category Name"
              className="bg-transparent focus:outline-none w-32 focus:w-56 transition-all duration-200 px-2"
            />
          </InputGroup>
        </div>

        {/* Lock horizontal scroll on mobile, keep vertical scroll */}
        <div className="relative h-60 overflow-y-auto max-sm:overflow-x-hidden border rounded-md">
          {isPending && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
              <Loader2 className="animate-spin w-6 h-6 text-primary" />
            </div>
          )}

          {/* table-fixed for mobile lockdown, table-auto for desktop flexibility */}
          <Table className="w-full table-fixed sm:table-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="max-sm:w-[50%] !text-left">Product Name</TableHead>
                <TableHead className="max-sm:w-[25%] !text-left">SKU</TableHead>
                <TableHead className="max-sm:w-[25%] !text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.length > 0 ? (
                categories.map((item: any) => (
                  <TableRow key={item.id}>
                    {/* !text-left and truncate keep it from 'floating' or breaking width */}
                    <TableCell 
                      className="max-sm:w-[50%] !text-left font-medium truncate"
                      style={{ maxWidth: '0' }}
                    >
                      {item.name}
                    </TableCell>
                    
                    <TableCell className="max-sm:w-[25%] !text-left truncate text-gray-500">
                     {item.slug|| "N/A"}
                    </TableCell>

                    <TableCell className="max-sm:w-[25%] !text-right">
                      <Button
                        onClick={() => addCategoryHandler(item.id)}
                        variant="outline"
                        size="sm"
                        className="text-black cursor-pointer"
                        disabled={isPending}
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-gray-600 font-semibold">
                    No Products found..
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="max-w-lg overflow-x-auto mt-3">
          <ProductPagination currentPage={currentPage} totalPages={total} />
        </div>
      </div>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </>
  );
};

export default AddFeaturedCategoryDialog;
