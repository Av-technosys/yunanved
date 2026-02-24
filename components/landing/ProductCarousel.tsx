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
    <section className="py-2 max-w-7xl mx-auto overflow-visible">

      {/* Section Header */}
      <div className="text-center mb-10 px-4">
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
          className="w-full overflow-visible"
        >

        <CarouselContent className="py-2 px-4 md:px-6 lg:px-10">

         

            {items.map((item) => (
              <CarouselItem
                key={item.id}
                 className="pr-4 md:pr-6 lg:pr-8 basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-xl">

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
            <CarouselPrevious className="-left-12 h-10 w-10" />
            <CarouselNext className="-right-12 h-10 w-10 " />
          </div>

        </Carousel>
      </div>
    </section>
  )
}


// Example usage
export default function Collections() {
  const dummyData = [
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
    <div className="bg-white">
      <ProductCarousel title="New Arrival" items={dummyData} />
      <ProductCarousel title="Best Seller" items={dummyData} />
    </div>
  )
}
