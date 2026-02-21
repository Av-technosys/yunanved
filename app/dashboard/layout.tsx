import { Sidebar } from "@/components/dashboard/Sidebar"
import { MobileSidebar } from "@/components/dashboard/MobileSide"
import Navbar from "@/components/landing/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />

      {/* FULL VIEWPORT APP SHELL */}
      <div className="h-[calc(100vh-64px)] flex bg-[#F4F7F6] overflow-hidden">
        
        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:flex w-72 shrink-0 ">
          <div className="w-full  overflow-hidden">
            <Sidebar />
          </div>
        </div>

        {/* MAIN AREA */}
        <div className="flex-1 flex flex-col min-h-0">

          {/* Mobile Header */}
          <div className="lg:hidden p-4">
            <div className="flex items-center gap-2 bg-white p-4 rounded-xl border">
              <MobileSidebar />
              <span className="text-lg font-semibold text-[#1D4E4E]">Admin</span>
            </div>
          </div>

          {/* SCROLLABLE CONTENT — ONLY THIS SCROLLS */}
          <main className="flex-1 overflow-y-auto p-1">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>

        </div>
      </div>
    </>
  )
}
