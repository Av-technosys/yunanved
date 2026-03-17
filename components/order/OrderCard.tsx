/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Calendar } from "lucide-react";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui";
import { Badge } from "@/components/ui";

export function OrderCard({ order, onViewDetails }: any) {

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500";
      case "Shipped":
        return "bg-blue-500";
      case "Processing":
        return "bg-yellow-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <Card
      className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      {/* Left Section: ID and Timing */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="bg-[#1D4E4E]/10 text-[#1D4E4E] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            Order
          </span>

          <h3 className="font-bold text-gray-900 text-sm tracking-tight">
            #{order.id}
          </h3>

          <Badge
            className={`${getStatusColor(order.status)} capitalize text-[11px] px-2.5 py-0.5 border-none shadow-none`}
          >
            {order.status}
          </Badge>
        </div>

        <p className="text-xs text-gray-500 flex items-center gap-1.5">
          <Calendar size={12} />
          {new Date(order.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Middle Section */}
      <div className="hidden md:flex flex-col border-l border-gray-100 pl-6">
        <p className="text-[10px] uppercase text-gray-400 font-medium tracking-wider">
          Shipping To
        </p>

        {(order.city || order.pincode) && (
          <p className="text-xs font-medium text-gray-700 capitalize">
            {order.city && order.city}
            {order.city && order.pincode && ", "}
            {order.pincode && order.pincode}
          </p>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-between sm:justify-end gap-8 border-t sm:border-t-0 pt-3 sm:pt-0">
        <div className="text-left sm:text-right">
          <p className="text-[10px] uppercase text-gray-400 font-medium">
            Total Amount
          </p>

          <p className="text-lg font-bold text-[#1D4E4E]">
            ₹{order.totalAmountPaid.toLocaleString("en-IN")}
          </p>
        </div>

        <Button
          size="sm"
          className="rounded-xl px-5 bg-[#1D4E4E] hover:bg-[#143a3a] text-white h-10"
          onClick={() => onViewDetails(order.id)}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}