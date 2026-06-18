/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Input, Label, Separator } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { CircleUserRound, Heart, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui";
import { NAVBAR_CATEGORY_RIBBON } from "@/const";
import { SearchWithIcon } from "./navbar/SearchBar";
import { CartIcon } from "./navbar/Cart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import LogoutNavbar from "./logoutNavbar";
import { useEffect, useState } from "react";

export const Navbar = ({ userInfo }: any) => {
  return (
    <div className="sticky top-0 z-50 border-b border-slate-100 bg-white pt-2">
      <header className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-16">
        <div className="flex h-12 w-full items-center justify-between gap-4 md:h-[52px] md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 rounded-full text-slate-900 md:hidden"
              >
                <Menu style={{ width: 22, height: 22 }} />
              </Button>
            </SheetTrigger>

            {/* Logo */}
            <Link href={"/"} className="flex shrink-0 items-center">
              <Image
                src="https://d209jjsil73ccf.cloudfront.net/landingImages/mainlogo.png"
                alt="YUNANVED"
                width={140}
                height={40}
                className="h-7 w-auto object-contain md:h-8"
              />
            </Link>

            <div className="hidden shrink-0 md:flex md:-ml-1">
              <UserLocation userInfo={userInfo} />
            </div>

            <div className="hidden min-w-0 flex-1 justify-center md:flex">
              {/* Search Bar Container */}
              <div className="w-full max-w-[760px]">
                <SearchWithIcon />
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
              {/* Actions (Sign Up, Login, Cart) */}
              <div className="hidden items-center gap-2 md:flex">
                {userInfo ? (
                  <LogedInUserDetail userInfo={userInfo} />
                ) : (
                  <AuthBtns />
                )}
              </div>

              <div className="[&>div]:p-0 [&_button]:h-8 [&_button]:w-8 [&_button]:rounded-full [&_button]:bg-transparent [&_button]:p-0 [&_button]:text-slate-950 [&_button]:shadow-none [&_button]:hover:bg-slate-50 [&_svg]:h-[18px] [&_svg]:w-[18px]">
                <CartIcon />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Wishlist"
                className="hidden h-8 w-8 rounded-full p-0 text-slate-950 hover:bg-slate-50 sm:inline-flex"
              >
                <Heart style={{ width: 18, height: 18 }} />
              </Button>

              <Popover>
                <PopoverTrigger className=" block sm:hidden" asChild>
                  <Button
                    className="flex items-center justify-center rounded-full text-slate-900"
                    variant="ghost"
                  >
                    <CircleUserRound style={{ width: 22, height: 22 }} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="mr-2 flex w-44 flex-col gap-2 rounded-2xl border-slate-100 shadow-md">
                  {userInfo ? (
                    <>
                      <LogedInUserDetail userInfo={userInfo} />
                      <div className=" sm:hidden  mt-3 flex flex-col items-start gap-2">
                        <Separator />
                        <LogoutNavbar />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Link href="/sign-in">Login</Link>
                      </div>
                      <Separator />
                      <div>
                        <Link href="/sign-up">Sign Up</Link>
                      </div>
                    </>
                  )}
                </PopoverContent>
              </Popover>
            </div>

            <SheetContent
              onOpenAutoFocus={(e) => e.preventDefault()}
              side="left"
              className="w-80 px-4 py-6 pt-8"
            >
              <Link href={"/"} className="mb-6 flex items-center">
                <Image
                  src="/mainlogo.png"
                  alt="YUNANVED"
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </Link>

              {/* Search */}
              <div className="pb-5">
                <SearchWithIcon />
              </div>

              {/* Categories */}
              <div className="flex flex-col gap-1 border-t border-slate-100 pt-4">
                <Link
                  href="/"
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-[#02A9E5] hover:bg-sky-50"
                >
                  Home
                </Link>
                {NAVBAR_CATEGORY_RIBBON.map((item) => (
                  <Link
                    key={item}
                    href="/category"
                    className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-black"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Auth */}
              <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
                {userInfo ? (
                  <Link href="/dashboard" className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage
                        src={
                          userInfo?.profileImage
                            ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${userInfo.profileImage}`
                            : undefined
                        }
                      />
                      <AvatarFallback>
                        {`${userInfo?.firstName?.[0] ?? ""}${userInfo?.lastName?.[0] ?? ""}`}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Welcome,</span>
                      <span className="font-semibold">
                        {userInfo.firstName} {userInfo.lastName}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-in">
                      <Button className="w-full">Login</Button>
                    </Link>

                    <Link href="/sign-up">
                      <Button variant="outline" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden h-9 items-center justify-center gap-9 text-[13px] font-medium text-slate-950 md:flex">
          <Link
            href="/"
            className="relative flex h-full items-center text-[#02A9E5] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#02A9E5]"
          >
            Home
          </Link>

          {NAVBAR_CATEGORY_RIBBON.map((item) => (
            <Link
              key={item}
              href="/category"
              className="flex h-full items-center transition-colors hover:text-[#02A9E5]"
            >
              {item}
            </Link>
          ))}
        </nav>
      </header>
    </div>
  );
};

function LogedInUserDetail({ userInfo }: any) {
  return (
    <Link
      href={"/dashboard"}
      className="group flex shrink-0 cursor-pointer items-center gap-1.5"
    >
      <Avatar className="h-7 w-7 border border-slate-200">
        <AvatarImage
          src={
            userInfo?.profileImage
              ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${userInfo.profileImage}`
              : undefined
          }
          alt="profile-image"
          className="object-cover"
        />

        <AvatarFallback className="bg-slate-100 text-xs font-semibold text-slate-700">
          {`${userInfo?.firstName?.[0]?.toUpperCase() ?? ""}${userInfo?.lastName?.[0]?.toUpperCase() ?? ""}`}
        </AvatarFallback>
      </Avatar>

      <div className="hidden flex-col leading-tight lg:flex">
        <span className="text-[11px] font-medium text-slate-500">Welcome</span>

        {userInfo?.firstName ? (
          <span className="text-sm font-semibold text-slate-950 transition-colors group-hover:text-[#02A9E5]">
            {userInfo.firstName}
          </span>
        ) : (
          <Skeleton className="h-4 w-[80px]" />
        )}
      </div>
    </Link>
  );
}
function AuthBtns() {
  return (
    <div className="flex items-center gap-2">
      <Link href={"/sign-up"} className="hidden text-sm font-semibold lg:block">
        <Button
          variant={"ghost"}
          className="hidden h-8 rounded-full px-3 text-[13px] font-semibold text-slate-900 hover:bg-slate-50 md:flex"
        >
          Sign Up
        </Button>
      </Link>

      <Link href={"/sign-in"}>
        <Button
          variant="ghost"
          className="hidden h-8 rounded-full px-2 text-[13px] font-semibold text-slate-950 hover:bg-slate-50 hover:text-[#02A9E5] md:flex"
        >
          Login
        </Button>
      </Link>
    </div>
  );
}

function MapPinSVG() {
  return (
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
  );
}

function UserLocation({ userInfo }: { userInfo: any }) {
  return (
    <div className="group flex shrink-0 cursor-pointer items-center gap-1.5">
      <div className="text-[#96C948]">
        <MapPinSVG />
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-semibold text-slate-950">
          Deliver to
        </span>
        {userInfo?.city ? (
          <Link href={`${"/dashboard/address"}`}>
            <span className="text-[13px] font-bold text-[#02A9E5] transition-colors group-hover:text-sky-600">
              {userInfo?.city}, {userInfo?.state}
            </span>
          </Link>
        ) : (
          <Link
            href={`${userInfo ? "/dashboard/address" : "/sign-in"}`}
            className="text-[13px] font-bold text-[#02A9E5] transition-colors group-hover:text-sky-600"
          >
            Select a location
          </Link>
        )}
      </div>
    </div>
  );
}
