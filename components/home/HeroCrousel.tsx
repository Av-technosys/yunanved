export const HeroCrousel = () => {
    return (
        <div className="relative w-full h-[300px] md:h-[300px] md:rounded-xl overflow-hidden group">
            <img
                src="/grocery-banner.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Grocery Promotion"
            />
            {/* Dark Blur Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
                    20% Off on Groceries
                </h1>
                <p className="text-gray-200 text-sm md:text-lg max-w-xl leading-relaxed">
                    Discover the latest trend in technology — elegant design crafted
                    for the modern lifestyle
                </p>
            </div>
        </div>
    )
}