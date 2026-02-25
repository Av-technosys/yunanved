import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getCategories } from "@/helper";
import Link from "next/link";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";

export async function Categories() {
  const categories = await getCategories();

  return (
    // Section padding (px-6 to px-16) ensures the "Screen Gap" on all devices
    <section className="w-full  bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 tracking-tight">
          Explore All Categories
        </h2>

        {/* This container adds internal padding so arrows don't overlap the circles */}
        <div className="relative w-full">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            {/* '-ml-8' creates the horizontal gap between items */}

            {/* Arrow anchor layer — centers relative to image */}
            <div className="hidden md:block pointer-events-none absolute inset-x-0 top-[56px] sm:top-[64px] lg:top-[72px]">
              <CarouselPrevious className="pointer-events-auto -left-10 h-10 w-10 " />
              <CarouselNext className="pointer-events-auto -right-10 h-10 w-10 " />
            </div>

            <CarouselContent className="-ml-8 overflow-visible py-2">
              {categories?.map((cat, index) => (
                <CarouselItem
                  key={index}
                  // 'pl-8' works with the negative margin above to create the gap
                  className="pl-10 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                >
                  <Link href={`category/${cat.slug}`}>
                    <div className="flex flex-col items-center group cursor-pointer">
                      {/* Gradient Ring */}
                      <div className="relative p-[3px] rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 transition-transform duration-300 group-hover:scale-110">
                        <div className="bg-white p-[2px] rounded-full">
                          <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 overflow-hidden rounded-full border border-slate-100 shadow-inner">
                            <img
                              src={`${NEXT_PUBLIC_S3_BASE_URL}/${cat.bannerImage}`}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Label */}
                      <span className="mt-5 font-bold text-sm md:text-base text-slate-900 text-center whitespace-nowrap">
                        {cat.name}
                      </span>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
