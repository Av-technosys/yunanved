/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Input, Label, Separator } from "@/components/ui";
import Link from "next/link";
import { CircleUserRound, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui";
import { NAVBAR_CATEGORY_RIBBON } from "@/const";
import { SearchWithIcon } from "./navbar/SearchBar";
import { CartIcon } from "./navbar/Cart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { logoutHandler } from "@/helper";
import { toast } from "sonner";
import LogoutNavbar from "./logoutNavbar";

export const Navbar = ({ userInfo, loading }: any) => {

  console.log("user info", userInfo);
 
  return (
    <header className="w-full sticky top-0 z-50 bg-white py-2 ">
      <div
        className={
          "max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-12"
        }
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu style={{width:22 , height : 22}} />
            </Button>
          </SheetTrigger>

          {/* Logo */}
          <Link href={"/"} className="shrink-0">
            <h1 className="text-2xl font-black tracking-tighter text-primary">
              YUNANVED
            </h1>
          </Link>

          <div className=" hidden md:flex w-full justify-between gap-4">
            <UserLocation userInfo={userInfo} loading={loading} />
            {/* Search Bar Container */}
            <SearchWithIcon />

            {/* Actions (Sign Up, Login, Cart) */}
            <div className="flex items-center gap-3">
              {loading ? (
                <Skeleton className="h-9 w-30" />
              ) : userInfo ? (
                <LogedInUserDetail userInfo={userInfo} />
              ) : (
                <AuthBtns />
              )}

              {/* Cart Icon with Badge */}
            </div>
          </div>
          <div className="flex  items-center">
            <CartIcon  />

            <Popover>
              <PopoverTrigger className=" block sm:hidden" asChild>
                <Button className="flex items-center justify-center" variant="ghost">
                  <CircleUserRound style={{width:22 , height : 22}} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 mr-2  flex flex-col gap-1">
                {userInfo ? (
                  <>
                    <LogedInUserDetail userInfo={userInfo} />
                    <div className=" sm:hidden  mt-3 flex flex-col items-start gap-2">
                      <Separator />
                     <LogoutNavbar/>
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
            className="w-72 px-4 py-6 pt-12"
          >
            {/* Search */}
            <div className="pb-2">
              <SearchWithIcon />
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-3 border-t pt-4">
              {NAVBAR_CATEGORY_RIBBON.map((item) => (
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
            <div className="border-t pt-4 flex flex-col gap-3">
              {loading ? (
                <Skeleton className="h-10 w-full" />
              ) : userInfo ? (
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
                    <span className="font-semibold">{userInfo.firstName} {userInfo.lastName}</span>
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
    </header>
  );
};

function LogedInUserDetail({ userInfo }: any) {
  return (
    <Link
      href={"/dashboard"}
      className="flex shrink-0 items-center gap-2 cursor-pointer group"
    >
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

      <div className="flex flex-col leading-tight">
        <span className="text-[13px] text-gray-500">Welcome ,</span>

        {userInfo?.firstName ? (
          <span className="text-md font-semibold text-gray-800 group-hover:text-gray-600 transition-colors">
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
    <>
      <Link
        href={"/sign-up"}
        className="hidden sm:block text-sm font-semibold "
      >
        <Button variant={"ghost"} className=" rounded-full px-8 hidden md:flex">
          Sign Up
        </Button>
      </Link>

      <Link href={"/sign-in"}>
        <Button className=" rounded-full px-8 hidden md:flex">Login</Button>
      </Link>
    </>
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

function UserLocation({
  userInfo,
  loading,
}: {
  userInfo: any;
  loading: boolean;
}) {
  return (
    <div className="flex items-center gap-2 shrink-0 cursor-pointer group">
      <MapPinSVG />

      <div className="flex flex-col leading-tight">
        <span className="text-[10px] text-gray-500 font-medium">
          Deliver to
        </span>
        {loading ? (
          <Skeleton className="h-4 w-[120px]" />
        ) : userInfo.city ? (
          <span className="text-sm font-bold group-hover:text-slate-600 transition-colors">
            {userInfo.city}, {userInfo.state}
          </span>
        ) : (
          <Link
            href={`${userInfo ? "/dashboard/address" : "/sign-in"}`}
            className="text-sm font-bold group-hover:text-slate-600 transition-colors"
          >
            Select a location
          </Link>
        )}
      </div>
    </div>
  );
}
