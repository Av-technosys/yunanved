import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const STATUS_BADGE_COLORS: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    completed: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    cancelled: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    failed: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    shipped: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    delivered: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
};

export const getStatusBadgeColor = (status: string) => {
    return (
        STATUS_BADGE_COLORS[status] ??
        "bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    );
};

const OrderTable = () => {
    return <div className=" mt-8">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Category</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.from({ length: 10 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                <div className=" flex items-center gap-2">
                                    <div className=" size-8 bg-gray-700"></div>
                                    <p>Category Name</p>
                                </div>
                            </TableCell>
                            <TableCell>123</TableCell>
                            <TableCell><Badge className={getStatusBadgeColor("pending")}>Active</Badge></TableCell>

                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
}

export default OrderTable;