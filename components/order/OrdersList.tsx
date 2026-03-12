/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui";
import { OrderCard } from "./OrderCard";

export function OrdersList({ orders, onViewDetails }: any) {
  if (orders.length === 0) {
    return (
      <Card className="rounded-2xl p-10 text-center border border-gray-100">
        <p className="text-lg font-semibold text-gray-700">No Orders Found</p>
        <p className="text-sm text-gray-400">
          You haven’t placed any orders yet.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order: any) => (
        <OrderCard
          key={order.id}
          order={order}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}