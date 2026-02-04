"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProductPagination from "@/components/pagination";
import BadgeIcon from "@/components/BadgeIcon";
import ReviewTable from "./ReviewTable";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useEffect, useState } from "react";
import { useUpdateQuery } from "@/components/filter";
import { useDebounce } from "@/components/debouceSearch";

interface Props {
  reviews: any[];
  total: number;
  currentPage: number;
}

const ReviewClient = ({ reviews, total, currentPage }: Props) => {
  const updateQuery = useUpdateQuery();

  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useDebounce(searchText, 800);

  useEffect(() => {
    updateQuery("search", debouncedSearch);
  }, [debouncedSearch]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }
  return (
    <div className="w-full p-2">
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
              <InputGroup className="flex items-center  bg-white rounded-full   py-2 shadow-none">
                <InputGroupAddon>
                  <Search className="text-gray-500" />
                </InputGroupAddon>

                <InputGroupInput
                  onChange={handleInputChange}
                  value={searchText}
                  type="text"
                  placeholder="Search By Customer Name"
                  className="bg-transparent  focus:outline-none w-32 focus:w-56 transition-all duration-200"
                />
              </InputGroup>
            </div>
          </div>

          {/* URL-driven pagination */}
          <ReviewTable page={currentPage} reviews={reviews} />
          <ProductPagination currentPage={currentPage} totalPages={total} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewClient;
