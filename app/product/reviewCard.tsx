import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";

export default function ReviewCard({ review }: any) {
  return (
    <Card className="max-w-md rounded-2xl shadow-md">
      <CardContent className="p-6  flex gap-4">
        <div className="relative w-32 h-20  rounded-full overflow-hidden">
          <Image
            src={review.image}
            alt="user image"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col ">
          <h4 className="font-semibold text-gray-900">{review.name}</h4>

          <div className="flex gap-1 text-yellow-400 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {review.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
