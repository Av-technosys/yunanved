"use client"

import { Select } from "@/components/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"
import { useState } from "react"
import ProductPagination from "@/components/pagination"
import UserTable from "./UserTable"
import BadgeIcon from "@/components/BadgeIcon"
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
    <div className="w-full p-2">
      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
          <CardDescription>Manage your users here</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm">Active user</div>
                      <div className="text-2xl font-bold">1234</div>
                    </div>
                    <BadgeIcon color="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                      <User size={20} />
                    </BadgeIcon>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
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
          <UserTable page={page} />
          <ProductPagination currentPage={page} totalPages={10} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
