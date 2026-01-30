"use client"
import { Select } from "@/components/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useState } from "react"
import ProductPagination from "@/components/pagination"
import OrderTable from "./OrderTable"

const Page = () => {

    const ORDER_STATUS = [
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" },
        { value: "failed", label: "Failed" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },

    ]

    const [selectedOrderStatus, setSelectedOrderStatus] = useState<string | undefined>(undefined);

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
                        <Input className="" placeholder="Search user name" />
                    </div>


                    <Select placeholder="Order Status" label="Order Status" selectItems={ORDER_STATUS} value={selectedOrderStatus} onValueChange={setSelectedOrderStatus} />
                </div>
                <OrderTable />
                <ProductPagination />
            </CardContent>
        </Card>
    </div>
}

export default Page