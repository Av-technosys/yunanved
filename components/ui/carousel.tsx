"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

React.useEffect(() => {
  if (!api) return

  const update = () => {
    setSelectedIndex(api.selectedScrollSnap())
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
    setScrollSnaps(api.scrollSnapList())
  }

  update()

  api.on("select", update)
  api.on("reInit", update)

  return () => {
    api.off("select", update)
  }
}, [api])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
        {scrollSnaps.length > 1 && (
  <div className="flex justify-center gap-2 mt-3">
{scrollSnaps.length > 0 && (
  <div className="flex justify-center gap-2 mt-6">
    {Array.from({ length: 3 }).map((_, index) => {
      const groupSize = Math.ceil(scrollSnaps.length / 3)
      const targetIndex = index * groupSize
      const isActive =
        selectedIndex >= targetIndex &&
        selectedIndex < targetIndex + groupSize

      return (
        <button
          key={index}
          onClick={() => api?.scrollTo(targetIndex)}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            isActive ? "bg-black w-6" : "bg-gray-300 w-2"
          )}
        />
      )
    })}
  </div>
)}
  </div>
)}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <button
      data-slot="carousel-previous"
      className={cn(
        "absolute z-10",
        orientation === "horizontal"
          ? "top-1/2 -translate-y-1/2 left-4"
          : "left-1/2 -translate-x-1/2 top-4 rotate-90",
        "bg-transparent border-none shadow-none p-0",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft
        size={34}
        className="text-slate-600 hover:text-black transition-colors"
      />
      <span className="sr-only">Previous slide</span>
    </button>
  )
}
function CarouselNext({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <button
      data-slot="carousel-next"
      className={cn(
        "absolute z-10",
        orientation === "horizontal"
          ? "top-1/2 -translate-y-1/2 right-4"
          : "left-1/2 -translate-x-1/2 bottom-4 rotate-90",
        "bg-transparent border-none shadow-none p-0",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight
        size={34}
        className="text-slate-600 hover:text-black transition-colors"
      />
      <span className="sr-only">Next slide</span>
    </button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
