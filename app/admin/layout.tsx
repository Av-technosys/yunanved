"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/admin"
import { MobileSidebar } from "@/components/admin"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()
  const hideSidebar = pathname.startsWith("/admin/settings")

  return (
    <div className="flex h-screen overflow-hidden bg-muted/40">

      {!hideSidebar && (
        <div className="hidden lg:block sticky top-0 h-screen">
          <Sidebar />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">

        {!hideSidebar && (
          <div className="flex items-center gap-2 p-3 border-b lg:hidden bg-background">
            <MobileSidebar />
            <span className="text-lg font-semibold">Admin</span>
          </div>
        )}

        {children}

      </div>
    </div>
  )
}