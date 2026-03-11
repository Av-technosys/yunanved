/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getOrdersByUserId } from "@/helper/index";
import { useClientSideUser } from "@/hooks/getClientSideUser";

import { OrdersSkeleton } from "@/app/(normal)/dashboard/orders/orderSkeleton";
import { OrdersHeader } from "@/components/order/OrdersHeader";
import { OrdersList } from "@/components/order/OrdersList";

export const MyOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const router = useRouter();
  const { userDetails } = useClientSideUser();

  const userId = userDetails?.id;

  useEffect(() => {
    if (!userId) return;

    const loadOrders = async () => {
      try {
        const data: any = await getOrdersByUserId(userId);
        setOrders(data || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [userId]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.items?.some((item: any) =>
          item.productName.toLowerCase().includes(search.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" || order.status.toLowerCase() === statusFilter;

      const now = new Date();
      let dateLimit = null;

      if (dateRange === "7") dateLimit = new Date(now.setDate(now.getDate() - 7));
      if (dateRange === "30") dateLimit = new Date(now.setMonth(now.getMonth() - 1));
      if (dateRange === "90") dateLimit = new Date(now.setMonth(now.getMonth() - 3));

      const matchesDate = !dateLimit || orderDate >= dateLimit;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, search, statusFilter, dateRange]);

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/orders/${id}`);
  };

  if (loading) return <OrdersSkeleton />;

  return (
    <div className="w-full min-h-[100vh]">
      <OrdersHeader
        search={search}
        setSearch={setSearch}
        dateRange={dateRange}
        setDateRange={setDateRange}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <OrdersList orders={filteredOrders} onViewDetails={handleViewDetails} />
    </div>
  );
};
