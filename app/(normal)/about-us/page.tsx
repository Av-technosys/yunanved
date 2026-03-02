import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import AboutUsBanner from "@/public/aboutUsBanner.png";
import { Button } from "@/components/ui/button";
import HeroSection from "./heroSection";
import WhyChooseUs from "./whyChooseUs";
import FounderMessage from "./founderSection";
import CorePurpose from "./corePurpose";
import CareersCTA from "./CTA";
import CoreValues from "./coreValues";
import { Newsletter } from "@/components/landing/Newsletter";

const Page = () => {
  return (
    <>
      <Navbar />
      <div
        className="w-full h-[28rem] flex items-center justify-center"
        style={{ backgroundImage: `url(${AboutUsBanner.src})` }}
      >
        <div className="max-w-lg mx-auto flex flex-col items-center justify-between gap-4 text-white">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-center">
              Crafting Quality <br /> Defining Style
            </h1>
            <p className="text-[14px] my-5 font-semibold text-center">
              A glimpse into our workshop and the passion behind our brand. We
              believe in pieces that last a lifetime.
            </p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-gray-500 hover:bg-gray-600 w-[180px] text-white">
              View Collection
            </Button>
            <Button className="rounded-2xl hover:bg-white w-[180px] bg-white text-black">
              Our Process
            </Button>
          </div>
        </div>
      </div>
      <HeroSection />
      <WhyChooseUs />
      <FounderMessage />
      <CorePurpose />
      <CareersCTA />
      <CoreValues />
      <div className="max-w-6xl my-5 mx-auto">
        <Newsletter />
      </div>
      <Footer />
    </>
  );
};

export default Page;
