import React from "react";
import Link from "next/link";
import { NavBarDropdown } from "./dripdownMenu";
import { LogIn, SearchIcon } from "lucide-react";

const NavBarClient = () => {
  return (
    <>
      <div className=" flex gap-3 items-center justify-end">
        <Link
          href="/search"
          className=" flex gap-1 items-center justify-center"
        >
          <SearchIcon size={22} className="" />
          <p className=" hidden sm:block">Search</p>
        </Link>
        {/* <CartSheet /> */}
        <NavbarUserMenu />
      </div>
    </>
  );
};

export default NavBarClient;

async function NavbarUserMenu() {
  // const session = await getServerSession(authOptions);
  // if (session) {
  //   const userData = await getUserByEmail(session?.email);
  //   return (
  //     <div className=" z-50">
  //       <NavBarDropdown userName={userData?.name} />
  //     </div>
  //   );
  // }
  return (
    <Link className=" flex gap-1.5 items-center" href="/auth/login">
      <LogIn size={20} />
      <p className=" hidden lg:block">Login</p>
    </Link>
  );
}
