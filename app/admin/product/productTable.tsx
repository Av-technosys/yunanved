"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductPagination from "@/components/pagination";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

const ProductTable = ({ products, total, currentPage }: any) => {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const router = useRouter();

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
                <TableCell>
                  <Button
                    className="cursor-pointer"
                    variant={"outline"}
                    onClick={() => router.push(`/admin/product/${item.id}`)}
                  >
                    <Edit />
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
