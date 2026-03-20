/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname } from "next/navigation";
import { Footer, Navbar } from "@/components/landing";

export default function LayoutClientWrapper({
  children,
  userDetails,
}: {
  children: React.ReactNode;
  userDetails: any;
}) {
  const pathname = usePathname();

  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  return (
    <>
      <Navbar userInfo={userDetails} />
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}