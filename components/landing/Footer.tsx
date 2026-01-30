import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container px-4 md:px-6 py-12 md:py-16 mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">YUNANVED</h3>
                        <p className="text-sm text-muted-foreground">
                            Premium fashion designed for the modern individual. Quality, sustainability, and style in every stitch.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Shop</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">New Arrivals</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Men</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Women</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Accessories</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Sale</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-foreground">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Shipping & Returns</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Contact</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                <span>123 Fashion Blvd, Design District, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 shrink-0" />
                                <span>support@yunanved.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-muted-foreground">
                    <p>&copy; 2025 Yunanved. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-foreground">Privacy</Link>
                        <Link href="#" className="hover:text-foreground">Terms</Link>
                        <Link href="#" className="hover:text-foreground">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
