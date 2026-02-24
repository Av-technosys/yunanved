
import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderById } from "@/helper";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

import React from "react";
interface PageProps {
  params: {
    id: any;
  };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const orderDetails = await getOrderById(id);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="space-y-6 max-w-3xl mx-auto p-4">
          <Card>
            <CardContent className="flex gap-4">
              <div className="flex flex-col  flex-1">
                <p className="text-sm text-muted-foreground mt-1">
                  OrderId :{orderDetails?.id}
                  <br />
                  UserId : {orderDetails?.userId}
                </p>

                <div className="flex items-center  gap-2 mt-5  font-medium">
                  <CheckCircle className="h-5 w-5" />
                  Order Status
                  <span className="ml-auto text-green-500 text-sm ">
                    {orderDetails?.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm ">
              <p>
                {orderDetails?.addressLine1} {orderDetails?.city}
              </p>
              <p>{orderDetails?.state}</p>
              <p>{orderDetails?.pincode}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex justify-between font-semibold text-black-600">
                <span>Total</span>
                <span className="text-amber-500 font-bold">₹{orderDetails?.totalAmountPaid}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Link href="/dashboard/orders">
            <Button  className="w-[200px] border border-[#235A62] rounded-full text-[#235A62]" variant="outline">Cancel</Button></Link>
            <Button className="bg-[#235A62] hover:bg-[#235A62] w-[200px] rounded-full">Download Invoice</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
