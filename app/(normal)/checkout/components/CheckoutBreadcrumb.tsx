import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui";
import Link from "next/link";

const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Cart", href: "/cart" },
  { name: "Checkout", href: "/checkout" },
];

export default function CheckoutBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <BreadcrumbItem>
              <Link href={item.href}>{item.name}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}