import { StatCard } from "./statCard"
import { ShoppingCart, Package, Users, IndianRupee } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
type Stats = {
  totalOrders: number
  totalProducts: number
  totalUsers: number
  totalRevenue: number
}

export function DashboardCards({ stats }: { stats?: Stats }) {

  // skeleton state
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-5 border rounded-xl space-y-4"
          >
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <StatCard
        title="Total Orders"
        value={stats.totalOrders}
        subtitle="All orders placed"
        icon={<ShoppingCart className="text-sky-500" size={24} />}
        iconBg="bg-sky-100/50"
      />

      <StatCard
        title="Total Products"
        value={stats.totalProducts}
        subtitle="Available products"
        icon={<Package className="text-purple-500" size={24} />}
        iconBg="bg-purple-100/50"
      />

      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        subtitle="Registered users"
        icon={<Users className="text-yellow-500" size={24} />}
        iconBg="bg-yellow-100/50"
      />

      <StatCard
        title="Total Revenue"
        value={`₹ ${stats.totalRevenue}`}
        subtitle="Total store revenue"
        icon={<IndianRupee className="text-emerald-500" size={24} />}
        iconBg="bg-emerald-100/50"
      />

    </div>
  )
}