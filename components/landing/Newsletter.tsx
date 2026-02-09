import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden rounded-2xl">
      
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/newslatterBg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-6 text-center text-white mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Stay Updated
        </h2>

        <p className="text-sm md:text-base mb-8 text-gray-200">
          Subscribe to get exclusive offers, style tips, and early access to new collections.
        </p>

        <form className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Enter Your Email"
            className="h-12 bg-white text-black rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-6"
            required
          />

          <Button
            type="submit"
            className="h-12 w-full sm:w-28 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-medium transition-colors"
          >
            Send
          </Button>
        </form>
      </div>
    </section>
  )
}
