import Image from "next/image";
import { Grid2X2, Heart, UsersRound } from "lucide-react";

const stats = [
  {
    icon: UsersRound,
    value: "10,000+",
    label: "Happy Customers",
  },
  {
    icon: Heart,
    value: "10,000+",
    label: "User Reviews",
  },
  {
    icon: Grid2X2,
    value: "10,000+",
    label: "Happy Customers",
  },
];

const promos = ["/Story.png", "/Story.png", "/Story.png"];

export function TrustPromoSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-10 md:px-4 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="relative h-[310px] overflow-hidden rounded-2xl bg-[#ffe1c8] md:h-[400px]">
          <Image
            src="/trusted.png"
            alt="Shopora lifestyle collection"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <span className="inline-flex rounded-full bg-[#ffe1d1] px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#a96b4d] shadow-sm">
            Our Story
          </span>
          <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
            Quality You Can Trust,
            <span className="block">Service You&apos;ll Love</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm font-normal leading-relaxed text-slate-600 md:text-base">
            At Shopora, we bring you a curated selection of top-quality products
            across lifestyle, fashion, electronics, and more.
          </p>
          <p className="mt-4 max-w-2xl text-sm font-normal leading-relaxed text-slate-600 md:text-base">
            Our mission is simple — deliver value, build trust, and make your
            shopping experience seamless.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex items-center gap-3">
                  <Icon className="h-8 w-8 shrink-0 text-[#ff8a4c]" />
                  <div>
                    <p className="text-lg font-bold leading-tight text-slate-950">
                      {item.value}
                    </p>
                    <p className="text-xs font-medium text-slate-700">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hide-scrollbar mt-10 flex gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
        {promos.map((promo, index) => (
          <article
            key={`${promo}-${index}`}
            className="relative h-52 min-w-[82%] overflow-hidden rounded-xl bg-slate-100 md:min-w-0"
          >
            <Image
              src={promo}
              alt={`Story promotion ${index + 1}`}
              fill
              className="object-cover"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
