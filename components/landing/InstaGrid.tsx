import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

const instaImages = [
 
  "/ProductCarousel4.jpg",
  "/gallery1.jpg",
  "/gallery2.jpg",
   "/ProductCarousel4.jpg",
  "/gallery1.jpg",
  "/gallery2.jpg",
];

export function InstaGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-10 text-center md:px-4 md:py-14">
      <p className="text-sm font-medium text-slate-950">@yunanved</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
        Shop Your Way
      </h2>
      <p className="mt-3 text-sm text-slate-600 md:text-base">
        Find your next favorite product from our curated collections.
      </p>

      <div className="hide-scrollbar mt-7 flex gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-6 md:overflow-visible">
        {instaImages.map((src, index) => (
          <div
            key={src}
            className="relative h-36 min-w-[170px] overflow-hidden rounded-xl bg-slate-100 md:h-44 md:min-w-0"
          >
            <Image
              src={src}
              alt={`Instagram collection ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <Link
        href="#"
        className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#02A9E5] px-7 text-sm font-bold text-white transition-colors hover:bg-[#0298cf]"
      >
        <Instagram className="h-5 w-5" />
        Follow us on Instagram
      </Link>
    </section>
  );
}
