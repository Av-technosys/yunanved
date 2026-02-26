import Image from "next/image";
import { Quote } from "lucide-react";
import founderImage from "@/public/aboutUsFounder.png";

export default function FounderMessage() {
  return (
    <section className="w-full bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-5 items-center">
          <div className="relative col-span-1 md:col-span-2 h-[320px] sm:h-[400px] md:h-full w-full">
            <Image
              src={founderImage.src}
              alt="Founder"
              fill
              className="object-cover"
            />
          </div>

          <div className="col-span-1 md:col-span-3 p-8 md:p-12 space-y-6">
            <Quote className="w-8 h-8 text-gray-400" />

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              A Message From Our Founder
            </h2>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              “Our goal wasn’t just to build a store, but a brand that people
              can rely on like a trusted friend. Every item we ship reflects our
              promise of quality and the hard work of our entire team.”
            </p>

            <div>
              <h4 className="font-semibold text-gray-900">Jonathan Sterling</h4>
              <p className="text-sm text-gray-500">CEO & Founder, BrandStore</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
