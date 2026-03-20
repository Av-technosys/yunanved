/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";

export function ReturnImagePreviewModal({ images, item }: any) {
  const [index, setIndex] = useState(0);
  const S3_BASE = NEXT_PUBLIC_S3_BASE_URL;

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          View Images
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">

        {/* 🔥 Product Info */}
        <div className="mb-4">
          <p className="font-semibold">{item.productName}</p>
          <p className="text-sm text-gray-500">
            ₹{item.productPrice}
          </p>
        </div>

        {/* 🖼 Image Slider */}
        <div className="relative flex items-center justify-center">

          <img
            src={`${S3_BASE}/${images[index].imageUrl}`}
            className="w-full h-[350px] object-contain rounded-xl"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 bg-white shadow p-2 rounded-full"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={next}
                className="absolute right-2 bg-white shadow p-2 rounded-full"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* 🔢 Indicator */}
        <p className="text-center text-xs text-gray-400 mt-2">
          {index + 1} / {images.length}
        </p>

      </DialogContent>
    </Dialog>
  );
}