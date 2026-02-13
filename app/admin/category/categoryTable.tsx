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
import { Trash2 } from "lucide-react";
// import { deleteCategory } from "@/helper";
import { toast } from "sonner";
import { useTransition } from "react";

interface CategoryTableProps {
  page: number;
  categories: any;
}

const PAGE_SIZE = 3;

const CategoryTable = ({ page, categories }: CategoryTableProps) => {
  const startIndex = (page - 1) * PAGE_SIZE;
const [isPending, startTransition] = useTransition();


const handleDelete = (id: string) => {
  if (!confirm("Delete this category?")) return;

  startTransition(async () => {
    //const res = await deleteCategory(id);

    // if (res.success) toast.success(res.message);
    // else toast.error(res.message);
  });
};
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
  <div className="flex justify-end gap-2">

    {/* EDIT */}
    <button
      onClick={() => router.push(`${pathname}/${category.id}`)}
      className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
      aria-label="Edit category"
    >
      <Pencil className="w-4 h-4" />
    </button>

    {/* DELETE */}
    <button
      disabled={isPending}
      onClick={() => handleDelete(category.id)}
      className="inline-flex items-center justify-center rounded-md p-2 text-red-500 hover:text-red-700 hover:bg-red-50 transition disabled:opacity-50"
      aria-label="Delete category"
    >
      <Trash2 className="w-4 h-4" />
    </button>

  </div>
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
