/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { OrdersFilters } from "./OrdersFilters";
import { StatusTabs } from "./StatusTabs";

export function OrdersHeader({
  search,
  setSearch,
  dateRange,
  setDateRange,
  statusFilter,
  setStatusFilter,
}: any) {
  return (
    <>
      <nav className="flex items-center gap-1 text-[13px] text-gray-500 p-2">
        <span>Home</span> <ChevronRight size={12} />
        <span>Account</span> <ChevronRight size={12} />
        <span className="font-medium text-gray-800">My Orders</span>
      </nav>

      <Card className="rounded-[24px] border-none bg-white shadow-sm p-6 mb-6">
        <OrdersFilters
          search={search}
          setSearch={setSearch}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        <StatusTabs
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </Card>
    </>
  );
}