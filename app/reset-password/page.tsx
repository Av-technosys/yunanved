/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import signup from "../../public/authpic.png";
import yunanved from "../../public/yunanvedLogo.png";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="w-full h-screen flex ">
        <div className="w-1/2 hidden md:block relative border border-black">
          <Image src={signup} alt="signup" fill className="object-cover" />
        </div>
        <div className="w-full md:w-1/2 bg-[#FFF6E3] flex items-center justify-center">
          <Card className="w-full max-w-lg mx-auto">
            <div className="w-full max-w-sm   mx-auto">
              <CardHeader>
                <div className="w-full flex flex-col items-center">
                  <Image src={yunanved} alt="yunanved" width={70} height={70} />
                  <h1 className="text-xl font-bold mt-4">Reset Password</h1>
                  <p className="text-gray-600 text-base">Enter new password below</p>
                </div>
              </CardHeader>
              <CardDescription>
                <form
                  id="reset-password-email"
                  className="w-full flex flex-col gap-3"
                >
                  <div>
                    <Input
                      name="passoword"
                      type="password"
                      className="text-black border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-gray-400 rounded-none p-0 "
                      placeholder="New Passoword"
                    />
                  </div>
                  <div>
                    <Input
                      name="confirm-password"
                      type="password"
                      className="text-black border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-gray-400 rounded-none p-0 "
                      placeholder="Confirm Passoword"
                    />
                  </div>
                </form>
              </CardDescription>

              <div className="w-full flex flex-col mt-5 mb-2  gap-3 ">
                <Button
                  type="submit"
                  form="reset-password-email"
                  className="w-full rounded-full bg-black text-white"
                >
                  Confirm
                </Button>
              </div>

              <CardFooter>
                <div className="w-full flex items-center gap-2 justify-center">
                  <span>Already have an account ?</span>
                  <Button variant={"link"} className="p-0">
                    <Link href="/sign-in">Log in</Link>
                  </Button>
                </div>
              </CardFooter>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
