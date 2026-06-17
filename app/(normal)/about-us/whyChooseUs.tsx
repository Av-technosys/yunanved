import { ShieldCheck, Truck, Headphones } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Quality Assurance",
      desc: "Every product undergoes a 25-point quality check to ensure it meets our premium standards before reaching you.",
    },
    {
      icon: Truck,
      title: "Fast & Secure Delivery",
      desc: "With warehouses in 12 major cities, we guarantee delivery within 48 hours for over 80% of our catalog.",
    },
    {
      icon: Headphones,
      title: "24/7 Expert Support",
      desc: "Our dedicated support team isn’t just a chatbot; real people are available around the clock to assist you.",
    },
  ];

  return (
    <section className="w-full bg-gray-100 py-10">
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
          {features.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className="
                  bg-white rounded-2xl p-6 shadow-md
                  transition-all duration-300 ease-out
                  hover:-translate-y-3 hover:shadow-md
                  cursor-pointer
                "
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
