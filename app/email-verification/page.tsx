"use client";

import { Suspense } from "react";
import EmailVerificationContent from "./emailVerificationContent";


export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <EmailVerificationContent />
    </Suspense>
  );
}