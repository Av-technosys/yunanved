"use client"

import { useSearchParams , useRouter } from "next/navigation"
import { Select } from "@/components/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CATEGORY_1 } from "@/const"
import { Plus } from "lucide-react"
import { useMemo, useState } from "react"
import ProductTable from "./productTable"
import ProductPagination from "../../../components/pagination"

const Page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page") ?? 1)

  const CATEGORY = useMemo(() => {
    return CATEGORY_1.map((category) => ({
      value: category.id,
      label: category.name,
    }))
  }, [])

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [selectedStockStatus, setSelectedStockStatus] = useState<string | undefined>()
  const [selectedVisibility, setSelectedVisibility] = useState<string | undefined>()

  return (
    <div className="w-full ">
      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Manage your products here</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex m-3 justify-end">
            <Button onClick={() => router.push("/admin/product/create")} >
              <Plus />
              Add Product
            </Button>
          </div>

          <div className="flex gap-3">
            <div className="w-full max-w-xl">
              <Input placeholder="Search product" />
            </div>

            <Select
              placeholder="Select Category"
              label="Category"
              selectItems={CATEGORY}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            />

            <Select
              placeholder="Select Stock Status"
              label="Stock Status"
              selectItems={[
                { value: "in_stock", label: "In Stock" },
                { value: "out_of_stock", label: "Out of Stock" },
              ]}
              value={selectedStockStatus}
              onValueChange={setSelectedStockStatus}
            />

            <Select
              placeholder="Select Visibility"
              label="Visibility"
              selectItems={[
                { value: "visible", label: "Visible" },
                { value: "hidden", label: "Hidden" },
              ]}
              value={selectedVisibility}
              onValueChange={setSelectedVisibility}
            />
          </div>

          {/* page is now controlled by URL */}
          <ProductTable page={page} />
          <ProductPagination currentPage={page} totalPages={10} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
