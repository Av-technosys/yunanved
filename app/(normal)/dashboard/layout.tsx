import { Sidebar } from "@/components/dashboard"

import DashboardDropdown from "./dashboardDropdown"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>

      {/* FULL VIEWPORT APP SHELL */}
      <div className="h-[calc(100vh-64px)]  flex bg-[#F4F7F6] overflow-hidden">

        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:flex w-72 hide-scrollbar shrink-0 ">
          <div className="w-full  overflow-hidden">
            <Sidebar />
          </div>
        </div>

        {/* MAIN AREA */}
        <div className="flex-1 flex flex-col min-h-0">

          {/* Mobile Header */}
          <div className="lg:hidden p-2">
            <div className="flex items-center gap-2 bg-white p-4 rounded-xl border">
              {/* <MobileSidebar /> */}
              {/* <span className="text-lg font-semibold text-[#1D4E4E]">Dashboard</span> */}
              <DashboardDropdown/>
            </div>
          </div>

          {/* SCROLLABLE CONTENT — ONLY THIS SCROLLS */}
          <main className="flex-1 overflow-y-auto hide-scrollbar p-2">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>

        </div>
      </div>
    </>
  )
}
