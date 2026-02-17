import React from "react";
import { Card, CardContent, CardDescription } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const ProductCard = ({ product, index, className = "", slug = "" }: any) => {
  return (
    <>
      <Card key={index}>
        <CardContent className="p-2">
          <Link href={`/product/${product.slug}`}>
            <div className={cn(`relative h-48 w-full`, className)}>
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${product.bannerImage}`}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
          </Link>
          <CardDescription className="mb-5">
            <div className="my-1 text-black text-[14px] font-semibold">
              {product.name}
            </div>
            <div className="flex items-center justify-between">
              <div>
                {Array.from({ length: product.rating }).map((_, index) => (
                  <span key={index} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              {/* <p
                className={`${product.stock === "In Stock" ? "text-green-600" : "text-red-600"}`}
              >
                {product.stock}
              </p> */}
            </div>
          </CardDescription>

          <div className="flex w-full mt-3 items-center justify-between">
            <div>₹{product.basePrice}</div>

            <Button className="bg-[#235A62] ">
              <span className="hidden md:block"> Add to Cart</span>{" "}
              <ShoppingCart />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
