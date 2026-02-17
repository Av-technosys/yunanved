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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { coupon } from "@/db/userSchema";
import { createCoupon, updateCoupon } from "@/helper";

import { useEffect, useState } from "react";
import { toast } from "sonner";

const AddOrEditCouponDialog = ({
  alertDialog,
  setAlertDialog,
  couponDetails,
}: any) => {
  const [couponInfo, setCouponInfo] = useState({
    name: "",
    code: "",
    description: "",
    isDiscountPercentage: false,
    discountPercentage: "",
    discountFixedAmount: "",
    useOnce: false,
  });

  useEffect(() => {
    if (couponDetails != "") {
      setCouponInfo({
        name: couponDetails?.name,
        code: couponDetails?.code,
        description: couponDetails?.description,
        isDiscountPercentage: couponDetails?.isDiscountPercentage,
        discountPercentage: couponDetails?.discountPercentage,
        discountFixedAmount: couponDetails?.discountFixedAmount,
        useOnce: couponDetails?.useOnce,
      });
    } else {
      setCouponInfo({
        name: "",
        code: "",
        description: "",
        isDiscountPercentage: false,
        discountPercentage: "",
        discountFixedAmount: "",
        useOnce: false,
      });
    }
  }, [couponDetails]);

  const updateHandler = (value: any, key: any) => {
    setCouponInfo({ ...couponInfo, [key]: value });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const couponData = {
      name: couponInfo?.name,
      code: couponInfo?.code,
      description: couponInfo?.description,
      isDiscountPercentage: couponInfo?.isDiscountPercentage,
      discountPercentage: couponInfo?.discountPercentage,
      discountFixedAmount: couponInfo?.discountFixedAmount,
      useOnce: couponInfo?.useOnce,
    };

    if (!couponDetails) {
      const response = await createCoupon(couponData);
      if (response.success == true) {
        setAlertDialog(false);
        setCouponInfo({
          name: "",
          code: "",
          description: "",
          isDiscountPercentage: false,
          discountPercentage: "",
          discountFixedAmount: "",
          useOnce: false,
        });
        toast.success("Coupon created successfully");
      }
    } else {
      const response = await updateCoupon(couponData, couponDetails?.id);
      if (response.success == true) {
        setAlertDialog(false);
        setCouponInfo({
          name: "",
          code: "",
          description: "",
          isDiscountPercentage: false,
          discountPercentage: "",
          discountFixedAmount: "",
          useOnce: false,
        });
        toast.success("Coupon updated successfully");
      }
    }
  };

  return (
    <>
      <AlertDialog open={alertDialog} onOpenChange={setAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Coupon</AlertDialogTitle>
            <AlertDialogDescription className="flex w-full mt-3 flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Coupon Name</Label>
                <Input
                  onChange={(e) => updateHandler(e.target.value, "name")}
                  name="name"
                  className="text-black"
                  value={couponInfo?.name}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Coupon Description</Label>
                <Input
                  onChange={(e) => updateHandler(e.target.value, "description")}
                  name="description"
                  className="text-black"
                  value={couponInfo?.description}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Coupon Code</Label>
                <Input
                  onChange={(e) => updateHandler(e.target.value, "code")}
                  name="code"
                  className="text-black"
                  value={couponInfo?.code}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="yes"
                      checked={couponInfo?.isDiscountPercentage === true}
                      onCheckedChange={(checked: boolean) => {
                        const isPercentage = checked;

                        updateHandler(isPercentage, "isDiscountPercentage");

                        setCouponInfo((prev: any) => ({
                          ...prev,
                          isDiscountPercentage: isPercentage,
                          discountPercentage: "",
                          discountFixedAmount: "",
                        }));
                      }}
                    />
                    <Label htmlFor="yes">Discount Percentage</Label>
                  </div>
                </div>
              </div>

              {couponInfo?.isDiscountPercentage === true && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name-1">Discount Percentage</Label>
                  <Input
                    onChange={(e) =>
                      updateHandler(e.target.value, "discountPercentage")
                    }
                    name="discountPercentage"
                    className="text-black"
                    value={couponInfo?.discountPercentage}
                  />
                </div>
              )}

              {couponInfo?.isDiscountPercentage === false && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name-1">Discount Fixed Amount</Label>
                  <Input
                    onChange={(e) =>
                      updateHandler(e.target.value, "discountFixedAmount")
                    }
                    name="discountFixedAmount"
                    className="text-black"
                    value={couponInfo?.discountFixedAmount}
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="yes"
                      checked={couponInfo?.useOnce === true}
                      onCheckedChange={(checked: any) =>
                        updateHandler(checked === true, "useOnce")
                      }
                    />
                    <Label htmlFor="yes">Use Once</Label>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => submitHandler(e)} type="submit">
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddOrEditCouponDialog;
