import { ORDERNOW_CARD_DATA } from "@/const";
import { Card, CardContent } from "@/components/ui";

export const OrderNowCards = () => {
  return (
    <Card className="rounded-none border-0 border-b border-gray-300 bg-white shadow-none">
      <CardContent className="px-2 py-5 md:px-3">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4 md:gap-8">
          {ORDERNOW_CARD_DATA.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#96C948]">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[13px] font-bold leading-tight text-[#02A9E5]">
                    {feature.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-tight text-slate-700">
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
