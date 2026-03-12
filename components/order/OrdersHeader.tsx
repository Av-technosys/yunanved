/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui";
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