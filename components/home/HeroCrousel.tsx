import Link from "next/link";
import Image from "next/image";

export const HeroCrousel = () => {
    return (
        <div className="relative h-[340px] w-full overflow-hidden rounded-lg bg-[#edf7d8] md:h-[450px]">
            <Image
                src="/home_banner.png"
                alt="Natural skincare promotion"
                fill
                priority
                className="hidden object-cover md:block"
            />
            <Image
                src="/mobile-banner.png"
                alt="Natural skincare promotion"
                fill
                priority
                className="object-cover md:hidden"
            />

            <Link
                href="/category"
                className="absolute bottom-10 left-2 inline-flex h-11 items-center justify-center rounded-md bg-[#96C948] px-7 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#83b83c] sm:left-9 md:bottom-20 md:left-16 md:h-12 md:px-8"
            >
                Shop Now
            </Link>
        </div>
    )
}
