/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardDescription } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import StarRatings from "react-star-ratings";

const ProductCard = ({ product, index, className = "", slug = "" }: any) => {
  console.log("products", product);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    addItem({
      productId: product.id,
      sku: product.sku,
      slug: product.slug,
      title: product.name,
      image: product.bannerImage,
      price: product.basePrice,
      originalPrice: product.strikethroughPrice ?? undefined,
      attributes: [],
    });
  };
  return (
    <>
      <Card key={index} className="p-0">
        <CardContent className="p-2">
          <Link href={`/product/${product.slug}`}>
            <div className={cn(`relative min-h-52 w-full`, className)}>
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
                <StarRatings
                  rating={product.rating}
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  starRatedColor="#facc15"
                  name="rating"
                />
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

            <Button
              className={cn(
                "transition-colors bg-[#235A62] hover:bg-[#1b454c] text-white",
              )}
              onClick={handleAddToCart}
            >
              <span className="hidden md:block">Add to Cart</span>
              <ShoppingCart />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
