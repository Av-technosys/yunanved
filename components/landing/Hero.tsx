import { OrderNowCards } from "../home/OrderNowCards";
import { USPCards } from "../home/USPCards";
import { HeroCrousel } from "../home/HeroCrousel";

export const Hero = () => {
  return (
    <div className="w-full bg-white">
      {/* Top Category Nav */}


      <div className="max-w-7xl mx-auto  py-4 space-y-10">
        {/* Main Hero Banner */}
        <HeroCrousel />

        {/* Triple Promo Cards */}
        <USPCards />

        {/* Feature Trust Bar */}
        <OrderNowCards />
      </div>
    </div>
  );
};

export default Hero;




