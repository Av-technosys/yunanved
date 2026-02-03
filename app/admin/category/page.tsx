"use client"

import { Select } from "@/components/select"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useState } from "react"
import CategoryTable from "./categoryTable"
import ProductPagination from "@/components/pagination"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname  = usePathname();
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page") ?? 1)

  const VISIBILITY = [
    { value: "visible", label: "Visible" },
    { value: "hidden", label: "Hidden" },
  ]

  const [selectedVisibility, setSelectedVisibility] =
    useState<string | undefined>()

  return (
    <div className="w-full min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
          <CardDescription>Manage your categories here</CardDescription>
        </CardHeader>

        <CardContent>
          <Link href={`${pathname}/add`}  className="flex justify-end">
            <Button>
              <Plus />
              Add Category
            </Button>
          </Link>

          <div className="flex gap-3">
            <div className="w-full max-w-xl">
              <Input placeholder="Search Category" />
            </div>

            <Select
              placeholder="Select Visibility"
              label="Visibility"
              selectItems={VISIBILITY}
              value={selectedVisibility}
              onValueChange={setSelectedVisibility}
            />
          </div>

          {/* page is controlled by URL */}
          <CategoryTable page={page} />

          <ProductPagination currentPage={page} totalPages={10} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
