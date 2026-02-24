import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import StarRatings from "react-star-ratings";

export default function ReviewCard({ review }: any) {
  console.log("review", review);
  return (
    <Card className="max-w-md rounded-2xl bg-white shadow-md border border-gray-200">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${review.image}`}
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
        <p className="text-gray-700 text-sm leading-relaxed">
          {review.message}
        </p>
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
