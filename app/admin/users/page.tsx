"use client"
import { Select } from "@/components/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, User } from "lucide-react"
import { useState } from "react"
import ProductPagination from "@/components/pagination"
import UserTable from "./UserTable"
import { Badge } from "@/components/ui/badge"
import BadgeIcon from "@/components/BadgeIcon"

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
                <CardTitle>Users Management</CardTitle>
                <CardDescription>Manage your users here</CardDescription>
            </CardHeader>
            <CardContent>
                {/* <div className=" flex justify-end">
                    <Button>
                        <Plus />
                        Add Cateogry
                    </Button>
                </div> */}
                {/* heading */}
                <div className=" grid grid-cols-2 md:grid-cols-4 gap-4">
                    {
                        Array.from({ length: 4 }).map((_, index) => (
                            <Card key={index}>
                                <CardContent>
                                    <div className=" flex justify-between items-center">
                                        <div>
                                            <div className=" text-sm">Active user</div>
                                            <div className=" text-2xl font-bold">1234</div>
                                        </div>
                                        <BadgeIcon color="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                            <User size={20} />
                                        </BadgeIcon>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
                <div className=" mt-6 flex gap-3">
                    <div className=" w-full max-w-xl">
                        <Input className="" placeholder="Search user name" />
                    </div>


                    <Select placeholder="Order Status" label="Order Status" selectItems={ORDER_STATUS} value={selectedOrderStatus} onValueChange={setSelectedOrderStatus} />
                </div>
                <UserTable />
                <ProductPagination />
            </CardContent>
        </Card>
    </div>
}

export default Page