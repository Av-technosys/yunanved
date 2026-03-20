/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { updateReturnRequestStatus } from "@/helper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReturnImagePreviewModal } from "./ReturnImagePreviewModal";

export default function ReturnTable({ data }: any) {
  const router = useRouter();
  const [rejectReason, setRejectReason] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const getColor = (status: string) => {
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
    <div className=" rounded-lg overflow-auto">
      <Table>
        <TableHeader className="bg-gray-50 sticky top-0">
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead className="w-[180px]">User</TableHead>
            <TableHead className="w-[250px]">Product</TableHead>
            <TableHead className="w-[80px]">Amount</TableHead>
            <TableHead className="w-[90px]">Status</TableHead>
            <TableHead className="w-[180px] text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row: any, i: number) => {
            const req = row.return_request;
            const item = row.order_item;
            const user = row.user;

            return (
              <TableRow key={req.id} className="h-[60px]">
                {/* Number */}
                <TableCell className="align-middle py-2">
                  <span className="text-sm">{i + 1}</span>
                </TableCell>

                {/* USER */}
                <TableCell className="align-middle py-2">
                  <div>
                    <p className="text-sm font-medium truncate max-w-[160px]">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-[160px]">
                      {user.email}
                    </p>
                  </div>
                </TableCell>

                {/* PRODUCT - Compact */}
                <TableCell className="align-middle py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate max-w-[150px]">
                        {item.productName}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-[150px]">
                        {req.reason}
                      </p>
                    </div>
                    {row.images?.length > 0 && (
                      <ReturnImagePreviewModal
                        images={row.images}
                        item={item}
                      />
                    )}
                  </div>
                </TableCell>

                {/* Amount */}
                <TableCell className="align-middle py-2">
                  <span className="text-sm">₹{item.productPrice}</span>
                </TableCell>

                {/* Status */}
                <TableCell className="align-middle py-2">
                  <Badge className={`${getColor(req.status)} text-xs px-2 py-0.5`}>
                    {req.status}
                  </Badge>
                </TableCell>

                {/* ACTIONS - Compact */}
                <TableCell className="align-middle py-2 text-end">
                  {/* PENDING */}
                  {req.status === "pending" && (
                    <div className="flex gap-1 justify-end">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" className="bg-green-600 h-7 px-2 text-xs">
                            ✓
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-[400px]">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Approve Return?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will approve the request.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async () => {
                                setLoadingId(req.id);
                                await updateReturnRequestStatus({
                                  id: req.id,
                                  status: "approved",
                                });
                                toast.success("Approved");
                                router.refresh();
                                setLoadingId(null);
                              }}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive" className="h-7 px-2 text-xs">
                            ✗
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-[400px]">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Reject Return</AlertDialogTitle>
                            <AlertDialogDescription>
                              Please provide a reason
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <Textarea
                            placeholder="Reason..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="min-h-[60px] text-sm"
                          />
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              disabled={!rejectReason}
                              className="bg-red-600"
                              onClick={async () => {
                                setLoadingId(req.id);
                                await updateReturnRequestStatus({
                                  id: req.id,
                                  status: "rejected",
                                  adminReason: rejectReason,
                                });
                                toast.success("Rejected");
                                router.refresh();
                                setRejectReason("");
                                setLoadingId(null);
                              }}
                            >
                              Submit
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}

                  {/* APPROVED → REFUND */}
                  {req.status === "approved" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" className="h-7 text-xs">
                          Refund ₹{item.productPrice}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="max-w-[400px]">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Refund</AlertDialogTitle>
                          <AlertDialogDescription>
                            Amount: ₹{item.productPrice}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={async () => {
                              setLoadingId(req.id);
                              await updateReturnRequestStatus({
                                id: req.id,
                                status: "refunded",
                              });
                              toast.success("Refunded");
                              router.refresh();
                              setLoadingId(null);
                            }}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {/* REJECTED/REFUNDED */}
                  {(req.status === "rejected" || req.status === "refunded") && (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}