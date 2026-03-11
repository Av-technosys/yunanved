/* eslint-disable @typescript-eslint/no-explicit-any */

 "use client";

import { useEffect, useState } from "react";
import { getOrderById } from "@/helper/index";
import { useRouter } from "next/navigation";

import {OrderReview} from "./OrderReview";
import {OrderStatusCard} from "@/components/order";
import {DeliveryDetailsCard} from "@/components/order";
import {OrderSummaryCard} from "@/components/order";
import {OrderItemsTable} from "@/components/order";
import {OrderDetailsSkeleton} from "@/components/order";
import { ChevronRight } from "lucide-react";

export const OrderDetailsPage = ({
  orderId,
}: {
  orderId: string;
}) => {

  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orderReview, setOrderReview] = useState(false);

  const router = useRouter();

  useEffect(() => {

    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

  }, [orderId]);

  if (loading) {
    return <OrderDetailsSkeleton />;
  }

  if (!orderData) {
    return (
      <div className="p-10 text-center">
        Order not found
      </div>
    );
  }

  if (orderReview) {
    return (
      <OrderReview
        orderDetails={orderData}
        setOrderReview={setOrderReview}
        onClick={() => router.back()}
      />
    );
  }

  return (
    <div className="w-full">

      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-1 text-[13px] text-gray-500 p-2 cursor-pointer"
        onClick={() => router.back()}
      >
        <span>Home</span>
        <ChevronRight size={12} />
        <span>My Orders</span>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-800">
          Order Details
        </span>
      </nav>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">

        {/* Left side */}
        <OrderStatusCard
          orderData={orderData}
          setOrderReview={setOrderReview}
        />

        {/* Right side */}
        <div className="lg:col-span-7 space-y-2">

          <DeliveryDetailsCard orderData={orderData} />

          <OrderSummaryCard orderData={orderData} />

        </div>

        {/* Bottom table */}
        <OrderItemsTable orderData={orderData} />

      </div>

    </div>
  );
};
