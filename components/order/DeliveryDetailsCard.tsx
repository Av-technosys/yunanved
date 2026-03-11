/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card"
import { MapPin, User } from "lucide-react"

export default function DeliveryDetailsCard({ orderData }: any) {

  return (
    <Card className="rounded-[24px] border-none shadow-sm p-8">

      <h3 className="font-bold text-[#1D4E4E] text-lg mb-4">
        Delivery Details
      </h3>

      <div className="space-y-4">

        <div className="flex gap-3">
          <MapPin className="text-gray-400" size={20} />

          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-800">Address: </span>

            {orderData.addressLine1 && `${orderData.addressLine1}`}
            {orderData.city && `, ${orderData.city}`}
            {orderData.state && `, ${orderData.state}`}
            {orderData.pincode && ` (${orderData.pincode})`}
          </p>
        </div>

        <div className="flex gap-3">
          <User className="text-gray-400" size={20} />

          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-800">
              Customer ID:
            </span>{" "}
            {orderData.userId}
          </p>
        </div>

      </div>
    </Card>
  )
}