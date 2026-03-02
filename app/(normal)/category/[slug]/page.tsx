/* eslint-disable @typescript-eslint/no-explicit-any */


import CategoryView from "@/components/category/CategoryView";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { FilterSidebar } from "../filterSidebar";

import { getAllProductsByCategorySlug, getCategoryBySlug } from "@/helper/category/action";


interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async (props: PageProps) => {
  const { slug } = await props.params;

  const [products, categoryInfo] = await Promise.all([
    getAllProductsByCategorySlug(slug),
    getCategoryBySlug(slug),
  ]);

  if (!categoryInfo) {
    return (
      <>
        <div className="p-20 text-center">Category not found</div>
      </>
    );
  }

  return (
    <>

      <div className="max-w-6xl  mx-auto grid grid-cols-4 gap-4 my-5 px-2 md:px-4 lg:px-0 ">
        <div className="col-span-1 hidden md:flex flex-col  gap-3">
          <div className="sticky top-4">
            <Card>
              <CardContent>
                <CardTitle className="flex w-full my-5 items-center justify-between">
                  <strong>Filter</strong>
                  <strong>
                    <Filter />
                  </strong>
                </CardTitle>

                <Separator />
                <CardDescription>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="shipping"
                    className="max-w-lg"
                  >
                    <AccordionItem value="fashion">
                      <AccordionTrigger>Fashion</AccordionTrigger>
                      <AccordionContent>
                        We offer standard (5-7 days), express (2-3 days), and
                        overnight shipping. Free shipping on international
                        orders.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="grocery">
                      <AccordionTrigger>Grocery</AccordionTrigger>
                      <AccordionContent>
                        Returns accepted within 30 days. Items must be unused
                        and in original packaging. Refunds processed within 5-7
                        business days.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="electronics">
                      <AccordionTrigger>Electronics</AccordionTrigger>
                      <AccordionContent>
                        Reach us via email, live chat, or phone. We respond
                        within 24 hours during business days.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="beauty">
                      <AccordionTrigger>Beauty</AccordionTrigger>
                      <AccordionContent>
                        Reach us via email, live chat, or phone. We respond
                        within 24 hours during business days.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="food">
                      <AccordionTrigger>Food</AccordionTrigger>
                      <AccordionContent>
                        Reach us via email, live chat, or phone. We respond
                        within 24 hours during business days.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="price">
                      <AccordionTrigger>Price</AccordionTrigger>
                      <AccordionContent>
                        <Slider
                          defaultValue={[50, 200]}
                          max={1000}
                          step={5}
                          className="w-full my-4"
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="avaliablity">
                      <AccordionTrigger>Avaliablity</AccordionTrigger>
                      <AccordionContent>
                        <span>In Stock</span>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardDescription>
                <Separator />
                <CardFooter>
                  <div className="w-full flex flex-col gap-3 my-5">
                    <Button className="w-full text-base md:text-xs lg:text-base bg-[#235A62] hover:bg-[#235A62]">
                      Apply Filter
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full text-base md:text-xs lg:text-base text-[#235A62] border-[#235A62]"
                    >
                      Clear Filter
                    </Button>
                  </div>
                </CardFooter>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="col-span-4 md:col-span-3 w-full flex flex-col gap-2">
          <div className="w-full flex items-center justify-between">
            <Button
              variant={"outline"}
              className="text-gray-600 block md:hidden font-semibold "
            >
              <FilterSidebar />
            </Button>
            <div className="text-black hidden  md:block font-bold text-lg">
              {categoryInfo.name}
            </div>
            <div className="text-gray-600">Sort by : Latest Product</div>
          </div>
          <CategoryView
            products={products}
            slug={slug}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
