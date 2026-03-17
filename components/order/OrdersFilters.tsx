/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

export function OrdersFilters({
  search,
  setSearch,
  dateRange,
  setDateRange,
}: any) {
  return (
    <div className="flex flex-col md:flex-row items-end justify-between gap-3">
      {/* Search */}
      <div className="space-y-2 w-full flex-1">
        <label className="text-sm font-semibold text-[#1D4E4E] block">
          Search Order
        </label>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Order ID or Product name"
            className="pl-10 rounded-xl h-12 w-full border-gray-200"
          />
        </div>
      </div>

      {/* Date filter */}
      <div className="space-y-2 w-full md:w-72">
        <label className="text-sm font-semibold text-[#1D4E4E] block">
          Filter by Date Range
        </label>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="rounded-xl h-12 w-full bg-white border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <SelectValue placeholder="Select range" />
            </div>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="7">Last 7 Days</SelectItem>
            <SelectItem value="30">Last 1 Month</SelectItem>
            <SelectItem value="90">Last 3 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}