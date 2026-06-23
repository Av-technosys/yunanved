/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import signupImg from "@/public/authhero.png";
import googleIcon from "@/public/Icon-Google.png";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui";
import { signup } from "@/helper/index";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupSchema } from "@/validation/signUpSchema";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      number: form.phone.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
    };
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const firstError = result.error.issues[0].message;
      toast.error(firstError, {
        className: "!border !border-red-500 !text-red-500",
      });
      return;
    }

    const userData = {
      first_name: result.data.first_name,
      last_name: result.data.last_name,
      email: result.data.email,
      number: result.data.number,
      password: result.data.password,
    };

    try {
      const response = await signup({
        ...userData,
        user_type: "user",
      });
      router.push(`/email-verification?email=${userData.email}`);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="w-full h-screen max-sm:h-[80vh]  flex ">
        <div className="w-1/2 hidden md:block relative bg-slate-100">
          <Image src={signupImg} alt="signup" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#02A9E5]/15 via-transparent to-white/20" />
        </div>
        <div className="w-full md:w-1/2 bg-[#f1f7e9] flex items-center justify-center px-4">
          <Card className="w-full max-w-lg border-slate-100 bg-white shadow-lg shadow-slate-200/70">
            <div className="w-full max-w-sm   mx-auto">
              <CardHeader>
                <div className="w-full flex flex-col items-center">
                  <Image
                    src="/mainlogo.png"
                    alt="YUNANVED"
                    width={150}
                    height={44}
                    className="h-9 w-auto object-contain"
                  />
                  <h1 className="text-xl font-bold mt-5 text-slate-950">
                    Create an account
                  </h1>
                  <p className="text-slate-500 text-base">
                    Enter your details below
                  </p>
                </div>
              </CardHeader>
              <CardDescription>
                <form
                  id="signUp"
                  onSubmit={submitHandler}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      name="first_name"
                      type="text"
                      placeholder="First Name"
                      className="text-slate-950 border-t-0 border-l-0 border-r-0 border-b border-slate-300 bg-white shadow-none focus-visible:ring-0 rounded-none p-0 placeholder:text-slate-400 focus-visible:border-[#02A9E5]"
                    />

                    <Input
                      name="last_name"
                      type="text"
                      placeholder="Last Name"
                      className="text-slate-950 border-t-0 border-l-0 border-r-0 border-b border-slate-300 bg-white shadow-none focus-visible:ring-0 rounded-none p-0 placeholder:text-slate-400 focus-visible:border-[#02A9E5]"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      className="text-slate-950 border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-slate-300 rounded-none p-0 placeholder:text-slate-400 focus-visible:border-[#02A9E5]"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <Input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      className="text-slate-950 border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-slate-300 rounded-none p-0 placeholder:text-slate-400 focus-visible:border-[#02A9E5]"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="text-slate-950 border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-slate-300 rounded-none p-0 pr-8 placeholder:text-slate-400 focus-visible:border-[#02A9E5]"
                      placeholder="Password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#02A9E5]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="relative ">
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="text-slate-950 border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-slate-300 rounded-none p-0 pr-8 placeholder:text-slate-400 focus-visible:border-[#02A9E5]"
                      placeholder="Confirm Password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#02A9E5]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </form>
              </CardDescription>

              <div className="w-full flex flex-col mt-5 mb-2  gap-3 ">
                <Button
                  type="submit"
                  form="signUp"
                  className="w-full rounded-full bg-[#02A9E5] text-white shadow-none hover:bg-[#0298cf]"
                >
                  Create Account
                </Button>
                {/* <Button
                  variant={"outline"}
                  className="w-full rounded-full border-slate-200 text-slate-900 hover:border-[#02A9E5] hover:bg-sky-50"
                >
                  <Image src={googleIcon} alt="google" width={18} height={18} />
                  <span>Sign up with Google</span>
                </Button> */}
              </div>

              <CardFooter>
                <div className="w-full flex items-center gap-2 justify-center">
                  <span className="text-slate-600">Already have an account ?</span>
                  <Button variant={"link"} className="p-0 text-[#02A9E5] hover:text-[#0298cf]">
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
