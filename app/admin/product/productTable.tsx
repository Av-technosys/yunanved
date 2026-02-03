"use client";

/* eslint-disable react-hooks/purity */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface ProductTableProps {
  page: number;
}

const PAGE_SIZE = 10;

const ProductTable = ({ page }: ProductTableProps) => {
  const startIndex = (page - 1) * PAGE_SIZE;

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mt-8 w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[352px]">Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="w-[150px]">Status</TableHead>
            <TableHead className="text-right w-[60px]">Edit</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: PAGE_SIZE }).map((_, index) => {
            const rowNumber = startIndex + index + 1;

            return (
              <TableRow key={rowNumber}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="size-8 bg-gray-700 rounded" />
                    <p>Product {rowNumber}</p>
                  </div>
                </TableCell>

                <TableCell>Atta</TableCell>
                <TableCell>Yes</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>Yes</TableCell>

                {/* ✏️ Edit */}
                <TableCell className="text-right">
                  <button
                    onClick={() => router.push(`${pathname}/${rowNumber}`)}
                    className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                    aria-label="Edit product"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
