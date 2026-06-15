import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah J.",
    text: "Great products, amazing prices and super fast delivery. Highly recommended!",
  },
  {
    id: 2,
    name: "Sarah J.",
    text: "Great products, amazing prices and super fast delivery. Highly recommended!",
  },
  {
    id: 3,
    name: "Sarah J.",
    text: "Great products, amazing prices and super fast delivery. Highly recommended!",
  },
];

export function CustomerReviews() {
  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-10 md:px-4 md:py-14">
      <div className="relative mb-8 md:mb-10">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-slate-950 md:text-3xl">
            Customer Reviews
          </h2>
        </div>

        <div className="mt-2 grid items-center gap-2 md:grid-cols-[1fr_auto_1fr]">
          <div className="hidden md:block" />
          <p className="text-center text-xs text-slate-700 md:text-sm">
            See what our happy customers are saying about their experience with us.
          </p>
          <Link
            href="#"
            className="justify-self-end text-xs font-bold uppercase tracking-wide text-slate-950 underline decoration-[#02A9E5] underline-offset-4 transition-colors hover:text-[#02A9E5]"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="hide-scrollbar flex gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="min-w-[82%] rounded-xl bg-white px-6 py-5 shadow-[0_4px_10px_rgba(15,23,42,0.18)] md:min-w-0 md:px-7 md:py-6"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < 4
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>

            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700 md:text-base">
              “{review.text}”
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Image
                src="/reviewer.png"
                alt={review.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
              <span className="text-sm font-semibold text-slate-700">
                — {review.name}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
