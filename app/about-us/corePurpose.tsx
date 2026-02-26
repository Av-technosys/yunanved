import { Target, Eye } from "lucide-react";

export default function CorePurpose() {
  return (
    <section className="w-full bg-gray-100 py-5">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 relative inline-block">
            Core Purpose
            <span className="block w-28 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 mb-6">
              <Target className="w-6 h-6 text-gray-700" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Our Mission
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              To provide high-quality, accessible products that enhance the
              daily lives of our customers through constant innovation, rigorous
              testing, and a deep-rooted culture of care and accountability.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 mb-6">
              <Eye className="w-6 h-6 text-gray-700" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Our Vision
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              To become the world’s most customer-centric single-vendor
              platform, setting the gold standard for retail excellence and
              sustainable business practices in the digital age.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
