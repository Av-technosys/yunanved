import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ProductTableProps {
  page: number
}

const PAGE_SIZE = 10

const ProductTable = ({ page }: ProductTableProps) => {
  const startIndex = (page - 1) * PAGE_SIZE

  return (
    <div className="mt-8 w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[352px]">Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="w-[150px]">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: PAGE_SIZE }).map((_, index) => {
            const rowNumber = startIndex + index + 1

            return (
              <TableRow key={rowNumber}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="size-8 bg-gray-700" />
                    <p>Product {rowNumber}</p>
                  </div>
                </TableCell>
                <TableCell>Atta</TableCell>
                <TableCell>Yes</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>Yes</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductTable
