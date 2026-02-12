import { Button } from "@/components/ui/button";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="w-full bg-white">
      {/* Top Category Nav */}
      <nav className="hidden md:flex justify-center items-center gap-16 py-4  text-sm font-medium text-slate-600">
        {[
          "Mens wear",
          "Womens Wear",
          "Electronics",
          "Grocery",
          "Mobiles/Tablets",
          "Beauty",
          "Food",
          "Perfumes",
          "Laptop",
        ].map((item) => (
          <Link
            key={item}
            href="/category"
            className="hover:text-black transition-colors"
          >
            {item}
          </Link>
        ))}
      </nav>

      <div className="max-w-7xl mx-auto  py-10 space-y-10">
        {/* Main Hero Banner */}
        <div className="relative w-full h-[300px] md:h-[300px] rounded-xl overflow-hidden group">
          <img
            src="/grocery-banner.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Grocery Promotion"
          />
          {/* Dark Blur Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
              20% Off on Groceries
            </h1>
            <p className="text-gray-200 text-sm md:text-lg max-w-xl leading-relaxed">
              Discover the latest trend in technology — elegant design crafted
              for the modern lifestyle
            </p>
          </div>
        </div>

        {/* Triple Promo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Essentials */}
          <div className="bg-[#00CCEE] rounded-xl p-8 relative overflow-hidden h-64 flex flex-col justify-between">
            <div className="z-10">
              <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                Everyday Essentials,
                <br />
                Elevated.
              </h3>
              <p className="text-slate-800 text-sm mt-2">
                Perfume, Milk, Eggs & more
              </p>
            </div>
            <Button className="w-fit bg-black text-white rounded-xl px-6 hover:bg-slate-800 z-10">
              Order Now
            </Button>
            <img
              src="/shoe-promo.png"
              className="absolute right-0 bottom-0 w-1/2 h-36 object-contain object-right-bottom opacity-90"
            />
          </div>

          {/* Card 2 - Grocery */}
          <div className="bg-[#FFCC00] rounded-xl p-8 relative overflow-hidden h-64 flex flex-col justify-between">
            <div className="z-10">
              <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                Find Grocery At
                <br />
                Lowest Prices
              </h3>
              <p className="text-slate-800 text-sm mt-2">
                Fruits, Butter, Oil & more
              </p>
            </div>
            <Button className="w-fit bg-black text-white rounded-xl px-6 hover:bg-slate-800 z-10">
              Order Now
            </Button>
            <img
              src="/items-float.png"
              className="absolute right-0 bottom-0 w-1/2 h-36 object-contain object-right-bottom"
            />
          </div>

          {/* Card 3 - Fashion */}
          <div className="bg-[#88DD66] rounded-xl p-8 relative overflow-hidden h-64 flex flex-col justify-between">
            <div className="z-10">
              <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                Find Your Fit
              </h3>
              <p className="text-slate-800 text-sm mt-2">
                Shoes, Sandals, Crocks & more
              </p>
            </div>
            <Button className="w-fit bg-black text-white rounded-xl px-6 hover:bg-slate-800 z-10">
              Order Now
            </Button>
            <img
              src="/cart-promo.png"
              className="absolute right-0 bottom-0 w-1/2 h-36 object-contain object-right-bottom"
            />
          </div>
        </div>

        {/* Feature Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-5 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-full">
              <Truck size={24} />
            </div>
            <div>
              <p className="font-bold text-sm">Free Shipping</p>
              <p className="text-xs text-slate-500">On order above $100</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-full">
              <RotateCcw size={24} />
            </div>
            <div>
              <p className="font-bold text-sm">Easy Return</p>
              <p className="text-xs text-slate-500">30-day return policy</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-full">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-bold text-sm">Secure Payment</p>
              <p className="text-xs text-slate-500">100% protected</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-full">
              <Headphones size={24} />
            </div>
            <div>
              <p className="font-bold text-sm">24/7 Support</p>
              <p className="text-xs text-slate-500">Dedicated assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
