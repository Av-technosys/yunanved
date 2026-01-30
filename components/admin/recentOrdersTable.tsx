// components/recent-orders-table.tsx
"use client"

import { Eye } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type OrderStatus = "New" | "Processing" | "Completed"

const orders: {
  id: string
  customer: string
  items: number
  total: string
  status: OrderStatus
}[] = [
  { id: "#ORD154", customer: "John Doe", items: 5, total: "$45", status: "New" },
  { id: "#ORD155", customer: "John Doe", items: 5, total: "$45", status: "Processing" },
  { id: "#ORD156", customer: "John Doe", items: 5, total: "$45", status: "Completed" },
  { id: "#ORD157", customer: "John Doe", items: 5, total: "$45", status: "Processing" },
  { id: "#ORD158", customer: "John Doe", items: 5, total: "$45", status: "Completed" },
  { id: "#ORD159", customer: "John Doe", items: 5, total: "$45", status: "New" },
]

const statusStyleMap: Record<OrderStatus, string> = {
  New: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  Processing:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  Completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
}

export function RecentOrdersTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>

        <Button variant="link" className="px-0 text-emerald-600">
          View all orders
        </Button>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-medium">
                  {order.id}
                </TableCell>

                <TableCell>{order.customer}</TableCell>

                <TableCell className="text-center">
                  {order.items}
                </TableCell>

                <TableCell className="text-center">
                  {order.total}
                </TableCell>

                <TableCell className="text-center">
                 <Badge
                    className={`border-none font-medium ${statusStyleMap[order.status]}`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
