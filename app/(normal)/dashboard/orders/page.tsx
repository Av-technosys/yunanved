

"use client";
import React, { useState } from 'react';
import { MyOrdersPage } from '@/components/dashboard/MyOrders'; // Assuming these are in the same folder
import { OrderDetailsPage } from '@/components/dashboard/OrderDetails';

export default function OrdersContainer() {
  // 1. State to track which order is selected
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // 2. Logic to handle "View Details" click
  const handleViewDetails = (id: string) => {
    setSelectedOrderId(id);
  };

  // 3. Logic to go back to the list
  const handleBack = () => {
    setSelectedOrderId(null);
  };

  return (
    <div className="w-full ">
      {selectedOrderId ? (
        // Pass the ID and the back function as props
        <OrderDetailsPage orderId={selectedOrderId} onBack={handleBack} />
      ) : (
        // Pass the selection function as a prop
        <MyOrdersPage onViewDetails={handleViewDetails} />
      )}
    </div>
  );
}