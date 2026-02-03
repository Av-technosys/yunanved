"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"
import { useSearchParams } from "next/navigation"
import ProductPagination from "@/components/pagination"
import BadgeIcon from "@/components/BadgeIcon"
import ReviewTable from "./ReviewTable"

const Page = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") ?? 1)

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Review Management</CardTitle>
          <CardDescription>
            Monitor and moderate customer feedback accross all products. Approve
            valid reviews to publish them to the website
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm">Pending Review</div>
                      <div className="text-2xl font-bold">1234</div>
                    </div>
                    <BadgeIcon color="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                      <User size={20} />
                    </BadgeIcon>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <div className="w-full max-w-xl">
              <Input placeholder="Search user name" />
            </div>
          </div>

          {/* URL-driven pagination */}
          <ReviewTable page={page} />
          <ProductPagination currentPage={page} totalPages={10} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
