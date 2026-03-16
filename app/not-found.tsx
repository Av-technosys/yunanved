"use client";
import { Footer, Navbar } from "@/components/landing";
import { useClientSideUser } from "@/hooks/getClientSideUser";

import pageImage from "../public/404.png";

import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

const NotFound = () => {
  const { userDetails, loading } = useClientSideUser();
  return (
    <>
      <Navbar userInfo={userDetails} loading={loading} />
      <div className="min-h-[90vh] sm:min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        
        <Image src={pageImage} alt="404" width={500} height={500} />

        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mt-4">
          Oops! We lost that page.
        </h2>

        
        <p className="text-slate-500 mt-3 max-w-md text-sm sm:text-base">
          The product or page you're looking for might have been moved, deleted,
          or never existed in the first place.
        </p>

       
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-[#D7B36A] text-white font-medium px-6 py-3 rounded-xl transition"
        >
          <Home/> Back to Home
        </Link>
      </div>
      
      <Footer />
    </>
  );
};

export default NotFound;
