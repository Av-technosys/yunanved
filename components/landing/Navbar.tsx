"use client";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";
import { useIsClient } from "@/hooks/useIsClient";
import Link from "next/link";
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
  const isClient = useIsClient();
  const totalItems = useCartStore((s) => s.lineItems());

  return (
    <header className="w-full  bg-white py-3 px-2 md:px-4 lg:px-12">
      <div
        className={
          "max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-16"
        }
      >
        <Sheet>
  <SheetTrigger asChild>
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
    >
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>

        {/* Logo */}
        <Link href={"/"} className="shrink-0">
          <h1 className="text-2xl font-black tracking-tighter text-[#1A2E35]">
            YUNANVED
          </h1>
        </Link>

        {/* Location Picker */}
        <div className="hidden lg:flex items-center gap-2 text-[var(--text)] cursor-pointer group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clipRule="evenodd"
            />
          </svg>

          <div className="flex flex-col leading-tight">
            <span className="text-[10px] text-gray-500 font-medium">
              Deliver to
            </span>
            <span className="text-sm font-bold group-hover:text-slate-600 transition-colors">
              Jaipur
            </span>
          </div>
        </div>

        {/* Search Bar Container */}
<div className="hidden md:flex grow max-w-2xl items-center gap-2">
            <Input
            type="text"
            placeholder="Search for Products, Brands & More"
            className="flex-1 h-11 rounded-full border-slate-300 pl-6 text-sm focus-visible:ring-1 focus-visible:ring-slate-400"
          />

          <Button
            size="icon"
            className="h-11 w-11 rounded-full bg-[var(--bg-button)] hover:bg-black text-white"
          >
            <Search size={18} />
          </Button>
        </div>

        {/* Actions (Sign Up, Login, Cart) */}
        <div className="flex items-center gap-3 md:gap-6">
          <Link
            href={"/sign-up"}
            className="hidden sm:block text-sm font-semibold text-slate-700 hover:text-black"
          >
            Sign Up
          </Link>

          <Link href={"/sign-in"}>
            <Button className="bg-[var(--bg-button)] hover:bg-black text-white rounded-full px-8 h-10 font-bold hidden md:flex">
              Login
            </Button>
          </Link>

          {/* Cart Icon with Badge */}

          <div className="relative cursor-pointer group p-2">
            <Link href={"/cart"}>
              <div className="bg-[var(--bg-button)] p-2 rounded-full text-white group-hover:bg-black transition-colors">
                <ShoppingCart size={20} />
              </div>
              {/* Notification Badge */}

              {isClient && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold min-w-5 h-5 px-1 flex items-center justify-center rounded-full border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
        <SheetContent side="left" className="w-72 p-6">



  {/* Search */}
  <div className="flex items-center gap-2  my-12">
    <Input
      type="text"
      placeholder="Search products..."
      className="flex-1 h-10 rounded-full"
    />

    <Button
      size="icon"
      className="h-10 w-10 rounded-full bg-[var(--bg-button)] text-white"
    >
      <Search size={16} />
    </Button>
  </div>

  {/* Categories */}
  <div className="flex flex-col gap-3 border-t pt-4">

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
        className="text-sm font-medium text-slate-700 hover:text-black"
      >
        {item}
      </Link>
    ))}

  </div>

  {/* Auth */}
  <div className="border-t mt-6 pt-6 flex flex-col gap-3">

    <Link href="/sign-in">
      <Button className="w-full bg-[var(--bg-button)] text-white">
        Login
      </Button>
    </Link>

    <Link href="/sign-up">
      <Button variant="outline" className="w-full">
        Sign Up
      </Button>
    </Link>

  </div>

</SheetContent>
</Sheet>
      </div>
    </header>
  );
};

export default Navbar;
