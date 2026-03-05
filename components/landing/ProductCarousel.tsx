import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface SectionProps {
  title: string;
  items: { id: number; image: string; bgColor: string }[];
}

const ProductCarousel = ({ title, items }: SectionProps) => {
  return (
    <section className=" mt-12 max-w-7xl mx-auto overflow-visible">

      {/* Section Header */}
      <div className="text-center mb-6 md:mb-10 md:px-4">
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
          Discover our newest arrivals, thoughtfully designed to elevate everyday style with purpose and quality.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full overflow-visible py-2 md:px-6 lg:px-10"
        >

          <CarouselContent className="">



            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-[132px] md:basis-1/3 lg:basis-1/6"
              >
                <div className="group relative aspect-3/4 w-full overflow-hidden rounded-2xl shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-xl">

                  {/* background fallback */}
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: item.bgColor }}
                  />

                  <img
                    src={item.image}
                    alt="Product"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}

          </CarouselContent>

          {/* NAV BUTTONS */}
          <div className="hidden md:block ">
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </div>

        </Carousel>
      </div>
    </section>
  )
}


// Example usage
export default function Collections() {
  const DUMMY_DATA = [
    { id: 1, image: "/ProductCarousel1.jpg", bgColor: "#000000" },
    { id: 2, image: "/ProductCarousel2.jpg", bgColor: "#800000" },
    { id: 3, image: "/ProductCarousel3.png", bgColor: "#D2B48C" },
    { id: 4, image: "/ProductCarousel4.jpg", bgColor: "#2F4F4F" },
    { id: 5, image: "/ProductCarousel1.jpg", bgColor: "#000000" },
    { id: 6, image: "/ProductCarousel2.jpg", bgColor: "#800000" },
    { id: 7, image: "/ProductCarousel3.png", bgColor: "#D2B48C" },
    { id: 8, image: "/ProductCarousel4.jpg", bgColor: "#2F4F4F" },
  ];

  return (
    <div className="bg-white mt-8">
      <ProductCarousel title="New Arrival" items={DUMMY_DATA} />
      <ProductCarousel title="Best Seller" items={DUMMY_DATA} />
    </div>
  )
}
