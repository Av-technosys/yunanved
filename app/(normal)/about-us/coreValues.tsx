import { Cog, Leaf, Users } from "lucide-react";

export default function CoreValues() {
  return (
    <section className="w-full bg-[#F8FAFC] py-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14 ">
          <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
            Philosophy
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Our Core Values
          </h2>

          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            These principles guide every decision we make, from the sketchpad to
            the showroom floor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 mb-6">
              <Cog className="w-6 h-6 text-gray-700" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quality First
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              We use premium materials and rigorous testing to ensure every
              product stands the test of time.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 mb-6">
              <Leaf className="w-6 h-6 text-gray-700" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sustainability
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              Our commitment to the planet means ethical sourcing and
              eco-friendly manufacturing processes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 mb-6">
              <Users className="w-6 h-6 text-gray-700" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Community
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              We empower local artisans and contribute to the growth of the
              communities where we operate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
