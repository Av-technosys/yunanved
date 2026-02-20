import { getFeaturedCategories } from "@/helper";
import React from "react";
import Link from "next/link";

export const BentoGallery = async () => {
  const cards = await getFeaturedCategories();
  console.log("cardsss", cards);

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        {cards.map((card, index) => {
          const isLarge = index === 0; // First card large bana diya
          
          return (
            <Link
              key={card.id}
              href={`/category/${card.slug}`}
              className={`relative overflow-hidden rounded-[2rem] group cursor-pointer ${
                isLarge ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              {/* Background Image */}
              <img
                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${card.bannerImage}`}
                alt={card.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-black/60 flex flex-col p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
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
