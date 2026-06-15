"use client";

import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { subscribeToNewsletter } from "@/helper";
import { Check } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

export function Newsletter() {
  const [isPending, startTransition] = useTransition();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const response = await subscribeToNewsletter(email);

      if (response.success) {
        setIsSubscribed(Boolean(response.subscribed));
        toast.success(response.message);
        return;
      }

      toast.error(response.message);
    });
  };

  return (
    <section className="relative max-w-7xl mt-10 mx-auto w-[calc(100%-1.5rem)] h-[290px] sm:h-[240px] md:h-[245px] flex items-center justify-center overflow-hidden rounded-xl">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/newslatterBg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-4 text-center text-white mx-auto sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          Stay Updated
        </h2>

        <p className="text-xs md:text-sm mb-6 text-gray-100 leading-snug max-w-xl mx-auto sm:mb-7">
          Subscribe to get exclusive offers, style tips, and early access to new
          collections.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex h-14 w-full max-w-lg mx-auto items-stretch overflow-hidden rounded-full bg-white"
        >
          <Input
            name="email"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            disabled={isPending || isSubscribed}
            onChange={(event) => setEmail(event.target.value)}
            className="h-full min-w-0 flex-1 rounded-none border-none bg-transparent px-5 text-sm text-slate-900 shadow-none placeholder:text-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0 sm:px-6"
            required
          />

          <Button
            type="submit"
            disabled={isPending || isSubscribed}
            className="h-full w-28 shrink-0 rounded-full rounded-l-none bg-[#02A9E5] px-0 text-base font-bold text-white shadow-none hover:bg-[#0298cf] sm:w-32"
          >
            {isSubscribed ? (
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4" />
                Done
              </span>
            ) : isPending ? (
              "Sending"
            ) : (
              "Send"
            )}
          </Button>
        </form>

        {isSubscribed && (
          <p className="mt-3 text-sm font-medium text-white">
            You are subscribed.
          </p>
        )}
      </div>
    </section>
  );
}
