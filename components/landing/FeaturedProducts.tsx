
import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeaturedProducts } from "@/helper";
import Link from "next/link";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="bg-[#FFF8E7] px-4 md:px-10 py-16 rounded-[3.5rem] mx-4 my-10">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            Featured Products
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Discover our newest arrivals, thoughtfully designed to elevate everyday style.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1  items-stretch sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Card
              key={product.id}
  className="flex flex-col py-1  overflow-hidden border-none rounded-3xl shadow-sm bg-white hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <Link href={`/product/${product.slug}`}>
                <div className="h-36 flex items-center justify-center ">
                  <img
                    src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${product.bannerImage}`}
                    alt={"Product Image"}
                    className="object-contain h-full scale-150"
                  />
                </div>
              </Link>

              {/* Content */}
<div className="flex flex-col flex-1 p-4 bg-white border-t border-gray-100">                {/* Name + Category */}
<div className="mt-auto flex justify-between items-center pt-3">                  <h3 className="font-bold text-sm text-black line-clamp-1">
                    {product.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < Math.round(product.rating) ? "#FFC107" : "none"}
                      stroke="#FFC107"
                    />
                  ))}
                  <span className="text-[10px] text-gray-400">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Description */}
                <p className="text-[12px] text-gray-500 mb-2 line-clamp-2">
                  {product.description}
                </p>

                {/* Price + Button */}
<div className="mt-auto flex justify-between items-center pt-3">
                    <span className="font-bold text-lg text-black">
                    ₹{product.basePrice}
                  </span>

                  <Button className="bg-[#414141] text-white hover:bg-black rounded-lg text-xs h-8 px-4 font-bold">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Explore Button */}
        <div className="text-center">
          <Button className="bg-[#414141] hover:bg-black text-white rounded-full px-12 py-6 text-lg font-medium">
            Explore All
          </Button>
        </div>
      </div>
    </section>
  );
}
