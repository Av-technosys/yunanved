import { Sidebar } from "@/components/dashboard";

import DashboardDropdown from "./dashboardDropdown";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* FULL VIEWPORT APP SHELL */}
      <div className="h-[86vh] flex bg-[#F4F7F6] overflow-hidden">
        {/* SIDEBAR */}
        <div className="hidden lg:flex w-72 shrink-0">
          <Sidebar />
        </div>

        {/* MAIN */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Mobile Header */}
          <div className="lg:hidden p-2">
            <div className="flex items-center gap-2 bg-white p-4 rounded-xl border">
              <DashboardDropdown />
            </div>
          </div>

          {/* ONLY SCROLL AREA */}
          <main className="flex-1 overflow-y-auto p-2">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
