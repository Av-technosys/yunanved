/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import googleIcon from "@/public/Icon-Google.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signinSchema } from "@/validation/signInSchema";

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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

    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (response?.error) {
      toast.error(
        response.error === "CredentialsSignin"
          ? "Invalid credentials"
          : response.error,
      );
    } else if (response?.ok) {
      router.push("/");
      toast.success("User login successfully");
      router.refresh();
    }
  };
  return (
    <>
      <div className="w-full h-screen max-sm:h-[80vh] flex ">
        <div className="w-1/2 hidden md:block relative bg-slate-100">
          <Image
            src={"/authhero.png"}
            alt="signup"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#02A9E5]/15 via-transparent to-white/20" />
        </div>
        <div className="w-full md:w-1/2 bg-[#f1f7e9] flex items-center justify-center px-4">
          <Card className="w-full max-w-lg border-slate-100 bg-white shadow-lg shadow-slate-200/70">
            <div className="w-full max-w-sm   mx-auto">
              <CardHeader>
                <div className="w-full flex flex-col items-center">
                  <Image
                    src={"/mainlogo.png"}
                    alt="YUNANVED"
                    width={150}
                    height={44}
                    className="h-9 w-auto object-contain"
                  />
                  <h1 className="text-xl font-bold mt-5 text-slate-950">
                    Login
                  </h1>
                  <p className="text-slate-500 text-base">
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
                      className="text-slate-950 border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-slate-300 rounded-none p-0 placeholder:text-slate-400 focus-visible:border-[#02A9E5]"
                      placeholder="Email"
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
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#02A9E5]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="w-full flex items-center justify-end">
                    <Button
                      type="button"
                      variant={"link"}
                      onClick={() => router.push("/reset-password-email")}
                      className="text-[#02A9E5] p-0 cursor-pointer hover:text-[#0298cf]"
                    >
                      Forgot Password ?
                    </Button>
                  </div>
                </form>
              </CardDescription>

              <div className="w-full flex flex-col mt-5 mb-2  gap-3 ">
                <Button
                  type="submit"
                  form="signIn"
                  className="w-full rounded-full bg-[#02A9E5] text-white shadow-none hover:bg-[#0298cf]"
                >
                  Login
                </Button>
                {/* <Button
                  variant={"outline"}
                  className="w-full rounded-full border-slate-200 text-slate-900 flex items-center justify-center hover:border-[#02A9E5] hover:bg-sky-50"
                >
                  <Image src={googleIcon} alt="google" width={18} height={18} />
                  <span>Sign in with Google</span>
                </Button> */}
              </div>

              <CardFooter>
                <div className="w-full flex items-center gap-2 justify-center">
                  <span className="text-slate-600">
                    Don&apos;t have an account ?
                  </span>
                  <Button
                    variant={"link"}
                    className="p-0 text-[#02A9E5] hover:text-[#0298cf]"
                  >
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
