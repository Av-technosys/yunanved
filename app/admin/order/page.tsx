"use client"

import { Select } from "@/components/select"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useState } from "react"
import ProductPagination from "@/components/pagination"
import OrderTable from "./OrderTable"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? 1)

  const ORDER_STATUS = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "failed", label: "Failed" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
  ]

  const [selectedOrderStatus, setSelectedOrderStatus] =
    useState<string | undefined>()

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>Manage your orders here</CardDescription>
        </CardHeader>

        <CardContent>


          <div className="flex gap-3">
            <div className="w-full max-w-xl">
              <Input placeholder="Search user name" />
            </div>

            <Select
              placeholder="Order Status"
              label="Order Status"
              selectItems={ORDER_STATUS}
              value={selectedOrderStatus}
              onValueChange={setSelectedOrderStatus}
            />
          </div>

          {/* URL-driven pagination */}
          <OrderTable page={page} />
          <ProductPagination currentPage={page} totalPages={10} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
