
import ProductCarousel from "./ProductCarousel";
import { getProductsByCategorySlug } from "@/helper";

export default async function Collections() {
  const bestSeller = await getProductsByCategorySlug("best-seller");
  const newArrival = await getProductsByCategorySlug("new-arrival");

  return (
    <div className="bg-white mt-8">
      <ProductCarousel title="New Arrival" items={newArrival} />
      <ProductCarousel title="Best Seller" items={bestSeller} />
    </div>
  );
}