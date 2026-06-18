
import { getFeaturedProducts } from "@/helper";
import { FeaturedProductCard } from "./featuredProductCard";
import { getServerSideUser } from "@/hooks/getServerSideUser";
import Link from "next/link";
import getCashedData from "@/config/getCashData";

type FeaturedProduct = Awaited<ReturnType<typeof getFeaturedProducts>>[number];

export async function FeaturedProducts() {
  const products = (await getCashedData(getFeaturedProducts, [
    "featured-products",
  ])) as FeaturedProduct[];
  const userDetails = await getServerSideUser();



  return (
    // Cleaned up the section classes
    <section className="md:py-12 py-8">
      <div className="max-w-7xl md:px-7 px-2 mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className=" text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Featured Products
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-normal text-slate-600 md:text-base">
            Discover our newest arrivals, thoughtfully designed to elevate
            everyday style.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2  items-stretch sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {products.map((product) => (
            <FeaturedProductCard key={product.id} product={product} userDetails={userDetails} />
          ))}
        </div>

        {/* Explore Button */}
        <div className="text-center">
          <Link  href={"/category"} className="bg-[#414141] hover:bg-black text-white rounded-full px-12 py-6 text-lg font-medium">
            Explore All
          </Link>
        </div>
      </div>
    </section>
  );
}
