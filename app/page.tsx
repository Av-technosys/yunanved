import { Hero } from "@/components/landing/Hero"
import { Categories } from "@/components/landing/Categories"
import { FeaturedProducts } from "@/components/landing/FeaturedProducts"
import { FAQ } from "@/components/landing/FAQ"
import { Newsletter } from "@/components/landing/Newsletter"
import { Footer } from "@/components/landing/Footer"
import NavBar from "@/components/userNavbar/NavBar"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
