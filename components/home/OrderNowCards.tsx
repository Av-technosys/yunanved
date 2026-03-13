import { ORDERNOW_CARD_DATA } from "@/const";
import { Card, CardContent } from "@/components/ui";

export const OrderNowCards = () => {
  return (
   

    <Card className="border border-gray-200 shadow-sm rounded-xl">
  <CardContent className="p-3">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
      {ORDERNOW_CARD_DATA.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <div
            key={index}
            className="flex items-start gap-3 md:gap-4"
          >
            <div className="bg-[#0a0e0f] p-3 rounded-full flex items-center justify-center">
              <Icon className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>

            <div>
              <p className="font-semibold text-sm text-slate-900">
                {feature.title}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </CardContent>
</Card>
  )
}