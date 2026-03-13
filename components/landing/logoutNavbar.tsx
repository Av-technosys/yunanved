"use client";

import { logoutHandler } from "@/helper";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutNavbar = () => {
  const router = useRouter();
  const logout = async() => {
    await logoutHandler();
    toast.success("Logout successfully");
    router.push("/sign-in");

  };
  return (
    <>
      <button
        type="button"
        onClick={() => logout()}
        className="text-red-500 flex gap-2 items-center"
      >
        <LogOut  /> Logout
      </button>
    </>
  );
};

export default LogoutNavbar;
