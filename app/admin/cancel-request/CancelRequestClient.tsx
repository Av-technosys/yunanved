/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui";
import { Search, Loader2 } from "lucide-react";
import { Select } from "@/components/select";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";
import CancelRequestTable from "./CancelRequestTable";
import { ProductPagination } from "@/components/pagination";

const CANCEL_STATUS = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "refunded", label: "Refunded" },
];

export default function CancelRequestClient({
  data,
  total,
  currentPage,
  pageSize,
  status,
}: any) {
  const [isPending, startTransition] = useTransition();

  const updateQuery = useUpdateQuery();

  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const debouncedSearch = useDebounce(searchText, 800);

  useEffect(() => {
    startTransition(() => {
      updateQuery("search", debouncedSearch);
    });
  }, [debouncedSearch]);

  useEffect(() => {
    startTransition(() => {
      updateQuery("status", selectedStatus);
    });
  }, [selectedStatus]);

  useEffect(() => {
    setSelectedStatus(status);
  }, [status]);

  return (
    <div className="w-full">
      <Card className="border-none shadow-none rounded-none">

        <CardHeader>
          <CardTitle>Cancel Requests</CardTitle>
        </CardHeader>

        <CardContent>

          {/* Filters */}
          <div className="flex gap-3 mb-4">

            <div className="w-full max-w-xl">
              <InputGroup className="flex items-center bg-white rounded-full py-2">

                <InputGroupAddon>
                  <Search className="text-gray-500" />
                </InputGroupAddon>

                <InputGroupInput
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search by Order ID"
                />

              </InputGroup>
            </div>

            <Select
              placeholder="Status"
              label="Status"
              selectItems={CANCEL_STATUS}
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            />

          </div>

          {/* Table */}
          <div className="relative">

            {isPending && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 z-10">
                <Loader2 className="animate-spin w-6 h-6" />
              </div>
            )}

            <CancelRequestTable data={data} />

          </div>

          {/* Pagination */}
          <ProductPagination
            currentPage={currentPage}
            totalPages={total}
          />

        </CardContent>
      </Card>
    </div>
  );
}