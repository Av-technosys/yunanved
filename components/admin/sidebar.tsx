import { 
  LayoutGrid, 
  Box, 
  List, 
  FileText, 
  User, 
  MessageSquare, 
  Settings 
} from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r p-6 flex flex-col justify-between font-sans">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-500">Manage your account details</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-3 text-gray-600">
          <SidebarItem 
            icon={<LayoutGrid size={20} className="text-orange-400" />} 
            label="Dashboard" 
            active 
          />
          <SidebarItem icon={<Box size={20} className="text-orange-400" />} label="Product" />
          <SidebarItem icon={<List size={20} className="text-orange-400" />} label="Category" />
          <SidebarItem icon={<FileText size={20} className="text-orange-400" />} label="Order" />
          <SidebarItem icon={<User size={20} className="text-orange-400" />} label="User" />
          <SidebarItem icon={<MessageSquare size={20} className="text-orange-400" />} label="Review" />          <SidebarItem icon={<Settings size={20} className="text-orange-400" />} label="Settings" />

        </nav>
      </div>

        
      
    </aside>
  )
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
        ${active 
            ? "bg-[#FFF9EE] text-gray-800 font-semibold border-l-4 border-[#D4A056]" 
            : "hover:bg-gray-50 text-gray-500"}`}
    >
      <span className={active ? "opacity-100" : "opacity-70"}>{icon}</span>
      <span className="text-base">{label}</span>
    </div>
  )
}