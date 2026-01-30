"use client"
import { Heading, P, SubHeading } from "@/components"
import { Select } from "@/components/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CATEGORY_1 } from "@/const"
import { Plus } from "lucide-react"
import { useMemo, useState } from "react"
import CategoryTable from "./categoryTable"
import ProductPagination from "@/components/pagination"

const Page = () => {

    const VISIBILITY = [
        { value: "visible", label: "Visible" },
        { value: "hidden", label: "Hidden" },
    ]

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
                        Add Cateogry
                    </Button>
                </div>
                {/* heading */}
                <div className=" flex gap-3">
                    <div className=" w-full max-w-xl">
                        <Input className="" placeholder="Search Category" />
                    </div>


                    <Select placeholder="Select Visibility" label="Visibility" selectItems={VISIBILITY} value={selectedVisibility} onValueChange={setSelectedVisibility} />
                </div>
                <CategoryTable />
                <ProductPagination />
            </CardContent>
        </Card>
    </div>
}

export default Page