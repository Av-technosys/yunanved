/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";
import { ProductCard } from "../productCard";
import { useClientSideUser } from "@/hooks/getClientSideUser";
interface SectionProps {
  title: string;
  items: any[];
}

const ProductCarousel = ({ title, items }: SectionProps) => {
  const { userDetails } = useClientSideUser();

  if (!items?.length) return null;
  const visibleItems = items.slice(0, 8);

  return (
    <section className="mt-12 max-w-7xl mx-auto overflow-visible px-3 md:px-4">
      {/* Header */}
      <div className="relative mb-7 md:mb-10">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950">
            {title === "New Arrival" ? "New Arrivals" : title}
          </h2>
        </div>

        <div className="mt-2 grid items-center gap-2 md:grid-cols-[1fr_auto_1fr]">
          <div className="hidden md:block" />
          <p className="text-center text-sm font-normal text-slate-600 md:text-base">
            Discover our newest arrivals, thoughtfully designed to elevate
            everyday style with purpose and quality.
          </p>
          <Link
            href="/category"
            className="justify-self-end text-xs font-bold uppercase tracking-wide text-slate-950 underline decoration-[#02A9E5] underline-offset-4 transition-colors hover:text-[#02A9E5]"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {visibleItems.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            userId={userDetails?.id}
            />
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel;
