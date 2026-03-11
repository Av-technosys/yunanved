/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui";
import { NAVBAR_CATEGORY_RIBBON } from "@/const";
import SearchWithIcon from "./navbar/SearchBar";
import CartIcon from "./navbar/Cart";

const Navbar = ({userInfo, loading}:any) => {

  return (
    <header className="w-full  bg-white py-3 px-2 md:px-4 lg:px-12">
      <div
        className={
          "max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-12"
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
          <CartIcon />
          <SheetContent side="left" className="w-72 px-4 py-6 pt-12">



            {/* Search */}
            <SearchWithIcon />
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
            <div className=" pt-4 flex flex-col gap-3">

              <Link href="/sign-in">
                <Button className="w-full">
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
        <span className="text-[13px] text-gray-500">
          Welcome ,
        </span>

        {userInfo?.firstName ? (
          <span className="text-md font-semibold text-gray-800 group-hover:text-gray-600 transition-colors">
            {userInfo.firstName}
          </span>
        ) : (
          <Skeleton className="h-4 w-[80px]" />
        )}
      </div>
    </Link>
  )
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
        <Button className=" rounded-full px-8 hidden md:flex">
          Login
        </Button>
      </Link>
    </>
  )
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
  )
}

function UserLocation({ userInfo , loading }: { userInfo: any  , loading:boolean }) {
  return (
    <div className="flex items-center gap-2 shrink-0 cursor-pointer group">
      <MapPinSVG />

      <div className="flex flex-col leading-tight">
        <span className="text-[10px] text-gray-500 font-medium">
          Deliver to
        </span>
  {loading ? (
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
  );
}
