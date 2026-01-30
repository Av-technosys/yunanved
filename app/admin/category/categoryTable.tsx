/* eslint-disable react-hooks/purity */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface CategoryTableProps {
  page: number
}

const PAGE_SIZE = 10

const CategoryTable = ({ page }: CategoryTableProps) => {
const startIndex = (page - 1) * PAGE_SIZE

  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
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
                    <p>Category {rowNumber}</p>
                  </div>
                </TableCell>
                <TableCell>{Math.floor(Math.random() * 100)}</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default CategoryTable
