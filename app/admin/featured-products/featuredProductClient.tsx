"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import React, { useState, useTransition } from "react";
import FeaturedProductTable from "./featuredProductTable";
import AddFeaturedProductDialog from "./addFeaturedProductDialog";

const FeaturedProductClient = ({ featuredProducts , products, total, currentPage }: any) => {
  const [isPending, startTransition] = useTransition();
  const [openDialog,setOpenDialog] =useState(false);
  
  return (
    <>
    {
      openDialog &&  <AddFeaturedProductDialog products={products} total={total} currentPage={currentPage} open={openDialog} setOpen={setOpenDialog}  />
    }
      <div className="w-full p-1">
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Manage your products here</CardDescription>
          </CardHeader>

          <CardContent>
            {/* ADD BUTTON */}
            <div className="flex cursor-pointer justify-end mb-4">
              <Button onClick={() => setOpenDialog(true)}>
                <Plus />
                Add Featured Product
              </Button>
            </div>

            {/* TABLE + OVERLAY LOADER */}
            <div className="relative">
              {isPending && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                  <Loader2 className="animate-spin w-6 h-6 text-primary" />
                </div>
              )}

              <FeaturedProductTable featuredProducts={featuredProducts} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FeaturedProductClient;
