"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import AddOrEditCouponDialog from "./addOrEditCouponDialog";
import { deleteCoupon } from "@/helper";
import { toast } from "sonner";

const CouponTable = ({ coupons }: any) => {
  const [alertDialog, setAlertDialog] = useState(false);
  const [couponDetails, setCouponDetails] = useState({});

  const couponEditHandler = (value: any) => {
    setCouponDetails(value);
    setAlertDialog(true);
  };

  const deleteHandler = async (id: any) => {
    const response = await deleteCoupon(id);
    if (response.success == true) {
      toast.success("Coupon deleted successfully");
    } else {
      toast.error("Unable to delete coupon");
    }
  };

  return (
    <>
      <AddOrEditCouponDialog
        alertDialog={alertDialog}
        setAlertDialog={setAlertDialog}
        couponDetails={couponDetails}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Coupon Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>IsDiscount Percentage</TableHead>
            <TableHead>Discount Percentage</TableHead>
            <TableHead>Discount Fixed Amount</TableHead>
            <TableHead>Use Once</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {coupons?.map((coupon: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <p>{index + 1}</p>
                  </div>
                </TableCell>

                <TableCell>{coupon.name}</TableCell>

                <TableCell>{coupon.code}</TableCell>

                <TableCell
                  className={`text-center ${coupon.isDiscountPercentage ? "text-green-500" : "text-red-500"}`}
                >
                  {coupon.isDiscountPercentage ? "Yes" : "No"}
                </TableCell>

                <TableCell className="text-center">
                  {coupon.discountPercentage}%
                </TableCell>

                <TableCell className="text-center">
                  ₹{coupon.discountFixedAmount}
                </TableCell>

                <TableCell
                  className={`text-center ${coupon.useOnce ? "text-green-500" : "text-red-500"}`}
                >
                  {coupon.useOnce ? "Yes" : "No"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {/* EDIT */}
                    <Button
                      variant="outline"
                      onClick={() => couponEditHandler(coupon)}
                    >
                      <Pencil size={16} />
                    </Button>

                    {/* DELETE */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Coupon permanently?
                          </AlertDialogTitle>

                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction
                            onClick={() => deleteHandler(coupon.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default CouponTable;
