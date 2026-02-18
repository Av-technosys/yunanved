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
import { useEffect, useState, useTransition } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";

const CouponClient = ({ coupons }: any) => {
  const updateQuery = useUpdateQuery();
  const [isPending, startTransition] = useTransition();
  const [alertDialog, setAlertDialog] = useState(false);

  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useDebounce(searchText, 800);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

   useEffect(() => {
      startTransition(() => {
        updateQuery("search", debouncedSearch);
      });
    }, [debouncedSearch]);

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
            <div className="flex justify-end ">
              <Button onClick={() => setAlertDialog(true)}>
                <Plus />
                Add Coupon
              </Button>
            </div>

            <div className="flex gap-3">
            <div className="w-full max-w-xl mb-2">
              <InputGroup className="flex items-center  bg-white rounded-full   py-2 shadow-none">
                <InputGroupAddon>
                  <Search className="text-gray-500" />
                </InputGroupAddon>

                <InputGroupInput
                  onChange={handleInputChange}
                  value={searchText}
                  type="text"
                  placeholder="Search By Coupon Code"
                  className="bg-transparent  focus:outline-none w-32 focus:w-56 transition-all duration-200"
                />
              </InputGroup>
            </div>

           
          </div>

            <div className="relative">
             
            {isPending && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                <Loader2 className="animate-spin w-6 h-6 text-primary" />
              </div>
            )}
              <CouponTable coupons={coupons} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CouponClient;
