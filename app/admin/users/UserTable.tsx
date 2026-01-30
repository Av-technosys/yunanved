import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

const UserTable = () => {
    return <div className=" mt-8">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Users</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
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
                                    <p>User Name</p>
                                </div>
                            </TableCell>
                            <TableCell>user@example.com</TableCell>
                            <TableCell>+91 1234567890</TableCell>
                            <TableCell><Badge className={getStatusBadgeColor("active")}>Active</Badge></TableCell>

                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
}

export default UserTable;