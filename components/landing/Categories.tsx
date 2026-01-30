import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
    {
        title: "Women's Collection",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop",
        href: "#"
    },
    {
        title: "Men's Classic",
        image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop",
        href: "#"
    },
    {
        title: "Accessories",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop", // Watch/Shoe
        href: "#"
    },
    {
        title: "New Arrivals",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
        href: "#"
    }
]

export function Categories() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 sm:text-4xl">
                    Shop by Category
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <Link key={category.title} href={category.href} className="group overflow-hidden rounded-lg">
                            <Card className="border-none shadow-md overflow-hidden h-[300px] relative">
                                <CardContent className="p-0 h-full">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url('${category.image}')` }}
                                    />
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h3 className="text-2xl font-bold text-white tracking-wide uppercase border-b-2 border-transparent group-hover:border-white transition-all">
                                            {category.title}
                                        </h3>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
