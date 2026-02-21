import { Hero } from "@/components/landing/Hero";
import { Categories } from "@/components/landing/Categories";
import { FeaturedProducts } from "@/components/landing/FeaturedProducts";
import { FAQ } from "@/components/landing/FAQ";

import { Footer } from "@/components/landing/Footer";
import NavBar from "@/components/landing/Navbar";
import ProductCarousel from "@/components/landing/ProductCarousel";
import { BentoGallery } from "@/components/landing/BentoGallery";
import { Newsletter } from "@/components/landing/NewsLetter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans overflow-x-hidden">
      <NavBar />
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 flex flex-col gap-6">
          <Hero />
          <Categories />
          <BentoGallery />
          <ProductCarousel />
          <FeaturedProducts />
          <Newsletter />
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
}
