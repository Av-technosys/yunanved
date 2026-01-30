import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
    return (
        <section className="w-full py-16 md:py-24 lg:py-32 bg-slate-950 text-white">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Stay in the Loop
                        </h2>
                        <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Subscribe to our newsletter to get the latest updates, exclusive deals, and fashion tips delivered to your inbox.
                        </p>
                    </div>
                    <div className="w-full max-w-sm space-y-2 mt-4">
                        <form className="flex flex-col sm:flex-row gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-white"
                                required
                            />
                            <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                                Subscribe
                            </Button>
                        </form>
                        <p className="text-xs text-gray-500">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
