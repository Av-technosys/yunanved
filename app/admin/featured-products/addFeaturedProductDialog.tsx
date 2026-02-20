"use client";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";
import ProductPagination from "@/components/pagination";
import { Select } from "@/components/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addFeaturedProduct, getCategories } from "@/helper";
import { Loader2, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Featured Product</AlertDialogTitle>

            <div className="w-full my-3">
              <div className="w-full flex gap-3 mb-2">
               
                    <InputGroup className="flex items-center bg-white rounded-full py-2 shadow-none">
                  <InputGroupAddon>
                    <Search className="text-gray-500" />
                  </InputGroupAddon>

                  <InputGroupInput
                    onChange={handleInputChange}
                    value={searchText}
                    type="text"
                    placeholder="Search By Product Name"
                    className="bg-transparent focus:outline-none w-32 focus:w-56 transition-all duration-200"
                  />
                </InputGroup>
               

                
            
              </div>
              <div className="relative">
                {isPending && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                    <Loader2 className="animate-spin w-6 h-6 text-primary" />
                  </div>
                )}

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>sku</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {products.length > 0 ? (
                      products.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.sku}</TableCell>

                          <TableCell className="flex gap-2">
                            <Button
                              onClick={() => addFeaturedProductHandler(item.id)}
                              variant="outline"
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
                        <TableCell
                          colSpan={7}
                          className="h-24 text-center text-gray-600 font-semibold"
                        >
                          No Products found..
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <ProductPagination currentPage={currentPage} totalPages={total} />
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
