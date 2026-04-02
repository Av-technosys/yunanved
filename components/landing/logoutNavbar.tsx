"use client";

import { logoutHandler } from "@/helper";
import { useCartStore } from "@/store/cartStore";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutNavbar = () => {
  const router = useRouter();
    const clearCart = useCartStore((s) => s.clearCart);

  const logout = async() => {
    await logoutHandler();
    toast.success("Logout successfully");
    clearCart();
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
