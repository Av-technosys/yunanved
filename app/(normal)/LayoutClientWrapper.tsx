/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname } from "next/navigation";
import { Footer, Navbar } from "@/components/landing";
import { Suspense } from "react";

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
      <Suspense fallback={null}>
        <Navbar userInfo={userDetails} />
      </Suspense>
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}