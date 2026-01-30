import Link from "next/link"
import { Menu, Search, ShoppingBag, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Mobile Menu */}
                <div className="flex items-center md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <SheetTitle className="text-lg font-bold">Menu</SheetTitle> {/* Accessibility Fix */}
                            <nav className="flex flex-col gap-4 mt-4">
                                <Link href="#" className="text-lg font-medium hover:underline">
                                    New Arrivals
                                </Link>
                                <Link href="#" className="text-lg font-medium hover:underline">
                                    Men
                                </Link>
                                <Link href="#" className="text-lg font-medium hover:underline">
                                    Women
                                </Link>
                                <Link href="#" className="text-lg font-medium hover:underline">
                                    Accessories
                                </Link>
                                <Link href="#" className="text-lg font-medium hover:underline">
                                    Sale
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    {/* Search Trigger for Mobile (Optional) */}
                    <Search className="h-5 w-5 md:hidden" />
                </div>

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tighter sm:text-2xl">
                            YUNANVED
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden gap-6 md:flex">
                    <Link
                        href="#"
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        New Arrivals
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        Men
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        Women
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        Accessories
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                    >
                        Sale
                    </Link>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden sm:block relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-[200px] lg:w-[300px] pl-8 rounded-full bg-secondary"
                        />
                    </div>
                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Sign In</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="sr-only">Cart</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
