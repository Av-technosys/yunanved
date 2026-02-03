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

interface CategoryTableProps {
  page: number;
}

const PAGE_SIZE = 10;

const CategoryTable = ({ page }: CategoryTableProps) => {
  const startIndex = (page - 1) * PAGE_SIZE;

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Edit</TableHead>
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
                    <p>Category {rowNumber}</p>
                  </div>
                </TableCell>

                <TableCell>{Math.floor(Math.random() * 100)}</TableCell>

                <TableCell>Active</TableCell>

                {/* ✏️ Edit icon */}
                <TableCell className="text-right">
                  <button
                    onClick={() => router.push(`${pathname}/${rowNumber}`)}
                    className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                    aria-label="Edit category"
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

export default CategoryTable;
