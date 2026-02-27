"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import signup from "../../public/authpic.png";
import yunanved from "../../public/yunanvedLogo.png";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetPasswordUsingOTP } from "@/helper";

const ResetPassword = ({ email }: any) => {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const formData = {
      email: email,
      code: otp,
      newPassword: e.target.newPassword.value,
    };

    const response = await resetPasswordUsingOTP(formData);

    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success(response.message);
    router.push(`/sign-in`);
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
                  <h1 className="text-xl font-bold mt-4">Reset Password</h1>
                  <p className="text-gray-600 text-xs line-clamp-1">
                    OTP sent to your mail id {email}
                  </p>
                </div>
              </CardHeader>
              <CardDescription>
                <form
                  onSubmit={(e) => submitHandler(e)}
                  id="email-verification"
                  className="w-full flex flex-col gap-3"
                >
                  <div className="mt-3">
                    <div className="w-full  flex flex-col  gap-2">
                      <InputOTP
                        value={otp}
                        onChange={(value) => setOtp(value)}
                        maxLength={6}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      <Separator />
                    </div>

                    <div>
                      <Input
                        name="newPassword"
                        type="password"
                        className="text-black border-t-0 border-l-0 focus-visible:ring-0 border-r-0 bg-white shadow-none border-b-[1px] border-gray-400 rounded-none p-0 "
                        placeholder="New Passoword"
                      />
                    </div>
                    <div className="w-full flex items-center justify-end">
                      <Button
                        className="p-0 shadow-none hover:bg-transparent cursor-pointer"
                        variant={"ghost"}
                      >
                        Resend OTP
                      </Button>
                    </div>
                  </div>
                </form>
              </CardDescription>

              <div className="w-full flex flex-col mt-5 mb-2  gap-3 ">
                <Button
                  type="submit"
                  form="email-verification"
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

export default ResetPassword;
