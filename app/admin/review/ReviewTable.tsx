import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, Star, Trash2 } from "lucide-react"

interface ReviewTableProps {
  page: number
}

const PAGE_SIZE = 10

const ReviewTable = ({ page }: ReviewTableProps) => {
  const startIndex = (page - 1) * PAGE_SIZE

  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>OrderId</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="w-xl">Review and rating</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: PAGE_SIZE }).map((_, index) => {
            const rowNumber = startIndex + index + 1

            return (
              <TableRow key={rowNumber}>
                <TableCell>#ORD{150 + rowNumber}</TableCell>
                <TableCell>User {rowNumber}</TableCell>

                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="size-8 bg-gray-700" />
                    <p>Product {rowNumber}</p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={18} />
                      ))}
                    </div>
                    <p>Sample review text #{rowNumber}</p>
                  </div>
                </TableCell>

                <TableCell className="flex gap-2">
                  <Button variant="outline" className="w-fit">
                    <Check />
                  </Button>
                  <Button variant="destructive" className="w-fit">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ReviewTable
