import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUS_BADGE_COLORS: Record<string, string> = {
  inactive:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  active: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  suspended: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export const getStatusBadgeColor = (status: string) =>
  STATUS_BADGE_COLORS[status] ??
  "bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-300";

interface UserTableProps {
  page: number;
  users: any;
}

const PAGE_SIZE = 3;

const UserTable = ({ page, users }: UserTableProps) => {
  const startIndex = (page - 1) * PAGE_SIZE;

  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Loyalty points</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.map((user: any, index: number) => {
            const rowNumber = startIndex + index + 1;

            return (
              <TableRow key={rowNumber}>
                <TableCell>
                  <p>{rowNumber}</p>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.number}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor("active")}>
                    {user.loyaltyPoints}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
