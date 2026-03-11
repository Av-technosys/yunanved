'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"


export default function SearchWithIcon() {
  return (
    <div className="flex w-full max-w-2xl items-center gap-2">
      <Input
        type="text"
        placeholder="Search for Products, Brands & More"
        className="flex-1 h-11 rounded-full pl-6 text-sm "
      />

      <Button
        size="icon"
        className="h-11 w-11 rounded-full "
      >
        <Search size={18} />
      </Button>
    </div>
  )
}