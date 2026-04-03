"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";

import Image from "next/image";
import { useState } from "react";
import StarRatings from "react-star-ratings";

export default function ReviewCard({ review }: any) {
  const [openImagePreview, setOpenImagePreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setOpenImagePreview(true);
  };

  return (
    <>
      {openImagePreview && selectedImage && (
        <Dialog open={openImagePreview} onOpenChange={setOpenImagePreview}>
          <form>
            <DialogContent className="sm:max-w-sm">
              <DialogDescription className="relative w-full h-80">
                <Image
                  src={`${NEXT_PUBLIC_S3_BASE_URL}/${selectedImage}`}
                  alt="Selected Image"
                  fill
                  className="object-contain"
                />
              </DialogDescription>
            </DialogContent>
          </form>
        </Dialog>
      )}

      <Card className="max-w-md rounded-2xl bg-white shadow-md border border-gray-200">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
          <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
            <Image
              src={`${NEXT_PUBLIC_S3_BASE_URL}/${review.image}`}
              alt="user image"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {review.name}
            </CardTitle>

            <CardDescription>
              <StarRatings
                rating={review.rating}
                numberOfStars={5}
                starDimension="18px"
                starSpacing="2px"
                starRatedColor="#facc15"
                name="rating"
              />
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="relative h-28">
            <p className="text-gray-700 h-full overflow-y-auto hide-scrollbar text-sm leading-relaxed pr-2">
              {review.message}
            </p>

            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent" />
          </div>

          <div className="w-full grid grid-cols-4 gap-3">
            {review.media.length > 0 &&
              review?.media?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleImageClick(item.mediaURL)}
                    className="relative cursor-pointer mt-3 w-16 h-16 rounded-sm overflow-hidden"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${item.mediaURL}`}
                      alt="user image"
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-black">
            Created At :
            {new Date(review.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
