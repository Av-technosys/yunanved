import { ORDERNOW_CARD_DATA } from "@/const";

export const OrderNowCards = () => {
  return (
    <div className="grid grid-cols-2 pt-6 md:grid-cols-4 gap-8 md:gap-16 border-t border-gray-100">
      {ORDERNOW_CARD_DATA.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <div key={index} className="flex md:items-center gap-2 md:gap-4">
            <div className="bg-[#0a0e0f] p-2 md:p-3 w-fit h-fit rounded-full">
              <Icon className="text-white size-6" />
            </div>

            <div>
              <p className="font-bold text-sm">{feature.title}</p>
              <p className="text-xs text-slate-500">{feature.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  )
}