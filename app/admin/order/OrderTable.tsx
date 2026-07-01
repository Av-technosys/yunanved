/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Eye } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Select } from "@/components/select";
import { updateOrderStatus } from "@/helper/index";
import { ORDER_STATUS } from "@/const/globalconst";

interface OrderTableProps {
  page: number;
  orders: any;
  pageSize: number;
}

/* convert constant → select items */
const ORDER_STATUS_OPTIONS = Object.values(ORDER_STATUS).map((status) => ({
  value: status,
  label: status.charAt(0).toUpperCase() + status.slice(1),
}));

const OrderTable = ({ page, orders, pageSize }: OrderTableProps) => {
  const startIndex = (page - 1) * pageSize;
  const [isPending, startTransition] = useTransition();
  const [statusChange, setStatusChange] = useState<{
    order: any;
    status: string;
  } | null>(null);

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
                <TableRow
                  key={rowNumber}
                  className={isPending ? "opacity-60" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <p>{rowNumber}</p>
                    </div>
                  </TableCell>

                  <TableCell>{order.id}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[140px]">
                      <Select
                        placeholder="Status"
                        label="Status"
                        value={order.status}
                        selectItems={ORDER_STATUS_OPTIONS}
                        onValueChange={(value) => {
                          if (!value) return;
                          setStatusChange({ order, status: value });
                        }}
                      />
                    </div>
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

      <AlertDialog
        open={Boolean(statusChange)}
        onOpenChange={(open) => {
          if (!open) setStatusChange(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update order status?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark order #{statusChange?.order?.id} as{" "}
              <span className="font-semibold text-slate-900">
                {statusChange?.status}
              </span>
              . No customer status email will be sent from this action.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!statusChange) return;

                startTransition(() => {
                  updateOrderStatus(statusChange.order.id, statusChange.status);
                  setStatusChange(null);
                });
              }}
            >
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrderTable;
