import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const CategoryTable = () => {
    return <div className=" mt-8">
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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
                            <TableCell>Active</TableCell>

                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
}

export default CategoryTable;