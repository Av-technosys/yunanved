"use client";

import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import ProductPagination from "@/components/pagination";
import OrderTable from "./OrderTable";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";

interface Props {
  order: any[];
  total: number;
  currentPage: number;
}

const OrderClient = ({ order, total, currentPage }: Props) => {
  const updateQuery = useUpdateQuery();

  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useDebounce(searchText, 800);

  useEffect(() => {
    updateQuery("search", debouncedSearch);
  }, [debouncedSearch]);

  const ORDER_STATUS = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "failed", label: "Failed" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
  ];

  const [selectedOrderStatus, setSelectedOrderStatus] = useState<
    string | undefined
  >();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <div className="w-full p-2">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>Manage your orders here</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-end">
            <Button>
              <Plus />
              Add Category
            </Button>
          </div>

          <div className="flex gap-3">
            <div className="w-full max-w-xl">
              <InputGroup className="flex items-center  bg-white rounded-full   py-2 shadow-none">
                <InputGroupAddon>
                  <Search className="text-gray-500" />
                </InputGroupAddon>

                <InputGroupInput
                  onChange={handleInputChange}
                  value={searchText}
                  type="text"
                  placeholder="Search By Order Id"
                  className="bg-transparent  focus:outline-none w-32 focus:w-56 transition-all duration-200"
                />
              </InputGroup>
            </div>

            <Select
              placeholder="Order Status"
              label="Order Status"
              selectItems={ORDER_STATUS}
              value={selectedOrderStatus}
              onValueChange={setSelectedOrderStatus}
            />
          </div>

          {/* URL-driven pagination */}
          <OrderTable page={currentPage} orders={order} />
          <ProductPagination currentPage={currentPage} totalPages={total} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderClient;
