// components/admin/mobile-sidebar.tsx
"use client";

import { Menu } from "lucide-react";
import { Sidebar } from "@/components/admin";
import { Button } from "@/components/ui";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logoutHandler } from "@/helper/auth/action";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export function MobileSidebar() {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);

  const logout = async () => {
    await logoutHandler();
    clearCart();
    router.push("/sign-in");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 md:w-[40vw] w-[70vw]">
        <Sidebar mobile logout={logout} />
      </SheetContent>
    </Sheet>
  );
}
