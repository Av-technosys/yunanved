"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Sidebar } from "./Sidebar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 w-64">
        <Sidebar closeSidebar={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}