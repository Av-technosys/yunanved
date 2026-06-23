
import ProductCarousel from "./ProductCarousel";
import { TrustPromoSection } from "./TrustPromoSection";
import { getProductsByCategorySlug } from "@/helper";

export default async function Collections() {
  const bestSeller = await getProductsByCategorySlug("best-seller");
  const newArrival = await getProductsByCategorySlug("new-arrival");
  return (
    <div className="bg-white mt-8">
      <ProductCarousel title="New Arrival" subtitle="Discover our newest arrivals, thoughtfully designed to elevate everyday style with purpose and quality." items={newArrival} />
      <TrustPromoSection />
      <ProductCarousel title="Best Seller" subtitle="Check out our most popular products, carefully selected for their quality and style." items={bestSeller} />
    </div>
  );
}
