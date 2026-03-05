import Link from "next/link"

export const NavbarCategoryRibbon = () => {
    return (
        <nav className="hidden md:flex justify-center items-center gap-10 py-1  text-sm font-medium text-slate-700">
            {[
                "Mens wear",
                "Womens Wear",
                "Electronics",
                "Grocery",
                "Mobiles/Tablets",
                "Beauty",
                "Food",
                "Perfumes",
                "Laptop",
            ].map((item) => (
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