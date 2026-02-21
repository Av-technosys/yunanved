
import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeaturedProducts } from "@/helper";
import Link from "next/link";
import { useAddToCart } from "@/helper/useAddToCart";
import FeaturedProductCard from "./featuredProductCard";

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
            Discover our newest arrivals, thoughtfully designed to elevate
            everyday style.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <FeaturedProductCard key={product.productId} product={product} />
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
