/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import signup from "../../public/authpic.png";
import yunanved from "../../public/yunanvedLogo.png";
import googleIcon from "../../public/Icon-Google.png"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/helper/index";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signinSchema } from "@/validation/signInSchema";

const Page = () => {
  const router = useRouter();
  const submitHandler = async (e: any) => {
    e.preventDefault();
   const formData = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  
  const result = signinSchema.safeParse(formData);

  if (!result.success) {
    const firstError = result.error.issues?.[0]?.message || "Invalid data";
     toast.error(firstError, {
        className: "!border !border-red-500 !text-red-500",
      });
    return;
  }

    const response = await login(formData);
    if (response.success) {
      router.push("/");
      toast.success("User login successfully");
    } else {
      toast.error(response.message || "Failed to login user");
    }
  };
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
                  <h1 className="text-xl font-bold mt-4">Login</h1>
                  <p className="text-gray-600 text-base">
                    Enter your details below
                  </p>
                </div>
              </CardHeader>
              <CardDescription>
                <form
                  id="signIn"
                  onSubmit={submitHandler}
                  className="w-full flex flex-col gap-3"
                >
                  <div>
                    <Input
                      name="email"
                      type="email"
                      className="text-black border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-gray-400 rounded-none p-0 "
                      placeholder="Email"
                    />
                  </div>

                  <div>
                    <Input
                      name="password"
                      type="password"
                      className="text-black border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-gray-400 rounded-none p-0 "
                      placeholder="Password"
                    />
                  </div>
                  <p className="text-right">Forgot Password</p>
                </form>
              </CardDescription>

              <div className="w-full flex flex-col mt-5 mb-2  gap-3 ">
                <Button
                  type="submit"
                  form="signIn"
                  className="w-full rounded-full bg-black text-white"
                >
                  Login
                </Button>
                <Button
                  variant={"outline"}
                  className="w-full rounded-full border-black flex items-center justify-center "
                >
                     <Image src={googleIcon} alt="google" width={18} height={18} />
                  <span>Sign in with Google</span>
                </Button>
              </div>

              <CardFooter>
                <div className="w-full flex items-center gap-2 justify-center">
                  <span>Don't have an account ?</span>
                  <Button variant={"link"} className="p-0">
                    <Link href="/sign-up">Sign up</Link>
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
