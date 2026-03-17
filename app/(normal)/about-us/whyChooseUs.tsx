import { ShieldCheck, Truck, Headphones } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-gray-100 py-10 ">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-start max-w-2xl mr-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Why Thousands Choose Us
          </h2>
          <p className="text-gray-600 mt-4 text-sm sm:text-base">
            Built on trust and designed for your convenience, we bring the best
            of retail directly to your doorstep with unmatched reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
              <ShieldCheck className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Quality Assurance
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every product undergoes a 25-point quality check to ensure it
              meets our premium standards before reaching you.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
              <Truck className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Fast & Secure Delivery
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              With warehouses in 12 major cities, we guarantee delivery within
              48 hours for over 80% of our catalog.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
              <Headphones className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              24/7 Expert Support
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our dedicated support team isn’t just a chatbot; real people are
              available around the clock to assist you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
