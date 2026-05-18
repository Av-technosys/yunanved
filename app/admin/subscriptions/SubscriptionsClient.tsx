"use client";

import { useEffect, useState, useTransition } from "react";
import { Mail, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { ProductPagination } from "@/components/pagination";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";
import type { NewsletterSubscription } from "./page";

interface Props {
  data: NewsletterSubscription[];
  total: number;
  currentPage: number;
  pageSize: number;
}

export default function SubscriptionsClient({
  data,
  total,
  currentPage,
  pageSize,
}: Props) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 800);
  const updateQuery = useUpdateQuery();
  const [isPending, startTransition] = useTransition();
  const startIndex = (currentPage - 1) * pageSize;

  useEffect(() => {
    startTransition(() => {
      updateQuery("search", debouncedSearch);
    });
  }, [debouncedSearch, updateQuery]);

  return (
    <div className="w-full">
      <Card className="border-none shadow-none rounded-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-orange-400" />
            Subscribed Users
          </CardTitle>
          <CardDescription>
            Manage newsletter subscription emails here
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex gap-3 mb-6">
            <div className="w-full max-w-xl">
              <InputGroup className="flex items-center bg-white rounded-full py-2 shadow-none">
                <InputGroupAddon>
                  <Search className="text-gray-500" />
                </InputGroupAddon>

                <InputGroupInput
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  type="text"
                  placeholder="Search by email"
                  className="bg-transparent focus:outline-none w-32 focus:w-56 transition-all duration-200"
                />
              </InputGroup>
            </div>
          </div>

          <div className="relative mt-8">
            {isPending && (
              <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-[1px]" />
            )}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed On</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString(
                              "en-IN",
                            )
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No subscribed users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <ProductPagination currentPage={currentPage} totalPages={total} />
        </CardContent>
      </Card>
    </div>
  );
}
