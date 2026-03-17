import { NAVBAR_CATEGORY_RIBBON } from "@/const"
import Link from "next/link"

export const NavbarCategoryRibbon = () => {
    return (
        <nav className="hidden md:flex max-w-7xl mx-auto justify-center items-center gap-10 py-1  text-sm font-medium text-slate-700">
            {NAVBAR_CATEGORY_RIBBON.map((item) => (
                <Link
                    key={item}
                    href="/category"
                    className="hover:text-black transition-colors"
                >
                    {item}
                </Link>
            ))}
        </nav>
    )
}