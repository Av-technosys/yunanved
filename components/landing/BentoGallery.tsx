import React from 'react';

export const BentoGallery = () => {
  const cards = [
    {
      id: 1,
      title: "Explore Phones",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "/gallery1.jpg",
      className: "md:col-span-2 md:row-span-2",
      isLarge: true, // Unique flag for the iPhone card
    },
    {
      id: 2,
      title: "Women",
      desc: "Lorem Ipsum is simply dummy",
      image: "/gallery2.jpg",
      className: "",
      isLarge: false,
    },
    {
      id: 3,
      title: "Style",
      desc: "Lorem Ipsum is simply dummy",
      image: "/gallery3.jpg",
      className: "",
      isLarge: false,
    },
    {
      id: 4,
      title: "Kids",
      desc: "Lorem Ipsum is simply dummy",
      image: "/gallery4.jpg",
      className: "",
      isLarge: false,
    },
    {
      id: 5,
      title: "Accessories",
      desc: "Lorem Ipsum is simply dummy",
      image: "/gallery1.jpg",
      className: "",
      isLarge: false,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-[2rem] group cursor-pointer ${card.className}`}
          >
            {/* Background Image */}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Hover Overlay - Logic changes based on isLarge */}
            <div className={`absolute inset-0 bg-black/60 flex flex-col p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              card.isLarge ? "items-start justify-center" : "items-center justify-center"
            }`}>
              
              {/* Title - Bigger for Large Card */}
              <h3 className={`text-white font-bold mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ${
                card.isLarge ? "text-5xl md:text-6xl text-left" : "text-2xl text-center"
              }`}>
                {card.title}
              </h3>

              {/* Description - Wider for Large Card */}
              <p className={`text-gray-200 text-sm mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 ${
                card.isLarge ? "text-left max-w-md leading-relaxed" : "text-center max-w-[200px] line-clamp-1"
              }`}>
                {card.desc}
              </p>

              {/* Discover More Button */}
              <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-white hover:text-black transition-all transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                Discover More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};