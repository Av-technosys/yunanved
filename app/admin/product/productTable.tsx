/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Edit, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/helper/index";
import { useTransition } from "react";
import { toast } from "sonner";

const PAGE_SIZE = 10;

const ProductTable = ({ products, total, currentPage }: any) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    const ok = confirm("Delete this product permanently?");
    if (!ok) return;

    startTransition(async () => {
      try {
        await deleteProduct(id);
        toast.success("Product deleted");
      } catch {
        toast.error("Failed to delete product");
      }
    });
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Base Price</TableHead>
            <TableHead>Strikethrough Price</TableHead>
            <TableHead>IsCancelable</TableHead>
            <TableHead>isReturnable</TableHead>
            <TableHead>isDeleted</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length > 0 ? (
            products?.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>₹{item.basePrice}</TableCell>
                <TableCell>₹{item.strikethroughPrice}</TableCell>
                <TableCell>{item.isCancelable ? "Yes" : "No"}</TableCell>
                <TableCell>{item.isReturnable ? "Yes" : "No"}</TableCell>
                <TableCell>{item.isDeleted ? "Yes" : "No"}</TableCell>

                <TableCell className="flex gap-2">

                  {/* EDIT */}
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/admin/product/${item.id}`)}
                  >
                    <Edit size={16} />
                  </Button>

                  {/* DELETE */}
                  <Button
                    variant="outline"
                    disabled={isPending}
                    onClick={() => handleDelete(item.id)}
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Trash2 size={16} />
                    )}
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
                No product found..
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductTable;
