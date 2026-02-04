import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Star, Trash2 } from "lucide-react";

interface ReviewTableProps {
  page: number;
  reviews: any;
}

const PAGE_SIZE = 3;

const ReviewTable = ({ page, reviews }: ReviewTableProps) => {
  const startIndex = (page - 1) * PAGE_SIZE;

  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-xl">Review and Rating</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reviews?.map((review: any, index: number) => {
            const rowNumber = startIndex + index + 1;

            return (
              <TableRow key={rowNumber}>
                <TableCell>Review {rowNumber}</TableCell>
                <TableCell>{review.name}</TableCell>

                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <p>{review.email}</p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: review?.rating ?? 0 }).map(
                        (_, i) => (
                          <Star key={i} size={18} />
                        ),
                      )}
                    </div>

                    <p>{review.message}</p>
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
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewTable;
