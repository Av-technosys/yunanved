/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { toast } from "sonner";
import { confirmSignup, resendOtp } from "@/helper/index";
import { canResendOTPInterval } from "@/const/globalconst";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(canResendOTPInterval);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleConfirm = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!email) {
      toast.error("Email missing");
      return;
    }

    try {
      await confirmSignup({ email, code: otp });
      toast.success("Email verified successfully");
      router.push("/sign-in");
    } catch (err: any) {
      toast.error(err.message || "Verification failed");
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      await resendOtp(email);
      toast.success("OTP resent successfully");

      // reset timer
      setTimer(10);
      setCanResend(false);

    } catch (err: any) {
      toast.error(err.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 hidden md:block relative border border-black">
        <Image src={signup} alt="signup" fill className="object-cover" />
      </div>

      <div className="w-full md:w-1/2 bg-[#FFF6E3] flex items-center justify-center">
        <Card className="w-full max-w-lg mx-auto">
          <div className="w-full max-w-sm mx-auto">
            <CardHeader>
              <div className="w-full flex flex-col items-center">
                <Image src={yunanved} alt="logo" width={70} height={70} />
                <h1 className="text-xl font-bold mt-4">
                  Email Verification
                </h1>
                <p className="text-gray-600 text-base">
                  OTP sent to {email}
                </p>
              </div>
            </CardHeader>

            <CardDescription>
              <div className="max-w-sm mt-3 flex flex-col items-center gap-2">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
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

                <Button
                  variant="ghost"
                  className="p-0"
                  disabled={!canResend}
                  onClick={handleResend}
                >
                  {canResend ? "Resend OTP" : `Resend in ${timer}s`}
                </Button>
              </div>
            </CardDescription>

            <div className="w-full flex flex-col mt-5 gap-3">
              <Button
                onClick={handleConfirm}
                className="w-full rounded-full bg-black text-white"
              >
                Confirm
              </Button>
            </div>

            <CardFooter>
              <div className="w-full flex items-center gap-2 justify-center">
                <span>Already have an account?</span>
                <Button variant="link" className="p-0">
                  <Link href="/sign-in">Log in</Link>
                </Button>
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;