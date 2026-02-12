/* eslint-disable @typescript-eslint/no-explicit-any */
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
  categories: any;
}

const PAGE_SIZE = 3;

const CategoryTable = ({ page, categories }: CategoryTableProps) => {
  const startIndex = (page - 1) * PAGE_SIZE;

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Slug Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories?.map((category: any, index: number) => {
            const rowNumber = startIndex + index + 1;

            return (
              <TableRow key={rowNumber}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <p>{rowNumber}</p>
                  </div>
                </TableCell>

                <TableCell>{category.name}</TableCell>

                <TableCell>{category.slug}</TableCell>

                <TableCell>{category.description}</TableCell>

                <TableCell>
                  {new Date(category.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <button
                    onClick={() => router.push(`${pathname}/${category.id}`)}
                    className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
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
