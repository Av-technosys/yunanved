/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

/* eslint-disable react-hooks/purity */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Eye } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Select } from "@/components/select";
import { sendOrderCancellationEmail, sendOrderConfirmationEmail, sendOrderShippedEmail, sendOrderStatusEmail, updateOrderStatus } from "@/helper/index";
import { ORDER_STATUS } from "@/const/globalconst";
import { useClientSideUser } from "@/hooks/getClientSideUser";
import { getUserEmailByUserId } from "@/helper/getUserId";

interface OrderTableProps {
  page: number;
  orders: any;
  pageSize: number;
}

/* convert constant → select items */
const ORDER_STATUS_OPTIONS = Object.values(ORDER_STATUS).map((status) => ({
  value: status,
  label: status.charAt(0).toUpperCase() + status.slice(1),
}));

const OrderTable = ({ page, orders, pageSize }: OrderTableProps) => {
  const startIndex = (page - 1) * pageSize;
   const now = new Date();
   const currentDate = now.toLocaleDateString('en-IN');
   const currentTime = now.toLocaleTimeString('en-IN');

  const [isPending, startTransition] = useTransition();
 
 

  const router = useRouter();
  const pathname = usePathname();

  const orderStatusEmailSender = async (order:any,value:any)=>{
     const userDetails:any = await getUserEmailByUserId(order.userId);
     if(value == 'processing'){
      await sendOrderConfirmationEmail(userDetails?.email, order?.id ,currentDate,currentTime, 'Online Payment', '7-8 days from order date', order?.totalAmountPaid.toString(), `${order?.addressLine1} ${order?.addressLine2}, ${order?.city}, ${order?.state}, ${order?.postalCode}`);
     }else if(value == 'canceled'){
      await sendOrderCancellationEmail(userDetails?.email, order?.id);
     }else if (value == 'shipped') {
      await sendOrderShippedEmail(userDetails?.email, order?.id, 'Blue Dart', '987654321');
     }else if(value == 'delivered'){
      await sendOrderStatusEmail(userDetails?.email, order?.id);
     }
  }



  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Amount Paid</TableHead>
            <TableHead>AddressLine1</TableHead>
            <TableHead>AddressLine2</TableHead>
            <TableHead className="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.length > 0 ? (
            orders?.map((order: any, index: number) => {
              const rowNumber = Number(startIndex) + index + 1;

              return (
                <TableRow
                  key={rowNumber}
                  className={isPending ? "opacity-60" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <p>{rowNumber}</p>
                    </div>
                  </TableCell>

                  <TableCell>{order.id}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[140px]">
                      <Select
                        placeholder="Status"
                        label="Status"
                        value={order.status}
                        selectItems={ORDER_STATUS_OPTIONS}
                        onValueChange={(value) => {
                          startTransition(() => {
                            updateOrderStatus(order.id, value);
                            orderStatusEmailSender(order,value);
                          });
                        }}
                      />
                    </div>
                  </TableCell>

                  <TableCell>{order.totalAmountPaid}</TableCell>
                  <TableCell>{order.addressLine1}</TableCell>
                  <TableCell>{order.addressLine2}</TableCell>

                  <TableCell className="text-right">
                    <button
                      onClick={() => router.push(`${pathname}/${order.id}`)}
                      className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                      aria-label="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-gray-600">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
