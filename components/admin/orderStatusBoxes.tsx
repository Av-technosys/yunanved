"use client"

import {
  ShoppingCart,
  Clock,
  Truck,
  CheckCircle2,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui"

import { Button } from "@/components/ui"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

import { ORDER_STATUS } from "@/const"

type StatusData = {
  status: string
  count: number
}

export function OrderStatusBoxes({ status }: { status?: StatusData[] }) {
  const router = useRouter()

  const statusMap: Record<string, number> = {}

  status?.forEach((s) => {
    statusMap[s.status.trim().toLowerCase()] = s.count
  })

  const statuses = [
    {
      label: ORDER_STATUS.DELIVERED,
      value: statusMap[ORDER_STATUS.DELIVERED] ?? 0,
      icon: ShoppingCart,
      bg: "bg-green-50 dark:bg-green-950/40",
      text: "text-green-600 dark:text-green-400",
    },
    {
      label: ORDER_STATUS.PROCESSING,
      value: statusMap[ORDER_STATUS.PROCESSING] ?? 0,
      icon: Clock,
      bg: "bg-blue-50 dark:bg-blue-950/40",
      text: "text-blue-600 dark:text-blue-400",
    },
    {
      label: ORDER_STATUS.CANCELED,
      value: statusMap[ORDER_STATUS.CANCELED] ?? 0,
      icon: Truck,
      bg: "bg-red-50 dark:bg-red-950/40",
      text: "text-red-600 dark:text-red-400",
    },
    {
      label: ORDER_STATUS.COMPLETED,
      value: statusMap[ORDER_STATUS.COMPLETED] ?? 0,
      icon: CheckCircle2,
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      text: "text-emerald-600 dark:text-emerald-400",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-1 px-4">
        <CardTitle>Order Status</CardTitle>

        <Button
          variant="link"
          onClick={() => router.push("/admin/order")}
          className="h-auto p-0 text-md text-emerald-600"
        >
          View all
        </Button>
      </CardHeader>

      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 pt-0">
        {!status
          ? [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-2xl px-10 py-12"
              >
                <Skeleton className="h-10 w-10 rounded-full mb-2" />
                <Skeleton className="h-6 w-12 mb-2" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))
          : statuses.map(({ label, value, icon: Icon, bg, text }) => (
              <div
                key={label}
                className={`flex flex-col items-center justify-center rounded-2xl px-10 py-12 ${bg}`}
              >
                <div
                  className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${text} bg-white/60`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <p className={`text-lg font-semibold leading-none ${text}`}>
                  {value.toLocaleString()}
                </p>

                <p className="mt-1 text-md text-muted-foreground text-center capitalize">
                  {label}
                </p>
              </div>
            ))}
      </CardContent>
    </Card>
  )
}