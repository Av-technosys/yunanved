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
import FeaturedCategoryTable from "./featuredCategoryTable";
import AddFeaturedCategoryDialog from "./addFeaturedCategoryDialog";





const FeaturedCategoryClient = ({ featuredCategories ,categories,total ,currentPage }: any) => {
  const [isPending, startTransition] = useTransition();
  const [openDialog,setOpenDialog] =useState(false);

  return (
    <>
    {
      openDialog &&  <AddFeaturedCategoryDialog categories={categories} total={total} currentPage={currentPage} open={openDialog} setOpen={setOpenDialog}  />
    }
      <div className="w-full p-1">
        <Card>
          <CardHeader>
            <CardTitle>Category Management</CardTitle>
            <CardDescription>Manage your categories here</CardDescription>
          </CardHeader>

          <CardContent>
            {/* ADD BUTTON */}
            <div className="flex cursor-pointer justify-end mb-4">
              <Button onClick={()=>setOpenDialog(true)} >
                <Plus />
                Add Featured Category
              </Button>
            </div>

            {/* TABLE + OVERLAY LOADER */}
            <div className="relative">
              {isPending && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                  <Loader2 className="animate-spin w-6 h-6 text-primary" />
                </div>
              )}

              <FeaturedCategoryTable categories={featuredCategories} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FeaturedCategoryClient;
