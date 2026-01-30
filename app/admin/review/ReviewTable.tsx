import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, Star, Trash2 } from "lucide-react";

const STATUS_BADGE_COLORS: Record<string, string> = {
    inactive: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    active: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    suspended: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export const getStatusBadgeColor = (status: string) => {
    return (
        STATUS_BADGE_COLORS[status] ??
        "bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    );
};

const ReviewTable = () => {
    return <div className=" mt-8">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">OrderId</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className=" w-xl">Review and rating</TableHead>
                    <TableHead className=" w-[100px]">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.from({ length: 10 }).map((_, index) => (
                        <TableRow key={index}>

                            <TableCell>#ORD153</TableCell>
                            <TableCell>John Due</TableCell>
                            <TableCell className="font-medium">
                                <div className=" flex items-center gap-2">
                                    <div className=" size-8 bg-gray-700"></div>
                                    <p>User Name</p>
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">
                                <div className=" flex flex-col gap-2">
                                    <div className=" flex gap-1">
                                        <Star size={18} />
                                        <Star size={18} />
                                        <Star size={18} />
                                        <Star size={18} />
                                        <Star size={18} />
                                    </div>
                                    <p>Lorem ipsumnatus culpa.</p>
                                </div>
                            </TableCell>
                            <TableCell className=" flex gap-2 items-center">
                                <Button variant="outline" className=" w-fit"><Check /> </Button>
                                <Button variant="destructive" className=" w-fit"><Trash2 /> </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
}

export default ReviewTable;