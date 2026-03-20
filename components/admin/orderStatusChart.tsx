"use client"

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

import { ORDER_STATUS } from "@/const"

type StatusData = {
  status: string  
  count: number
}

const STATUS_COLORS: Record<string, string> = {
  [ORDER_STATUS.PENDING]: "#2563EB",
  [ORDER_STATUS.PROCESSING]: "#CA8A04",
  [ORDER_STATUS.SHIPPED]: "#9333EA",
  [ORDER_STATUS.DELIVERED]: "#16A34A",
  [ORDER_STATUS.COMPLETED]: "#22C55E",
  [ORDER_STATUS.CANCELED]: "#EF4444",
}

export function OrderStatusChart({ data }: { data?: StatusData[] }) {
  if (!data) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Order Status Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <Skeleton className="h-[200px] w-full rounded-lg" />

          <div className="mt-10 space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  /* Normalize DB values */
  const normalized = data.map((item) => {
    const key = item.status.trim().toLowerCase()

    return {
      status: key,
      value: item.count,
      color: STATUS_COLORS[key] ?? "#64748B",
    }
  })

  /* Sort by count */
  const sorted = [...normalized].sort((a, b) => b.value - a.value)

  /* Chart shows only top 3 */
  const chartData = sorted.slice(0, 3)

  /* Legend shows all */
  const legendData = sorted

  const MAX = Math.max(...chartData.map((d) => d.value), 10)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Order Status Overview</CardTitle>
      </CardHeader>

      <CardContent>

        {/* Chart */}
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <XAxis dataKey="status" hide />
              <YAxis hide domain={[0, MAX]} />

              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`${value}`, "Orders"]}
              />

              <Bar
                dataKey="value"
                barSize={54}
                radius={[10, 10, 10, 10]}
                background={{
                  fill: "#F1F5F9",
                  radius: 10,
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Full Status List */}
        <div className="mt-10 space-y-1.5 text-md">
          {legendData.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <span className="text-muted-foreground capitalize">
                  {item.status}
                </span>
              </div>

              <span className="font-medium">
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  )
}