// components/order-status-boxes.tsx
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
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

export function OrderStatusBoxes() {
  const statuses = [
    {
      label: "New",
      value: "23",
      icon: ShoppingCart,
      bg: "bg-blue-50 dark:bg-blue-950/40",
      text: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Processing",
      value: "45",
      icon: Clock,
      bg: "bg-amber-50 dark:bg-amber-950/40",
      text: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Shipped",
      value: "67",
      icon: Truck,
      bg: "bg-purple-50 dark:bg-purple-950/40",
      text: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Completed",
      value: "1116",
      icon: CheckCircle2,
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      text: "text-emerald-600 dark:text-emerald-400",
    },
  ]

  return (
    <Card>
      {/* Compact header */}
      <CardHeader className="flex flex-row items-centers justify-between py-1 px-4">
        <CardTitle>
          Order Status
        </CardTitle>

        <Button
          variant="link"
          className="h-auto p-0 text-md text-emerald-600"
        >
          View all
        </Button>
      </CardHeader>

      {/* Compact content */}
     <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 pt-0">
  {statuses.map(({ label, value, icon: Icon, bg, text }) => (
    <div
      key={label}
      className={`flex flex-col items-center justify-center rounded-2xl px-10 py-12 ${bg}`}
    >
      {/* Icon */}
      <div
        className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${text} bg-white/60`}
      >
        <Icon className="h-10 w-10" />
      </div>

      {/* Value */}
      <p className={`text-lg font-semibold leading-none ${text}`}>
        {value}
      </p>

      {/* Label */}
      <p className="mt-1 text-md text-muted-foreground text-center">
        {label}
      </p>
    </div>
  ))}
</CardContent>

    </Card>
  )
}
