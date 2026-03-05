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
import Image from "next/image";

export async function Categories() {
  const categories = await getCategories();

  return (
    <section className="w-full mt-8  bg-white">
      <h2 className="text-3xl font-bold text-center mb-4 md:mb-10 text-slate-900 tracking-tight">
        Explore All Categories
      </h2>


      <div className="relative w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full md:px-8"
        >
          <CarouselContent className="overflow-visible py-2">
            {categories?.map((cat, index) => (
              <CarouselItem
                key={index}
                className="basis-[132px] sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/7"
              >
                <CategoryCard cat={cat} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="cursor-pointer hidden md:block top-16 md:top-20 left-0 " />
          <CarouselNext className="cursor-pointer hidden md:block top-16 md:top-20 right-0 " />
        </Carousel>
      </div>
    </section>
  );
}


const CategoryCard = ({ cat }: { cat: any }) => {
  return (
    <Link href={`category/${cat.slug}`}>
      <div className="flex flex-col items-center group cursor-pointer">
        {/* Gradient Ring */}
        <div className="relative p-[3px] rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 transition-transform duration-300 group-hover:scale-110">
          <div className="bg-white rounded-full">
            <div className="relative size-28 sm:w-28 sm:h-28 lg:w-32 lg:h-32 overflow-hidden rounded-full border border-slate-100 shadow-inner">
              <Image
                src={`${NEXT_PUBLIC_S3_BASE_URL}/${cat.bannerImage}`}
                alt={cat.name}
                className="w-full h-full object-cover"
                width={200}
                height={200}
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
  )
}