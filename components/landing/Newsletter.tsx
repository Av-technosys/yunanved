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
    <section className="relative max-w-7xl mt-8 mx-auto w-full h-[300px] flex items-center justify-center overflow-hidden rounded-2xl">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/newslatterBg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-6 text-center text-white mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Stay Updated
        </h2>

        <p className="text-sm md:text-base mb-8 text-gray-200">
          Subscribe to get exclusive offers, style tips, and early access to new collections.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg mx-auto"
        >
          <Input
            name="email"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            disabled={isPending || isSubscribed}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 bg-white text-black rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-6"
            required
          />

          <Button
            type="submit"
            disabled={isPending || isSubscribed}
            className="bg-[#414141] hover:bg-black text-white rounded-full px-12 py-6 text-lg font-medium"
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
