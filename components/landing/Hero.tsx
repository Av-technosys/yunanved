import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="relative w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    filter: "brightness(0.7)"
                }}
            />

            {/* Content */}
            <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-start justify-center h-[500px] md:h-[600px] lg:h-[700px] text-white">
                <div className="max-w-[600px] space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <h2 className="text-lg font-medium tracking-wide uppercase text-gray-200">
                        Winter Collection 2025
                    </h2>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        Elevate Your Style
                    </h1>
                    <p className="text-lg text-gray-200 md:text-xl font-light">
                        Discover the latest trends in fashion. Premium quality, sustainable materials, and timeless designs.
                    </p>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                        <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full px-8">
                            Shop Now
                        </Button>
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 rounded-full px-8">
                            View Lookbook
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
