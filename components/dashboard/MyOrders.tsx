/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Search, Calendar, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getOrdersByUserId } from "@/helper/index";
import { tempUserId } from "@/const/globalconst";

export const MyOrdersPage = ({
  onViewDetails,
}: {
  onViewDetails: (id: string) => void;
}) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");


  useEffect(() => {
    const loadOrders = async () => {
      const data = await getOrdersByUserId(tempUserId);
      setOrders(data);
      setLoading(false);
    };

    loadOrders();
  }, []);

  const statusTabs = [
    { label: "All Orders", value: "all" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label:"Pending" , value:"pending" }
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      // Search
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.items?.some((item: any) =>
          item.productName.toLowerCase().includes(search.toLowerCase()),
        );

      // Status
      const matchesStatus =
        statusFilter === "all" || order.status.toLowerCase() === statusFilter;

      // Date filter
      const now = new Date();
      let dateLimit = null;

      if (dateRange === "7") {
        dateLimit = new Date(now.setDate(now.getDate() - 7));
      }

      if (dateRange === "30") {
        dateLimit = new Date(now.setMonth(now.getMonth() - 1));
      }

      if (dateRange === "90") {
        dateLimit = new Date(now.setMonth(now.getMonth() - 3));
      }

      const matchesDate = !dateLimit || orderDate >= dateLimit;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, search, statusFilter, dateRange]);

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
    <div className="relative w-full min-h-[70vh]">
      {/* 🔥 Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <Loader2
            className="h-12 w-12 text-[#1D4E4E] animate-spin"
            strokeWidth={2.5}
          />
        </div>
      )}

      {/* Content */}
      <div className={loading ? "pointer-events-none opacity-60" : ""}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-[13px] text-gray-500 p-2">
          <span>Home</span> <ChevronRight size={12} />
          <span>Account</span> <ChevronRight size={12} />
          <span className="font-medium text-gray-800">My Orders</span>
        </nav>

{/* Filter Header */}
<Card className="rounded-[24px] border-none bg-white shadow-sm p-6 mb-6">
  {/* Search and Date Row */}
  <div className="flex flex-col md:flex-row items-end justify-between gap-3">
    
    {/* Search Order Section */}
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
          className="pl-10 rounded-xl h-12 w-full border-gray-200 focus:ring-[#1D4E4E]"
        />
      </div>
    </div>

    {/* Date Range Section */}
    <div className="space-y-2 w-full md:mb-2 md:w-72">
      <label className="text-sm font-semibold text-[#1D4E4E] block">
        Filter by Date Range
      </label>
      <Select
        value={dateRange}
        onValueChange={(value) => setDateRange(value)}
      >
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

  {/* Status Tabs - Separated by a divider for cleaner UI */}
  <div className=" pt-2 border-t border-gray-50">
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {statusTabs.map((tab) => (
        <Button
          key={tab.value}
          variant={statusFilter === tab.value ? "default" : "outline"}
          onClick={() => setStatusFilter(tab.value)}
          className={`rounded-full px-6 transition-all whitespace-nowrap ${
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
</Card>
    
      {/* Order List */}
<div className="space-y-3">
  {filteredOrders.map((order) => (
    <Card
      key={order.id}
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
          {new Date(order.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </p>
      </div>

      {/* Middle Section: Shipping Brief (Uses your City/Pincode) */}
      <div className="hidden md:flex flex-col border-l border-gray-100 pl-6">
        <p className="text-[10px] uppercase text-gray-400 font-medium tracking-wider">Shipping To</p>
    {(order.city || order.pincode) && (
  <p className="text-xs font-medium text-gray-700 capitalize">
    {order.city && order.city}
    {order.city && order.pincode && ", "}
    {order.pincode && order.pincode}
  </p>
)}
      </div>

      {/* Right Section: Price and Action */}
      <div className="flex items-center justify-between sm:justify-end gap-8 border-t sm:border-t-0 pt-3 sm:pt-0">
        <div className="text-left sm:text-right">
          <p className="text-[10px] uppercase text-gray-400 font-medium">Total Amount</p>
          <p className="text-lg font-bold text-[#1D4E4E]">
            ₹{order.totalAmountPaid.toLocaleString('en-IN')}
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
  ))}
</div>
      </div>
    </div>
  );
};
