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
import { Eye } from "lucide-react";

interface PaymentTableProps {
  page: number;
  payments: any[];
  pageSize: number;
}

const PaymentTable = ({ page, payments, pageSize }: PaymentTableProps) => {
  const startIndex = (page - 1) * pageSize;

  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Payment ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payments?.length > 0 ? (
            payments.map((payment: any, index: number) => {
              const rowNumber = startIndex + index + 1;

              return (
                <TableRow key={payment.id}>
                  <TableCell>{rowNumber}</TableCell>

                  <TableCell className="font-medium">
                    {payment.orderId}
                  </TableCell>

                  <TableCell>{payment.paymentId}</TableCell>

                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.paymentStatus === "success"
                          ? "bg-green-100 text-green-700"
                          : payment.paymentStatus === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </TableCell>

                  <TableCell>{payment.paymentMethod}</TableCell>

                  <TableCell>
                    ₹ {payment.paymentAmount.toLocaleString("en-IN")}
                  </TableCell>

                  <TableCell>
                    {new Date(payment.createdAt).toLocaleString("en-IN")}
                  </TableCell>

                  <TableCell className="text-right">
                    <button
                     // onClick={() => router.push(`${pathname}/${payment.id}`)}
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
              <TableCell colSpan={8} className="h-24 text-center text-gray-600">
                No payments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTable;