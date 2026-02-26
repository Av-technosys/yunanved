import Image from "next/image";
import aboutUsHero from "@/public/aboutUsHero.png";

export default function HeroSection() {
  return (
    <section className="w-full bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-4 py-1 rounded-full">
              OUR JOURNEY
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Delivering Excellence Since 2018.
            </h1>

            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0">
              What started as a small boutique in the heart of the city has
              evolved into a leading e-commerce destination. We believe in the
              power of quality products to transform everyday living.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                Shop Now
              </button>

              <button className="bg-white border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                Our Values
              </button>
            </div>
          </div>

          <div className="relative w-full">
            <div className="relative h-[350px] sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={aboutUsHero.src}
                alt="Interior"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-[-22px] left-[-22px] bg-white shadow-xl rounded-xl px-6 py-4">
              <h3 className="text-blue-600 font-bold text-xl">5M+</h3>
              <p className="text-gray-500 text-sm">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
