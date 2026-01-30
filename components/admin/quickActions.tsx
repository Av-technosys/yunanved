// components/quick-actions.tsx
import { Plus, ShoppingCart, Users, Layers, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const actions = [
  { label: "Add Product", icon: <Plus size={18} />, color: "bg-emerald-100 text-emerald-600" },
  { label: "View Orders", icon: <ShoppingCart size={18} />, color: "bg-blue-100 text-blue-600" },
  { label: "Manage User", icon: <Users size={18} />, color: "bg-purple-100 text-purple-600" },
  { label: "Categories", icon: <Layers size={18} />, color: "bg-yellow-100 text-yellow-600" },
]

export function QuickActions() {
  return (
    <Card className="h-auto">
      <CardHeader>
        <CardTitle>Quick Action </CardTitle>
        </CardHeader>
      <CardContent className="space-y-1">
        {actions.map((action) => (
          <div 
            key={action.label} 
            className="flex items-center justify-between p-1 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${action.color}`}>
                {action.icon}
              </div>
              <span className="text-sm font-medium text-slate-700">{action.label}</span>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}