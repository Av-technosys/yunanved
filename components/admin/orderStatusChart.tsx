// components/order-status-chart.tsx
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

const MAX = 130

const data = [
  { status: "Processing", value: 28, color: "#CA8A04" },
  { status: "New", value: 75, color: "#2563EB" },
  { status: "Completed", value: 118, color: "#16A34A" },
]

export function OrderStatusChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Order Status Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="status" hide />
              <YAxis hide domain={[0, MAX]} />

              {/* Tooltip (required for hover data) */}
              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`${value}`, "Orders"]}
              />

              {/* Single bar with background track */}
              <Bar
                dataKey="value"
                barSize={54}
                radius={[10, 10, 10, 10]}
                background={{
                  fill: "#F1F5F9",
                  radius: 10,
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-10 space-y-1.5 text-md">
          {data.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">
                  {item.status}
                </span>
              </div>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
