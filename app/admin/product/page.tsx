"use client"
import { Heading, P, SubHeading } from "@/components"
import { Select } from "@/components/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CATEGORY_1 } from "@/const"
import { Plus } from "lucide-react"
import { useMemo, useState } from "react"
import ProductTable from "./productTable"
import ProductPagination from "./pagination"

const Page = () => {

    const CATEGORY = useMemo(() => {
        return CATEGORY_1.map((category) => ({
            value: category.id,
            label: category.name,
        }))
    }, []);

    const STOCK_STATUS = [
        { value: "in_stock", label: "In Stock" },
        { value: "out_of_stock", label: "Out of Stock" },
    ]

    const VISIBILITY = [
        { value: "visible", label: "Visible" },
        { value: "hidden", label: "Hidden" },
    ]

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [selectedStockStatus, setSelectedStockStatus] = useState<string | undefined>(undefined);
    const [selectedVisibility, setSelectedVisibility] = useState<string | undefined>(undefined);

    return <div className=" w-full">
        <Card>
            <CardHeader>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>Manage your products here</CardDescription>
            </CardHeader>
            <CardContent>
                <div className=" flex justify-end">
                    <Button>
                        <Plus />
                        Add Product
                    </Button>
                </div>
                {/* heading */}
                <div className=" flex gap-3">
                    <div className=" w-full max-w-xl">
                        <Input className="" placeholder="Search product" />
                    </div>

                    <Select placeholder="Select Category" label="Category" selectItems={CATEGORY} value={selectedCategory} onValueChange={setSelectedCategory} />
                    <Select placeholder="Select Stock Status" label="Stock Status" selectItems={STOCK_STATUS} value={selectedStockStatus} onValueChange={setSelectedStockStatus} />
                    <Select placeholder="Select Visibility" label="Visibility" selectItems={VISIBILITY} value={selectedVisibility} onValueChange={setSelectedVisibility} />
                </div>
                <ProductTable />
                <ProductPagination />
            </CardContent>
        </Card>
    </div>
}

export default Page