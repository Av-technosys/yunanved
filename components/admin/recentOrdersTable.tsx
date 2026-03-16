/* eslint-disable @typescript-eslint/no-explicit-any */

import { Eye } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"

import { Badge } from "@/components/ui"
import { Button } from "@/components/ui"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { ORDER_STATUS } from "@/const"

const statusStyleMap: Record<string, string> = {
  [ORDER_STATUS.PENDING]:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",

  [ORDER_STATUS.PROCESSING]:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",

  [ORDER_STATUS.SHIPPED]:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",

  [ORDER_STATUS.DELIVERED]:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",

  [ORDER_STATUS.COMPLETED]:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",

  [ORDER_STATUS.CANCELED]:
    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
}


export function RecentOrdersTable({ orders }: { orders?: any }) {

  const skeletonRows = Array.from({ length: 5 })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>

        <Link href="/admin/order" 
 className="px-0 text-emerald-600">
          View all orders
        </Link>
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

            {!orders
              ? skeletonRows.map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-4 w-6 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-4 w-12 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-6 w-20 mx-auto rounded-full" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
             : orders.map((order:any) => {
                  const statusKey =
                    order.status?.trim().toLowerCase()

                  return (
                    <TableRow
                      key={order.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {order.id}
                      </TableCell>

                      <TableCell>
                        {order.customer}
                      </TableCell>

                      <TableCell className="text-center">
                        {order.items}
                      </TableCell>

                      <TableCell className="text-center">
                        ₹ {order.total.toLocaleString()}
                      </TableCell>

                      <TableCell className="text-center">
                        <Badge
                          className={`border-none font-medium ${
                            statusStyleMap[statusKey] ??
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {statusKey}
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
                  )
                })}

          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}