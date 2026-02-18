"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CouponTable from "./couponTable";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Search } from "lucide-react";
import AddOrEditCouponDialog from "./addOrEditCouponDialog";
import { useState } from "react";

const CouponClient = ({ coupons }: any) => {
  const [alertDialog, setAlertDialog] = useState(false);
  return (
    <>
      <AddOrEditCouponDialog
        alertDialog={alertDialog}
        setAlertDialog={setAlertDialog}
        couponDetails={""}
      />
      <div className="w-full px-1 min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Coupon Management</CardTitle>
            <CardDescription>Manage your coupons here</CardDescription>
          </CardHeader>

          <CardContent>
            {/* ADD */}
            <div className="flex justify-end mb-4">
              <Button onClick={() => setAlertDialog(true)}>
                <Plus />
                Add Coupon
              </Button>
            </div>

            <div className="relative">
              <CouponTable coupons={coupons} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CouponClient;
