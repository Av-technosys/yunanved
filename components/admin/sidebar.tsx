"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Box,
  List,
  FileText,
  User,
  MessageSquare,
  Settings,
  Code,
  Feather,
  ShoppingCart,
  IndianRupee,
  LogOut,
} from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "../ui/button";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutGrid },
  { label: "Product", href: "/admin/product", icon: Box },
  { label: "Category", href: "/admin/category", icon: List },
  { label: "Order", href: "/admin/order", icon: FileText },
  { label: "User", href: "/admin/users", icon: User },
  { label: "Review", href: "/admin/review", icon: MessageSquare },
  { label: "Payment", href: "/admin/payment", icon: IndianRupee },
  {
    label: "Featured Products",
    href: "/admin/featured-products",
    icon: ShoppingCart,
  },
  {
    label: "Featured Categories",
    href: "/admin/featured-categories",
    icon: Feather,
  },
  { label: "Coupon", href: "/admin/coupon", icon: Code },
  // { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar({ mobile = false, logout }: { mobile?: boolean,   logout?: () => void}) {
  const pathname = usePathname();

  // remove trailing slash
  const currentPath = pathname.replace(/\/$/, "");

  return (
<aside className="w-full h-screen bg-white border-r p-6 font-sans flex flex-col">
        {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        <p className="text-sm text-gray-500">Manage your account details</p>
      </div>

      {/* Navigation */}
<nav className="space-y-3 hide-scrollbar overflow-y-auto flex-1">
  
  
          {navItems.map(({ label, href, icon: Icon }) => {
          let active = false;

          if (href === "/admin") {
            active = currentPath === "/admin";
          } else {
            active =
              currentPath === href || currentPath.startsWith(`${href}/`);
          }

          const item = (
            <SidebarItem
              icon={<Icon size={24} className="text-orange-400" />}
              label={label}
              active={active}
            />
          );

          // Mobile sidebar → close sheet on click
          if (mobile) {
            return (
              <SheetClose asChild key={href}>
                <Link href={href}>{item}</Link>
              </SheetClose>
            );
          }

          // Desktop sidebar
          return (
            <Link key={href} href={href}>
              {item}
            </Link>
          );
        })}
      </nav>
      {/* Logout Button */}
    <div className="mt-auto px-4">
          <button onClick={logout}  className="flex items-center cursor-pointer gap-3 w-full px-4 py-3.5 rounded-xl text-[#B8860B]  font-semibold hover:bg-[#ffefd5] transition-colors">
            <LogOut size={24} />
            <span className="md:text-[15px] text-[20px]">Logout</span>
          </button>
        </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
      ${
        active
          ? "bg-[#FFF9EE] text-gray-800 font-semibold border-l-4 border-[#D4A056]"
          : "hover:bg-gray-50 text-gray-500"
      }`}
    >
      <span className={active ? "opacity-100" : "opacity-70"}>{icon}</span>
      <span className="text-base">{label}</span>
    </div>
  );
}