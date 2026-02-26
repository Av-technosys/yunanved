import { ArrowRight } from "lucide-react";
import AboutUsCTA from "@/public/aboutUsCTA.png";

export default function CareersCTA() {
  return (
    <section className="w-full  bg-gray-100 py-5">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div style={{ backgroundImage: `url(${AboutUsCTA.src})` , backgroundPosition: "bottom", backgroundSize:"cover" , backgroundRepeat: "no-repeat" }} className="relative overflow-hidden rounded-3xl px-8 py-12 md:px-16 md:py-20 text-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Build the Future of <br className="hidden sm:block" />
              Retail with Us
            </h2>

            <p className="mt-6 text-sm sm:text-base text-gray-300 leading-relaxed">
              We’re looking for passionate individuals who want to redefine what
              it means to shop online. Join a diverse, global team committed to
              excellence.
            </p>

            <button className="mt-8 inline-flex items-center gap-2 bg-white text-blue-500 font-medium px-6 py-3 rounded-xl hover:bg-gray-200 transition">
              View
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
