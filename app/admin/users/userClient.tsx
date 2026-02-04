"use client";

import { Select } from "@/components/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import ProductPagination from "@/components/pagination";
import UserTable from "./UserTable";
import BadgeIcon from "@/components/BadgeIcon";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useUpdateQuery } from "@/components/filter";
import { useDebounce } from "@/components/debouceSearch";

interface Props {
  users: any[];
  total: number;
  currentPage: number;
}

const UserClient = ({ users, total, currentPage }: Props) => {
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
          <CardTitle>Users Management</CardTitle>
          <CardDescription>Manage your users here</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm">Active user</div>
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
                  placeholder="Search By User Name"
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

          <UserTable page={currentPage} users={users} />
          <ProductPagination currentPage={currentPage} totalPages={total} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserClient;
