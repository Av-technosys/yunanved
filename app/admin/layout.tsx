import { Sidebar } from "@/components/admin/sidebar"
import { MobileSidebar } from "@/components/admin/mobileSidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/40">
    
      <div className="hidden lg:block sticky top-0 h-screen">
        <Sidebar />
      </div>

      
      <div className="flex-1 overflow-y-auto">
        
        <div className="flex items-center gap-2 p-3 border-b lg:hidden bg-background">
          <MobileSidebar />
          <span className="text-lg font-semibold">Admin</span>
        </div>

        <div className="">
          {children}
        </div>
    
      </div>
    </div>
  )
}
