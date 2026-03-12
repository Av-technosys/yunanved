"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useRouter } from "next/navigation";

const DashboardDropdown = () => {
  const router = useRouter();
  return (
    <>
      <Select onValueChange={(value) => router.push(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Profile" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="/dashboard">Profile</SelectItem>
            <SelectItem value="/dashboard/orders">My Orders</SelectItem>
            <SelectItem value="/dashboard/address">Address</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default DashboardDropdown;
