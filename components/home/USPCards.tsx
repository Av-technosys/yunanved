import { PROMO_CARDS } from "@/const"
import { Button } from "../ui/button"

export const USPCards = () => {
  return (
    <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-2">

      {PROMO_CARDS.map((card, index) => (
        <div
          key={index}
          className={`
            ${card.bgColor}
            rounded-xl p-4 relative overflow-hidden
            h-60 flex flex-col justify-between
            min-w-80 md:min-w-0
          `}
        >

          <div className="z-10">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
              {card.title.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h3>

            <p className="text-slate-800 text-sm mt-2">
              {card.description}
            </p>
          </div>

          <Button className="w-fit bg-black text-white hover:bg-slate-800 z-10">
            Order Now
          </Button>

          <img
            src={card.image}
            className="absolute right-0 bottom-0 w-1/2 h-36 object-contain object-bottom-right"
          />
        </div>
      ))}

    </div>
  )
}