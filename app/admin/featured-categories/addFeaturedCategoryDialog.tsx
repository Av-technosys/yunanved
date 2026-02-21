"use client";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Loader2, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import CategoryTable from "../category/categoryTable";
import FeaturedCategoryTable from "./featuredCategoryTable";
import ProductPagination from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Featured Category</AlertDialogTitle>

            <div className="w-full my-3">
              <div className="w-full mb-2">
                <InputGroup className="flex items-center bg-white rounded-full py-2 shadow-none">
                  <InputGroupAddon>
                    <Search className="text-gray-500" />
                  </InputGroupAddon>

                  <InputGroupInput
                    onChange={handleInputChange}
                    value={searchText}
                    type="text"
                    placeholder="Search By Category Name"
                    className="bg-transparent focus:outline-none w-32 focus:w-56 transition-all duration-200"
                  />
                </InputGroup>
              </div>
              <div className="relative  h-60 overflow-y-auto">
                {isPending && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                    <Loader2 className="animate-spin w-6 h-6 text-primary" />
                  </div>
                )}

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>slug</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {categories.length > 0 ? (
                      categories.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.slug}</TableCell>

                          <TableCell className="flex gap-2">
                            <Button
                             onClick={()=> addCategoryHandler(item.id)}
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
                          No Categories found..
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
             <div className="max-w-lg overflow-x-auto">
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
