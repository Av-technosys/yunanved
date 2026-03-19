/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "@/components/ui";
import { Button } from "@/components/ui";
import { CheckCircle2, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { createCancelRequest } from "@/helper";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function OrderStatusCard({ orderData, setOrderReview }: any) {
  const cancel = orderData.cancelRequest;
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const submitCancel = async () => {
    try {
      const finalReason = reason === "Other" ? customReason : reason;

      if (!finalReason) {
        toast.error("Please provide a reason");
        return;
      }

      const res: any = await createCancelRequest(orderData.id, finalReason);

      if (res?.success) {
        toast.success("Cancellation request submitted");
        startTransition(() => {
        window.location.reload();
        });     
       } else {
        toast.error(
          res?.error ||
            "Cancellation already requested. Please wait for admin approval.",
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Card className="lg:col-span-5 rounded-[24px] border-none shadow-sm p-4 flex flex-col justify-between min-h-[300px]">
      <div>
        <h1 className="text-sm font-bold text-[#1D4E4E]">
          Order #{orderData.id.toUpperCase()}
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Placed on{" "}
          {new Date(orderData.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        <div className="mt-7 space-y-8 ml-2">
          {[
            {
              label: "Order Confirmed",
              date: orderData.createdAt,
              done: true,
            },
            {
              label: "Order Shipped",
              date: orderData.updatedAt,
              done:
                orderData.status === "shipped" ||
                orderData.status === "delivered",
            },
            {
              label: "Out for Delivery",
              date: "",
              done:
                orderData.status === "out_for_delivery" ||
                orderData.status === "delivered",
            },
            {
              label: "Delivered",
              date: "",
              done: orderData.status === "delivered",
            },
          ].map((step, i, arr) => (
            <div key={i} className="relative flex gap-4 items-start">
              {i !== arr.length - 1 && (
                <div
                  className={`absolute left-[11px] top-6 w-[2px] h-10 ${
                    step.done ? "bg-[#00B050]" : "bg-gray-200"
                  }`}
                />
              )}

              {step.done ? (
                <CheckCircle2
                  className="text-[#00B050] z-10 bg-white"
                  size={24}
                />
              ) : (
                <Circle className="text-gray-300 z-10 bg-white" size={24} />
              )}

              <div>
                <p
                  className={`font-semibold ${
                    step.done ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>

                {step.date && (
                  <p className="text-xs text-gray-400">
                    {new Date(step.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {cancel && (
        <div className="mt-4 p-3 rounded-xl bg-gray-50 border text-sm">
          {cancel.status === "pending" && (
            <p className="text-yellow-600 font-medium">
              Cancellation request submitted. Waiting for approval.
            </p>
          )}

          {cancel.status === "approved" && (
            <p className="text-blue-600 font-medium">
              Cancellation approved. Refund is in progress.
            </p>
          )}

          {cancel.status === "refunded" && (
            <p className="text-green-600 font-medium">
              Refund completed successfully.
            </p>
          )}

          {cancel.status === "rejected" && (
            <div>
              <p className="text-red-600 font-medium">
                Cancellation request rejected.
              </p>

              {cancel.adminReason && (
                <p className="text-xs text-gray-500 mt-1">
                  Reason: {cancel.adminReason}
                </p>
              )}
            </div>
          )}
        </div>
      )}
      <div className="flex gap-4 mt-8">
        {orderData.status === "delivered" ? (
          <Button
            onClick={() => router.push(`/invoice/${orderData.id}`)}
            className="flex-1 rounded-full h-12 bg-[#1D4E4E] text-white"
          >
            Invoice
          </Button>
        ) : orderData.cancelRequest ? (
          <Button disabled className="flex-1 rounded-full h-12">
            Cancellation Requested
          </Button>
        ) : orderData.canCancel ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 rounded-full h-12 text-red-500 border-red-500"
              >
                Cancel Order
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel this order?</AlertDialogTitle>

                <AlertDialogDescription>
                  Please tell us why you want to cancel this order.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="mt-4">

  <Select value={reason} onValueChange={setReason}>

    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select reason" />
    </SelectTrigger>

    <SelectContent>

      <SelectItem value="Ordered by mistake">
        Ordered by mistake
      </SelectItem>

      <SelectItem value="Found cheaper elsewhere">
        Found cheaper elsewhere
      </SelectItem>

      <SelectItem value="Delivery taking too long">
        Delivery taking too long
      </SelectItem>

      <SelectItem value="Other">
        Other
      </SelectItem>

    </SelectContent>

  </Select>

  {/* 🔥 Show textarea if "Other" */}
  {reason === "Other" && (
    <textarea
      className="w-full border rounded-lg p-2 mt-3"
      placeholder="Please enter your reason"
      value={customReason}
      onChange={(e) => setCustomReason(e.target.value)}
    />
  )}

</div>

              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>

                <AlertDialogAction
                  disabled={!reason || (reason === "Other" && !customReason)}
                  onClick={submitCancel}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Submit Request
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            variant="outline"
            disabled
            className="flex-1 rounded-full h-12"
          >
            Not Cancelable
          </Button>
        )}

        {orderData.status === "delivered" ? (
          <Button
            onClick={() => setOrderReview(true)}
            className="flex-1 rounded-full h-12 bg-[#1D4E4E]"
          >
            Review
          </Button>
        ) : (
          <Button className="flex-1 rounded-full h-12 bg-[#1D4E4E]">
            Track Order
          </Button>
        )}
      </div>
    </Card>
  );
}
