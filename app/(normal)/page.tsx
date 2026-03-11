import { Hero } from "@/components/landing/Hero";
import { Categories } from "@/components/landing/Categories";
import { FeaturedProducts } from "@/components/landing/FeaturedProducts";
import { FAQ } from "@/components/landing/FAQ";
import Collections from "@/components/landing/ProductCarousel";
import { BentoGallery } from "@/components/landing/BentoGallery";
import { Newsletter } from "@/components/landing/NewsLetter";
import { NavbarCategoryRibbon } from "@/components/landing/NavbarCategoryRibbon";


export default function Home() {
  return (
    <div className="flex max-w-7xl px-4 max-sm:px-2 mx-auto min-h-screen flex-col font-sans overflow-x-hidden">
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
