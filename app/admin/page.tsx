
import { getDashboardData } from "@/helper/getDashboardData"

import { OrderStatusBoxes } from "@/components/admin"
import { OrderStatusChart } from "@/components/admin"
import { RecentOrdersTable } from "@/components/admin"
import { QuickActions } from "@/components/admin"
import { DashboardCards } from "@/components/admin"

export default async function DashboardPage() {

  const data = await getDashboardData()

  const safeData  = data.orderStatus.map((item) => ({
  status: item.status as string,
  count: item.count,
}));
  return (
    <div className="space-y-6 p-3">

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        <p className="text-slate-500">
          Welcome back! Here's what's happening with your store today
        </p>
      </header>

      <DashboardCards stats={data.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrderStatusBoxes status={data.orderStatus} />
        </div>

        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable orders={data.recentOrders} />
        </div>

        <OrderStatusChart data={safeData} />
      </div>

    </div>
  )
}