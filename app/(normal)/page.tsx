import { Hero } from "@/components/landing";
import { Categories } from "@/components/landing";
import { FeaturedProducts } from "@/components/landing";
import { FAQ } from "@/components/landing";
import { Collections } from "@/components/landing";
import { BentoGallery } from "@/components/landing";
import { Newsletter } from "@/components/landing";
import { NavbarCategoryRibbon } from "@/components/landing";


export default function Home() {
  return (
    <div className="flex px-4 max-sm:px-2 mx-auto min-h-screen flex-col font-sans overflow-x-hidden">
      <NavbarCategoryRibbon />
      <Hero />
      <Categories />
      <BentoGallery />
      <Collections />
      <FeaturedProducts />
      <Newsletter />
      <FAQ />
    </div>
  );
}
