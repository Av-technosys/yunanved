/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import signupImg from "@/public/authpic.png";
import yunanved from "@/public/yunanvedLogo.png";
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

    const { confirmPassword, ...userData } = result.data;

    try {
      const response = await signup({
        ...userData,
        user_type: "user",
      });
      router.push(`/email-verification?email=${userData.email}`);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.success(response.message);
      }
    } catch(error:any){
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="w-full h-screen max-sm:h-[80vh]  flex ">
        <div className="w-1/2 hidden md:block relative border border-black">
          <Image src={signupImg} alt="signup" fill className="object-cover" />
        </div>
        <div className="w-full md:w-1/2 bg-[#FFF6E3] flex items-center justify-center">
          <Card className="w-full max-w-lg mx-4">
            <div className="w-full max-w-sm   mx-auto">
              <CardHeader>
                <div className="w-full flex flex-col items-center">
                  <Image src={yunanved} alt="yunanved" width={70} height={70} />
                  <h1 className="text-xl font-bold mt-4">Create an account</h1>
                  <p className="text-gray-600 text-base">
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
                      className="text-black border-t-0 border-l-0 border-r-0 border-b border-gray-400 bg-white shadow-none focus-visible:ring-0 rounded-none p-0"
                    />

                    <Input
                      name="last_name"
                      type="text"
                      placeholder="Last Name"
                      className="text-black border-t-0 border-l-0 border-r-0 border-b border-gray-400 bg-white shadow-none focus-visible:ring-0 rounded-none p-0"
                    />
                  </div>
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
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      className="text-black border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-gray-400 rounded-none p-0 "
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="text-black border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-gray-400 rounded-none p-0 pr-8"
                      placeholder="Password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="relative ">
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="text-black border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-gray-400 rounded-none p-0 pr-8"
                      placeholder="Confirm Password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
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
                  className="w-full rounded-full bg-[#0F2A2E] text-white"
                >
                  Create Account
                </Button>
                <Button
                  variant={"outline"}
                  className="w-full rounded-full border-black "
                >
                  <Image src={googleIcon} alt="google" width={18} height={18} />
                  <span>Sign up with Google</span>
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
