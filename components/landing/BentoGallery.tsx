import { getFeaturedCategories } from "@/helper/index";
import React from "react";
import Link from "next/link";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";
import Image from "next/image";

export const BentoGallery = async () => {
  const cards = await getFeaturedCategories();

  return (
<section className="mt-12 md:min-w-7xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        {cards.map((card, index) => {
          const isLarge = index === 0;

          return (
            <Link
              key={card.id}
              href={`/category/${card.slug}`}
              className={`relative overflow-hidden rounded-4xl group cursor-pointer bg-white ${
                isLarge ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              {/* Image */}
              <div className="relative w-full h-[250px] md:h-full">
                <Image
                  src={`${NEXT_PUBLIC_S3_BASE_URL}/${card.bannerImage}`}
                  alt={card.name}
                  fill
                  className="object-cover transition-transform duration-700 md:group-hover:scale-110"
                />
              </div>

              {/* MOBILE CONTENT (below image) */}
              <div className="md:hidden p-4 border border-gray-200 border-t-0 rounded-b-4xl">
                <h3 className="text-lg font-bold text-[var(--text)] mb-1">
                  {card.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {card.description}
                </p>

                <button className="border border-black px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-black hover:text-white transition">
                  Discover More
                </button>
              </div>

              {/* DESKTOP HOVER OVERLAY */}
              <div
                className={`hidden md:flex absolute inset-0 bg-black/60 flex-col p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isLarge
                    ? "items-start justify-center"
                    : "items-center justify-center"
                }`}
              >
                {/* Title */}
                <h3
                  className={`text-white font-bold mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ${
                    isLarge
                      ? "text-5xl md:text-6xl text-left"
                      : "text-2xl text-center"
                  }`}
                >
                  {card.name}
                </h3>

                {/* Description */}
                <p
                  className={`text-gray-200 text-sm mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 ${
                    isLarge
                      ? "text-left max-w-md leading-relaxed"
                      : "text-center max-w-[200px] line-clamp-2"
                  }`}
                >
                  {card.description}
                </p>

                {/* Button */}
                <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-white hover:text-black transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150">
                  Discover More
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};