/* eslint-disable @typescript-eslint/no-explicit-any */
import prod1 from "@/public/prod1.png";
import prod2 from "@/public/prod2.png";
import prod3 from "@/public/prod3.png";
import prod4 from "@/public/prod4.png";
import prod5 from "@/public/prod5.png";
import prod6 from "@/public/prod6.png";
import prod7 from "@/public/prod7.png";
import prod8 from "@/public/prod8.png";
import prod9 from "@/public/prod9.png";
import prod10 from "@/public/prod10.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarTaxiFront, Filter, FilterIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import Link from "next/link";
import ProductCard from "@/components/productCard";
import { FilterSidebar } from "../filterSidebar";

import { getAllProductsByCategorySlug } from "@/helper/category/action";

// const products = [
//   {
//     name: "Gradient Graphic T-shirt",
//     id: 1,
//     rating: 4.5,
//     stock: "In Stock",
//     price: "$145.00",
//     image: prod1,
//   },
//   {
//     name: "Gradient Graphic T-shirt",
//     id: 2,
//     rating: 3.5,
//     stock: "Out of Stock",
//     price: "$145.00",
//     image: prod6,
//   },
//   {
//     name: "Gradient Graphic T-shirt",
//     id: 3,
//     rating: 2.5,
//     stock: "Out of Stock",
//     price: "$145.00",
//     image: prod10,
//   },
//   {
//     name: "Gradient Graphic T-shirt",
//     id: 4,
//     rating: 4.5,
//     stock: "Out of Stock",
//     price: "$145.00",
//     image: prod2,
//   },
//   {
//     name: "Gradient Graphic T-shirt",
//     id: 5,
//     rating: 4.9,
//     stock: "Out of Stock",
//     price: "$145.00",
//     image: prod3,
//   },
//   {
//     name: "Gradient Graphic T-shirt",
//     id: 6,
//     rating: 4.8,
//     stock: "Out of Stock",
//     price: "$145.00",
//     image: prod4,
//   },
//   {
//     name: "Gradient Graphic T-shirt",
//     id: 7,
//     rating: 3.5,
//     stock: "Out of Stock",
//     price: "$145.00",
//     image: prod5,
//   },
//   {
//     name: "Gradient Graphic T-shirt",
//     id: 8,
//     rating: 2.5,
//     stock: "In Stock",
//     price: "$145.00",
//     image: prod6,
//   },
//   {
//     name: "Gradient Graphic T-shirt",
//     id: 9,
//     rating: 1.5,
//     stock: "Out of Stock",
//     price: "$145.00",
//     image: prod7,
//   },
//   {
//     name: "Gradient Graphic T-shirt",
//     id: 10,
//     rating: 5.0,
//     stock: "In Stock",
//     price: "$145.00",
//     image: prod8,
//   },
//   {
//     name: "Gradient Graphic T-shirt",
//     id: 11,
//     rating: 4.5,
//     stock: "Out of Stock",
//     price: "$145.00",
//     image: prod9,
//   },
//   {
//     name: "Gradient Graphic T-shirt",
//     id: 12,
//     rating: 4.5,
//     stock: "In Stock",
//     price: "$145.00",
//     image: prod10,
//   },
// ];

const breadcrumb = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Category",
    href: "/category",
  },
];

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async (props: PageProps) => {
  const { slug } = await props.params;

  const products = await getAllProductsByCategorySlug(slug);

  return (
    <>
      <Navbar />
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
              Fashion
            </div>
            <div className="text-gray-600">Sort by : Latest Product</div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((product: any, index) => {
              return <ProductCard product={product} key={index} slug={slug} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
