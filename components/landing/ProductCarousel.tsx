/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import { ProductCard } from "../productCard";

interface SectionProps {
  title: string;
  items: any[];
}

const ProductCarousel = ({ title, items }: SectionProps) => {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // track carousel state
  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!items?.length) return null;

  return (
    <section className="mt-12 max-w-7xl mx-auto overflow-visible">
      {/* Header */}
      <div className="text-center mb-6 md:mb-10 md:px-4">
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
          Discover our newest arrivals, thoughtfully designed to elevate everyday style.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full md:px-8 "
        >
          <CarouselContent className="overflow-visible py-2 md:px-3 ">
            {items.map((product, index) => (
              <CarouselItem
                key={product.id}
                className="pl-2 basis-[70%] sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <ProductCard product={product} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Nav Buttons */}
         <CarouselPrevious className="hidden md:block cursor-pointer top-1/2 -translate-y-1/2 left-0 z-10" />
<CarouselNext className="hidden md:block cursor-pointer top-1/2 -translate-y-1/2 right-0 z-10" />
        </Carousel>

        {/* Dots Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === current - 1 ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;