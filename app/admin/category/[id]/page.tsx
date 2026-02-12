/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import EditCategory from "./editClient";
import { db } from "@/lib/db";
import { category } from "@/db/productSchema";
import { eq } from "drizzle-orm";

interface PageProps {
  params: {
    id: any;
  };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
console.log('id is', id)
  const categoryInfo = await db
    .select()
    .from(category)
    .where(eq(category.id, id));

 console.log('cate info', categoryInfo)
  
  return (
    <>
      <EditCategory categoryInfo={categoryInfo[0]} />
    </>
  );
};

export default Page;
