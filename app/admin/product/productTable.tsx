import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const ProductTable = () => {
    return <div className=" mt-8">
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[352px]">Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className=" w-[150px]">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.from({ length: 10 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                <div className=" flex items-center gap-2">
                                    <div className=" size-8 bg-gray-700"></div>
                                    <p>Product Name</p>
                                </div>
                            </TableCell>
                            <TableCell>Atta</TableCell>
                            <TableCell>Yes</TableCell>
                            <TableCell>$250.00</TableCell>
                            <TableCell>Yes</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
}

export default ProductTable;