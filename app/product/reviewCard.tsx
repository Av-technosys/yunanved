/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";

import Image from "next/image";
import StarRatings from "react-star-ratings";

export default function ReviewCard({ review }: any) {
  return (
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
        <div className="relative h-20">
          <p className="text-gray-700 h-full overflow-y-auto hide-scrollbar text-sm leading-relaxed pr-2">
            {review.message}
          </p>

          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="grid grid-cols-3 h-28 overflow-y-auto hide-scrollbar gap-2">
          {review.media.length > 0 &&
            review?.media?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="relative mt-3 w-24 h-24 rounded-sm overflow-hidden"
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
  );
}
