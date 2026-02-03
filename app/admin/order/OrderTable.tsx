"use client";

/* eslint-disable react-hooks/purity */

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const STATUS_BADGE_COLORS: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  completed: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  cancelled: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  failed: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  shipped: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  delivered:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
};

export const getStatusBadgeColor = (status: string) =>
  STATUS_BADGE_COLORS[status] ??
  "bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-300";

interface OrderTableProps {
  page: number;
}

const PAGE_SIZE = 10;

const OrderTable = ({ page }: OrderTableProps) => {
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
            <TableHead className="text-right">View</TableHead>
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
                    <p>Order #{rowNumber}</p>
                  </div>
                </TableCell>

                <TableCell>{Math.floor(Math.random() * 5) + 1}</TableCell>

                <TableCell>
                  <Badge className={getStatusBadgeColor("pending")}>
                    Pending
                  </Badge>
                </TableCell>

                {/* 👁 View details */}
                <TableCell className="text-right">
                  <button
                    onClick={() => router.push(`${pathname}/1`)}
                    className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                    aria-label="View details"
                  >
                    <Eye className="w-4 h-4" />
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

export default OrderTable;
