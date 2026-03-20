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
  AlertDialogTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import { updateCancelRequestStatus } from "@/helper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CancelRequestTable({ data }: any) {
  const router = useRouter();

  const handleApprove = async (id: string) => {
    try {

      await updateCancelRequestStatus({
        id,
        status: "approved",
      });

      toast.success("Request approved");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-blue-100 text-blue-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "refunded":
        return "bg-green-100 text-green-700";
      default:
        return "";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Order</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead className="text-end">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.length ? (
          data.map((row: any, index: number) => {
            const cancel = row.cancel;
            const order = row.order;
            const user = row.user;

            return (
              <TableRow key={cancel.id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>#{order.id}</TableCell>

                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>

                <TableCell>₹{order.totalAmountPaid}</TableCell>

                <TableCell>
                  <Badge className={getStatusColor(cancel.status)}>
                    {cancel.status}
                  </Badge>
                </TableCell>

                <TableCell className="max-w-[200px] truncate">
                  {cancel.userReason}
                </TableCell>

                <TableCell className="text-end">

                  {/* ✅ PENDING */}
                  {cancel.status === "pending" && (
                    <div className="flex gap-2 justify-end">

                      {/* APPROVE */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" className="bg-green-600">
                            Approve
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Approve Cancellation
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to approve this request?
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>

                            <AlertDialogAction
                              onClick={() => handleApprove(cancel.id)}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      {/* REJECT */}
                      <RejectModal
                        cancelId={cancel.id}
                        router={router}
                      />

                    </div>
                  )}

                  {/* ✅ APPROVED → SHOW REFUND */}
                  {cancel.status === "approved" && (
                    <RefundModal
                      cancelId={cancel.id}
                      amount={order.totalAmountPaid}
                      router={router}
                    />
                  )}

                  {/* ✅ FINAL STATES */}
                  {cancel.status === "refunded" && (
                    <span className="text-green-600 text-xs font-medium">
                      Refunded
                    </span>
                  )}

                  {cancel.status === "rejected" && (
                    <span className="text-red-600 text-xs font-medium">
                      Rejected
                    </span>
                  )}

                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-6">
              No cancel requests found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}



function RejectModal({ cancelId, router }: any) {
  const [reason, setReason] = useState("");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Reject
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject Cancellation</AlertDialogTitle>
          <AlertDialogDescription>
            Enter reason for rejection
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Textarea
          placeholder="Enter rejection reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={!reason}
            className="bg-red-600"
            onClick={async () => {
              try {

                await updateCancelRequestStatus({
                  id: cancelId,
                  status: "rejected",
                  adminReason: reason,
                });

                toast.success("Request rejected");
                router.refresh();

              } catch {
                toast.error("Something went wrong");
              }
            }}
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}



function RefundModal({ cancelId, amount, router }: any) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="bg-blue-600">
          Pay / Refund
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Process Refund</AlertDialogTitle>

          <AlertDialogDescription className="text-black">
            Refund amount: ₹{amount}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            className="bg-green-600"
            onClick={async () => {
              try {

                await updateCancelRequestStatus({
                  id: cancelId,
                  status: "refunded",
                });

                toast.success("Refund completed");
                router.refresh();

              } catch {
                toast.error("Something went wrong");
              }
            }}
          >
            Mark as Refunded
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}