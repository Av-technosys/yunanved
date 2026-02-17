"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Home } from "lucide-react";

const routeNameMap: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  settings: "Settings",
  products: "Products",
  orders: "Orders",
};

export default function AppBreadcrumbs() {
  const pathname = usePathname();

  const pathnames = pathname.split("/").filter(Boolean);

  if (pathnames.length < 1) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList className="max-w-6xl mt-2 mx-auto">
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <Home size={18} />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.map((segment, index) => {
          const isLast = index === pathnames.length - 1;
          const href = "/" + pathnames.slice(0, index + 1).join("/");

          const label =
            routeNameMap[segment] ??
            decodeURIComponent(segment).replace(/-/g, " ");

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize hover:underline">
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
