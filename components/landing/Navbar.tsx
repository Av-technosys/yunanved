"use client";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";
import { useIsClient } from "@/hooks/useIsClient";

import Link from "next/link";

import { getClientSideUser } from "@/hooks/getClientSideUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";
import { Skeleton } from "../ui";

const Navbar = () => {
  const isClient = useIsClient();
  const totalItems = useCartStore((s) => s.lineItems());

  const userInfo = getClientSideUser();
  

  return (
    <header className="w-full  bg-white py-3 px-2 md:px-4 lg:px-12">
      <div
        className={
          "max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-16"
        }
      >
        {/* Logo */}
        <Link href={"/"} className="shrink-0">
          <h1 className="text-2xl font-black tracking-tighter text-[#1A2E35]">
            YUNANVED
          </h1>
        </Link>

        {/* Location Picker */}
        <div className="hidden lg:flex items-center gap-2 text-[#1A2E35] cursor-pointer group">
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
            {!isClient ? (
              <Skeleton className="h-4 w-[120px]" />
            ) : userInfo ? (
              <span className="text-sm font-bold group-hover:text-slate-600 transition-colors">
                {userInfo.city}, {userInfo.state}
              </span>
            ) : (
              <Link
                href="/sign-in"
                className="text-sm font-bold group-hover:text-slate-600 transition-colors"
              >
                Select a location
              </Link>
            )}
          </div>
        </div>

        {/* Search Bar Container */}
        <div className="grow max-w-2xl flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search for Products, Brands & More"
            className="flex-1 h-11 rounded-full border-slate-300 pl-6 text-sm focus-visible:ring-1 focus-visible:ring-slate-400"
          />

          <Button
            size="icon"
            className="h-11 w-11 rounded-full bg-[#3D3D3D] hover:bg-black text-white"
          >
            <Search size={18} />
          </Button>
        </div>

        {/* Actions (Sign Up, Login, Cart) */}
        <div className="flex items-center gap-3 md:gap-6">
          {!isClient ? (
            <Skeleton className="h-8 w-[120px]" />
          ) : userInfo === null ? (
            <>
              <Link
                href={"/sign-up"}
                className="hidden sm:block text-sm font-semibold text-slate-700 hover:text-black"
              >
                Sign Up
              </Link>

              <Link href={"/sign-in"}>
                <Button className="bg-[#3D3D3D] hover:bg-black text-white rounded-full px-8 h-10 font-bold hidden md:flex">
                  Login
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer group">
              <Avatar className="h-9 w-9 border">
                <AvatarImage
                  src={
                    userInfo?.profileImage
                      ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${userInfo.profileImage}`
                      : undefined
                  }
                  alt="profile-image"
                  className="object-cover"
                />
                <AvatarFallback className="bg-slate-200 text-sm font-semibold text-slate-700">
                  {`${userInfo?.firstName?.[0]?.toUpperCase() ?? ""}${userInfo?.lastName?.[0]?.toUpperCase() ?? ""}`}
                </AvatarFallback>
              </Avatar>

              {userInfo?.firstName ? (
                <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-600 transition-colors">
                  {userInfo.firstName} {userInfo.lastName}
                </span>
              ) : (
                <Skeleton className="h-4 my-1 w-[120px]" />
              )}
            </div>
          )}
        
          {/* Cart Icon with Badge */}

          <div className="relative cursor-pointer group p-2">
            <Link href={"/cart"}>
              <div className="bg-[#3D3D3D] p-2 rounded-full text-white group-hover:bg-black transition-colors">
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
      </div>
    </header>
  );
};

export default Navbar;
