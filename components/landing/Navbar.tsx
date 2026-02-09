import { Search, MapPin, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <header className="w-full bg-white py-3 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 md:gap-8">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-black tracking-tighter text-[#1A2E35]">
            YUNANVED
          </h1>
        </div>

        {/* Location Picker */}
        <div className="hidden lg:flex items-center gap-2 text-[#1A2E35] cursor-pointer group">
          <MapPin size={20} className="text-[#1A2E35]" />
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] text-gray-500 font-medium">Deliver to</span>
            <span className="text-sm font-bold group-hover:text-slate-600 transition-colors">Jaipur</span>
          </div>
        </div>

        {/* Search Bar Container */}
        <div className="flex-grow max-w-2xl relative flex items-center">
          <div className="relative w-full">
            <Input 
              type="text" 
              placeholder="Search for Products, Brands & More" 
              className="w-full h-11 rounded-full border-slate-300 pr-14 pl-6 text-sm focus-visible:ring-1 focus-visible:ring-slate-400"
            />
            {/* Search Button integrated inside the bar */}
            <Button 
              size="icon" 
              className="absolute right-1 top-1 h-9 w-9 rounded-full bg-[#3D3D3D] hover:bg-black text-white"
            >
              <Search size={18} />
            </Button>
          </div>
        </div>

        {/* Actions (Sign Up, Login, Cart) */}
        <div className="flex items-center gap-3 md:gap-6">
          <button className="hidden sm:block text-sm font-semibold text-slate-700 hover:text-black">
            Sign Up
          </button>
          
          <Button 
            className="bg-[#3D3D3D] hover:bg-black text-white rounded-full px-8 h-10 font-bold hidden md:flex"
          >
            Login
          </Button>

          {/* Cart Icon with Badge */}
          <div className="relative cursor-pointer group p-2">
            <div className="bg-[#3D3D3D] p-2 rounded-full text-white group-hover:bg-black transition-colors">
              <ShoppingCart size={20} />
            </div>
            {/* Notification Badge */}
            <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
              2
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;