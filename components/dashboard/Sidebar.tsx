"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, ShoppingBag, MapPin, LogOut } from "lucide-react";
import { logoutHandler } from "@/helper";
import { useCartStore } from "@/store/cartStore";

const navItems = [
  { label: "Profile", href: "/dashboard", icon: User },
  { label: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { label: "Address", href: "/dashboard/address", icon: MapPin },
];

interface SidebarProps {
  closeSidebar?: () => void;
}

export function Sidebar({ closeSidebar }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);

  const logout = async () => {
    await logoutHandler();
    router.push("/sign-in");
    clearCart();
  };
  const getActive = (pathname: string, href: string) => {
    // Profile → ONLY exact dashboard
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    // Other routes → allow nested pages
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="w-72 h-h-[86vh]">
      <div className="bg-white shadow-md border border-gray-100 p-6 flex flex-col h-full min-h-0 overflow-hidden">
        {/* Header Section */}
        <div className="mb-8 px-2">
          <h2 className="text-2xl font-bold text-black">My Account</h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage your account details
          </p>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-2 flex-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = getActive(pathname, href);

            return (
              <Link key={href} href={href} onClick={closeSidebar}>
                <div
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                    active
                      ? "bg-[#f5ffe6] text-[#96C948] font-semibold shadow-md"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    size={20}
                    className={active ? "text-[#96C948]" : "text-gray-400"}
                  />
                  <span className="text-[15px]">{label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Logout Section */}
        <div className="pt-4 border-t">
          <button
            onClick={logout}
            className="flex items-center cursor-pointer gap-3 w-full px-4 py-3.5 rounded-xl text-[#ff0606]  font-semibold bg-[#ffe4e4] transition-colors"
          >
            <LogOut size={20} />
            <span className="text-[15px]">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
