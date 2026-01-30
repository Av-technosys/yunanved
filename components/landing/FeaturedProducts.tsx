import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const products = [
    {
        id: 1,
        name: "Classic Denim Jacket",
        price: "$89.00",
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1887&auto=format&fit=crop",
        category: "Outerwear",
        rating: 4.5
    },
    {
        id: 2,
        name: "Cotton Essentials Tee",
        price: "$25.00",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
        category: "Tops",
        new: true,
        rating: 4.8
    },
    {
        id: 3,
        name: "Urban Cargo Pants",
        price: "$65.00",
        image: "https://images.unsplash.com/photo-1517445312882-efe00af26dd1?q=80&w=1800&auto=format&fit=crop", // Replaced with a more generic clothing image if needed or just accept this
        category: "Bottoms",
        rating: 4.2
    },
    {
        id: 4,
        name: "Leather Street Sneakers",
        price: "$120.00",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
        category: "Footwear",
        rating: 4.9
    }
]

export function FeaturedProducts() {
    return (
        <section className="py-16 container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-between mb-10 gap-4 sm:flex-row">
                <div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                        Trending Now
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Our most popular picks for the season.
                    </p>
                </div>
                <Button variant="outline" className="hidden sm:inline-flex">
                    View All Products
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="group overflow-hidden rounded-lg border-none shadow-lg items-center">
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                            {product.new && (
                                <div className="absolute top-2 left-2 z-10">
                                    <Badge variant="secondary" className="bg-black text-white hover:bg-black/90">New</Badge>
                                </div>
                            )}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                style={{ backgroundImage: `url('${product.image}')` }}
                            />
                            {/* Quick Add Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-black/60 to-transparent">
                                <Button className="w-full bg-white text-black hover:bg-gray-200">
                                    Add to Cart
                                </Button>
                            </div>
                        </div>

                        <CardContent className="pt-4">
                            <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                            <h3 className="font-semibold text-lg leading-none tracking-tight mb-2 group-hover:text-primary transition-colors">
                                {product.name}
                            </h3>
                            <div className="flex items-center gap-1 mb-2">
                                {Array(5).fill(null).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                                <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0 flex items-center justify-between">
                            <span className="font-bold text-lg">{product.price}</span>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
                <Button variant="outline" className="w-full">
                    View All Products
                </Button>
            </div>
        </section>
    )
}
