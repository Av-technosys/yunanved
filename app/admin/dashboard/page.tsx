import { Sidebar } from "@/components/admin/sidebar"
import { MobileSidebar } from "@/components/admin/mobileSidebar"
import { OrderStatusBoxes } from "@/components/admin/orderStatusBoxes"
import { OrderStatusChart } from "@/components/admin/orderStatusChart"
import { RecentOrdersTable } from "@/components/admin/recentOrdersTable"
import { QuickActions } from "@/components/admin/quickActions"
import { DashboardCards } from "@/components/admin/dashboardCard"

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/40">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main */}
      <main className="flex-1 overflow-y-auto px-3 py-6 bg-gray-50/30">
        {/* Mobile header */}
        <div className="mb-6 flex items-center gap-2 lg:hidden">
          <MobileSidebar />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        {/* Desktop header */}
        <header className="mb-8 hidden lg:block">
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard Overview
          </h1>
          <p className="text-slate-500">
            Welcome back! Here's what's happening with your store today
          </p>
        </header>

        <div className="space-y-6">
          <DashboardCards />

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <OrderStatusBoxes />
            </div>
            <QuickActions />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentOrdersTable />
            </div>
            <OrderStatusChart />
          </div>
        </div>
      </main>
    </div>
  )
}
