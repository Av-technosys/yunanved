/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import ProductPagination from "@/components/pagination";
import PaymentTable from "./PaymentTable";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";

interface Props {
  payment: any[];
  total: number; 
  currentPage: number;
  pageSize: number;
  status?: string;
}

const PaymentClient = ({
  payment,
  total,
  currentPage,
  pageSize,
  status,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const updateQuery = useUpdateQuery();

  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    status
  );

  const debouncedSearch = useDebounce(searchText, 600);


useEffect(() => {
  startTransition(() => {
    updateQuery("search", debouncedSearch);
  });
}, [debouncedSearch]);

  useEffect(() => {
    startTransition(() => {
      updateQuery("status", selectedStatus || undefined);
      updateQuery("page", "1");
    });
  }, [selectedStatus]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <div className="w-full p-1">
      <Card>
        <CardHeader>
          <CardTitle>Payment Management</CardTitle>
          <CardDescription>Manage and track all payments</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex gap-3 mb-4">
            <div className="w-full max-w-xl">
              <InputGroup className="flex items-center bg-white rounded-full py-2 shadow-none">
                <InputGroupAddon>
                  <Search className="text-gray-500" />
                </InputGroupAddon>

                <InputGroupInput
                  onChange={handleInputChange}
                  value={searchText}
                  type="text"
                  placeholder="Search by Order ID"
                  className="bg-transparent focus:outline-none w-40 focus:w-64 transition-all duration-200"
                />
              </InputGroup>
            </div>
          </div>

          <div className="relative">
            {isPending && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                <Loader2 className="animate-spin w-6 h-6 text-primary" />
              </div>
            )}

            <PaymentTable
              page={currentPage}
              payments={payment}
              pageSize={pageSize}
            />
          </div>

          <ProductPagination
            currentPage={currentPage}
            totalPages={total}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentClient;