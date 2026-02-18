/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ProductCard from "@/components/productCard";

export default function CategoryView({ products, slug }: any) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {products.map((product: any, index: number) => (
        <ProductCard product={product} key={index} slug={slug} />
      ))}
    </div>
  );
}
