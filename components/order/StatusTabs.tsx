/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui";

export function StatusTabs({ statusFilter, setStatusFilter }: any) {
  const statusTabs = [
    { label: "All Orders", value: "all" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <div className="pt-2 border-t border-gray-50">
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {statusTabs.map((tab) => (
          <Button
            key={tab.value}
            variant={statusFilter === tab.value ? "default" : "outline"}
            onClick={() => setStatusFilter(tab.value)}
            className={`rounded-full px-6 whitespace-nowrap ${
              statusFilter === tab.value
                ? "bg-[#1D4E4E] text-white hover:bg-[#143a3a]"
                : "text-gray-500 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}