/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";
import { ProductPagination } from "@/components/pagination";
import { Select } from "@/components/select";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { addFeaturedProduct } from "@/helper";
import { Loader2, Search } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const AddFeaturedProductDialog = ({
  open,
  setOpen,
  products,
  total,
  currentPage,
}: any) => {
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

  const addFeaturedProductHandler = (productId: string) => {
    startTransition(async () => {
      const response = await addFeaturedProduct(productId);

      if (response?.success == true) {
        toast.success(response.message ?? "Product added to featured");
        setOpen(false);
      } else {
        toast.error(response?.message ?? "Failed to add product to featured");
      }
    });
  };

  return (
    <>
<AlertDialog open={open} onOpenChange={setOpen}>
  {/* Added overflow-hidden to prevent the 'flocky' x-scroll on the modal itself */}
  <AlertDialogContent className="w-[95vw] sm:max-w-xl overflow-hidden flex flex-col">
    <AlertDialogHeader className="overflow-hidden">
      <AlertDialogTitle>Add Featured Product</AlertDialogTitle>

      <div className="w-full my-3 flex flex-col min-w-0">
        <div className="w-full flex gap-3 mb-2">
          <InputGroup className="flex items-center bg-white rounded-full py-2 shadow-none border w-full">
            <InputGroupAddon className="pl-3">
              <Search className="text-gray-500 w-4 h-4" />
            </InputGroupAddon>

            <InputGroupInput
              onChange={handleInputChange}
              value={searchText}
              type="text"
              placeholder="Search..."
              /* Removed the fixed w-32/w-56 which can cause jumping/overflow */
              className="bg-transparent focus:outline-none flex-1 px-2 text-sm"
            />
          </InputGroup>
        </div>

        {/* The Scroll Container - Added w-full and min-w-0 */}
        <div className="relative h-60 w-full min-w-0 overflow-x-auto overflow-y-auto  rounded-md">
          {isPending && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
              <Loader2 className="animate-spin w-6 h-6 text-primary" />
            </div>
          )}

   <div className="relative h-60 w-full overflow-y-auto overflow-x-hidden  rounded-md">
  {/* table-fixed is the most important class here to stop the x-scroll */}
  <Table className="w-full table-fixed">
    <TableHeader>
      <TableRow>
        {/* Set explicit widths so the table doesn't expand */}
        <TableHead className="w-[55%] !text-left">Product Name</TableHead>
        <TableHead className="w-[20%] !text-left">SKU</TableHead>
        <TableHead className="w-[25%] !text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {products.length > 0 ? (
        products.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell 
              className="w-[55%] !text-left truncate font-medium"
              style={{ maxWidth: '0' }} 
            >
              {item.name}
            </TableCell>
            
            <TableCell className="w-[20%] !text-left text-gray-500 overflow-hidden">
              {item.slug}
            </TableCell>

            <TableCell className="w-[25%] !text-right">
              <Button
                onClick={() => addFeaturedProductHandler(item.id)}
                variant="outline"
                size="sm"
                className="h-8 px-2"
                disabled={isPending}
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={3} className="h-24 !text-center">
            No Products found..
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</div>
        </div>

        {/* Pagination Container */}
        <div className="w-full overflow-hidden mt-3">
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

export default AddFeaturedProductDialog;
