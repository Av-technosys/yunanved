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
  pending:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
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
  orders: any;
}

const PAGE_SIZE = 3;

const OrderTable = ({ page, orders }: OrderTableProps) => {
  const startIndex = (page - 1) * PAGE_SIZE;

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Amount Paid</TableHead>
            <TableHead>AddressLine1</TableHead>
            <TableHead>AddressLine2</TableHead>
            <TableHead className="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.length > 0 ? (
            orders?.map((order: any, index: number) => {
              const rowNumber = Number(startIndex) + index + 1;

              return (
                <TableRow key={rowNumber}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <p>{rowNumber}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.totalAmountPaid}</TableCell>
                  <TableCell>{order.addressLine1}</TableCell>
                  <TableCell>{order.addressLine2}</TableCell>

                  <TableCell className="text-right">
                    <button
                      onClick={() => router.push(`${pathname}/${order.id}`)}
                      className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                      aria-label="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-gray-600">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
