import { OrderNowCards } from "../home/OrderNowCards";
import { HeroCrousel } from "../home/HeroCrousel";

export const Hero = () => {
  return (
    <div className="w-full mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-16 bg-white">
      {/* Top Category Nav */}


      <div className="mx-auto space-y-5 py-5">
        {/* Main Hero Banner */}
        <HeroCrousel />

        {/* Feature Trust Bar */}
        <OrderNowCards />
      </div>
    </div>
  );
};





