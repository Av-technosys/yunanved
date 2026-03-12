"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, ShoppingBag, MapPin, LogOut } from "lucide-react";
import { logoutHandler } from "@/helper";

const navItems = [
  { label: "Profile", href: "/dashboard", icon: User },
  { label: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { label: "Address", href: "/dashboard/address", icon: MapPin },
];


interface SidebarProps {
  closeSidebar?: () => void
}

export function Sidebar({ closeSidebar }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();


 const logout = async() => {
   await logoutHandler();
  router.push("/sign-in");
    localStorage.removeItem("token");
 }
  const getActive = (pathname: string, href: string) => {
    // Profile → ONLY exact dashboard
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    // Other routes → allow nested pages
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="w-72 h-full">
      <div className="bg-white  shadow-sm border border-gray-100 p-6 flex flex-col h-full min-h-0 overflow-hidden">
        {/* Header Section */}
        <div className="mb-8 px-2">
          <h2 className="text-2xl font-bold text-[#1D4E4E]">My Account</h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage your account details
          </p>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-2 flex-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = getActive(pathname, href);

            return (
              <Link key={href} href={ href} onClick={closeSidebar}>
                <div
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                    active
                      ? "bg-[#FFF9ED] text-[#B8860B] font-semibold shadow-sm"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    size={20}
                    className={active ? "text-[#B8860B]" : "text-gray-400"}
                  />
                  <span className="text-[15px]">{label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Logout Section */}
        <div className="mt-auto">
          <button onClick={logout}  className="flex items-center cursor-pointer gap-3 w-full px-4 py-3.5 rounded-xl text-[#B8860B]  font-semibold hover:bg-[#ffefd5] transition-colors">
            <LogOut size={20} />
            <span className="text-[15px]">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
