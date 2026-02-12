"use client";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// import prod1 from "@/public/prod1.png";
// import prod2 from "@/public/prod2.png";
// import prod3 from "@/public/prod3.png";
// import prod4 from "@/public/prod4.png";
// import prod5 from "@/public/prod5.png";
// import prod6 from "@/public/prod6.png";
// import prod7 from "@/public/prod7.png";
// import prod8 from "@/public/prod8.png";
// import prod10 from "@/public/prod10.png";

import aashirwad from "@/public/aashirwad.png";
import aashirwad2 from "@/public/aashirwad2.png";
import aashirwad3 from "@/public/aashirwad3 .png";

import productBannerImage from "../../../public/fortune1.png";
import productOtherImage1 from "../../../public/fortune1.png";
import productOtherImage2 from "../../../public/fortune2.png";
import productOtherImage3 from "../../../public/fortune3.png";
import productOtherImage4 from "../../../public/fortune4.png";
import Image from "next/image";
import { RefreshCw, ShoppingCart, Truck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ReviewCard from "../reviewCard";
import reviewUser from "../../../public/reviewer.png";

import ProductCard from "@/components/productCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const productDetails = {
  name: "Fortune Chakki Fresh Atta, 10 kg, 100% Atta 0% Maida",
  rating: 4.5,
  reviewCount: 150,
  price: "$15.00",
  stock: "In Stock",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  bannerImage: productBannerImage,
  otherImages: [
    productOtherImage1,
    productOtherImage2,
    productOtherImage1,
    productOtherImage2,
  ],
};

const productSpecifications = {
  brandName: "FORTUNE",
  specialty: "Suitable for vegetarians",
  dietType: "Vegetarian",
  itemForm: "Raw",
  regionOfOrigin: "South Asia",
  manufacturer: "Adani Wilmar Atta",
  customerReviews: {
    totalReviews: 28974,
    ratingText: "4.3 out of 5 stars",
  },
  bestSellersRank:
    "#154 in Grocery & Gourmet Foods (See Top 100 in Grocery & Gourmet Foods) #9 in Wheat Flours",
  itemWeight: "10000 Grams",
  itemPackageWeight: "10 Kilograms",
  numberOfItems: 1,
  unitCount: "10000.0 Grams",
};

const reviews = [
  {
    id: 1,
    name: "John Doe",
    description: "The service was beyond my expectations! Highly recommend.",
    image: reviewUser,
  },
  {
    id: 2,
    name: "Alice Smith",
    description: "The service was beyond my expectations! Highly recommend.",
    image: reviewUser,
  },
  {
    id: 3,
    name: "James Johnson",
    description: "The service was beyond my expectations! Highly recommend.",
    image: reviewUser,
  },
  {
    id: 4,
    name: "John Doe",
    description: "The service was beyond my expectations! Highly recommend.",
    image: reviewUser,
  },
  {
    id: 5,
    name: "John Doe",
    description: "The service was beyond my expectations! Highly recommend.",
    image: reviewUser,
  },
  {
    id: 6,
    name: "John Doe",
    description: "The service was beyond my expectations! Highly recommend.",
    image: reviewUser,
  },
];

const similarProducts = [
  {
    name: "Gradient Graphic T-shirt",
    id: 1,
    rating: 4.5,
    stock: "In Stock",
    price: "$145.00",
    image: aashirwad,
  },
  {
    name: "Gradient Graphic T-shirt",
    id: 2,
    rating: 3.5,
    stock: "Out of Stock",
    price: "$145.00",
    image: aashirwad2,
  },
  {
    name: "Gradient Graphic T-shirt",
    id: 3,
    rating: 2.5,
    stock: "Out of Stock",
    price: "$145.00",
    image: aashirwad3,
  },
  {
    name: "Gradient Graphic T-shirt",
    id: 4,
    rating: 4.5,
    stock: "Out of Stock",
    price: "$145.00",
    image: aashirwad,
  },
  {
    name: "Gradient Graphic T-shirt",
    id: 5,
    rating: 4.9,
    stock: "Out of Stock",
    price: "$145.00",
    image: aashirwad2,
  },
];

const customerViewed = [
  {
    name: "Gradient Graphic T-shirt",
    id: 6,
    rating: 4.8,
    stock: "Out of Stock",
    price: "$145.00",
    image: aashirwad,
  },
  {
    name: "Gradient Graphic T-shirt",
    id: 7,
    rating: 3.5,
    stock: "Out of Stock",
    price: "$145.00",
    image: aashirwad2,
  },
  {
    name: "Gradient Graphic T-shirt",
    id: 8,
    rating: 2.5,
    stock: "In Stock",
    price: "$145.00",
    image: aashirwad3,
  },
  {
    name: "Gradient Graphic T-shirt",
    id: 9,
    rating: 1.5,
    stock: "Out of Stock",
    price: "$145.00",
    image: aashirwad,
  },
  {
    name: "Gradient Graphic T-shirt",
    id: 10,
    rating: 5.0,
    stock: "In Stock",
    price: "$145.00",
    image: aashirwad2,
  },
];

const breadcrumb = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Category",
    href: "/category",
  },
  {
    name: "Product",
    href: "",
  },
];

const Page = () => {
  const params = useParams();
  const [bannerImage, setBannerImage] = useState<any>(
    productDetails.otherImages[0],
  );

  return (
    <>
      <Navbar />
      <div className="max-w-6xl px-2 md:px-4 lg:px-0 mx-auto ">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              <div
                className="flex items-center justify-center gap-1"
                key={index}
              >
                <BreadcrumbItem>
                  <Link href={item.href}>{item.name}</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </div>
            ))}
            <BreadcrumbItem>
              <Link href={`/product/${params.id}`}>{params.id}</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-5 my-5 px-2 md:px-4  lg:px-0 gap-10">
        <div className="col-span-5 gap-4 md:gap-2 md:col-span-3 flex flex-col md:flex-row ">
          <div className="w-full order-2 md:order-1 md:w-1/4">
            <div className="flex overflow-x-auto md:flex-col w-full h-full  items-start justify-between   gap-2">
              {productDetails.otherImages.map((image, index) => (
                <Button
                  onClick={() => setBannerImage(image)}
                  variant={"ghost"}
                  key={index}
                  className={`
                     relative h-32 w-32 rounded-lg border
                    bg-[#F5F5F5] p-1 transition
                    hover:border-blue-500
                    focus:border-blue-600
                   `}
                >
                  <Image
                    src={image}
                    alt="product thumbnail"
                    fill
                    className="object-contain rounded-md"
                  />
                </Button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-3/4 order-1 md:order-2  flex  items-center justify-center bg-[#F5F5F5] rounded-lg">
            <div className="h-96 w-64 relative flex items-center justify-center">
              <Image
                src={bannerImage ? bannerImage : productBannerImage}
                alt={"bannerImage"}
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="col-span-5 md:col-span-2 flex flex-col gap-4 md:gap-2 lg:gap-4">
          <h1 className="text-2xl md:text-[14px] lg:text-2xl font-semibold text-gray-900">
            {productDetails.name}
          </h1>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.floor(productDetails.rating) }).map(
                (_, index) => (
                  <span key={index} className="text-yellow-400">
                    ★
                  </span>
                ),
              )}
              <span className="text-gray-400 ml-1">
                ({productDetails.reviewCount} Reviews)
              </span>
            </div>

            <span
              className={`font-medium ${
                productDetails.stock === "In Stock"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {productDetails.stock}
            </span>
          </div>

          <p className="text-2xl font-bold text-gray-900">
            {productDetails.price}
          </p>

          <p className="text-gray-600 text-sm md:text-[10px] lg:text-sm leading-relaxed">
            {productDetails.description}
          </p>

          <hr />

          <div className="flex flex-col gap-2">
            <p className="font-medium text-gray-800">Quantity</p>

            <div className="flex gap-2 flex-wrap">
              {["5KG", "10KG", "20KG", "35KG", "40KG"].map((quantity) => (
                <button
                  key={quantity}
                  className="px-4 py-1.5 rounded-md border text-sm
                     hover:border-teal-600 hover:text-teal-700
                     focus:bg-teal-700 focus:text-white"
                >
                  {quantity}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <button className="flex-1 bg-teal-700 text-white py-2 rounded-full font-medium hover:bg-teal-800">
              Add to cart
            </button>

            <button className="flex-1 bg-yellow-500 text-white py-2 rounded-full font-medium hover:bg-yellow-600">
              Buy Now
            </button>
          </div>

          <div className="border rounded-lg mt-4 divide-y">
            <div className="flex gap-3 p-4">
              <span className="text-xl">
                <Truck />
              </span>
              <div>
                <p className="font-medium text-gray-800">Free Delivery</p>
                <p className="text-sm text-gray-500">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4">
              <span className="text-xl">
                <RefreshCw />
              </span>
              <div>
                <p className="font-medium text-gray-800">Return Delivery</p>
                <p className="text-sm text-gray-500">
                  Free 30 Days Delivery Returns.{" "}
                  <span className="underline cursor-pointer">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl px-2 md:px-4 border border-transparent my-5 mx-auto ">
        <h1 className="text-lg mt-5 font-bold">Product Specifications</h1>
        <div className="flex flex-col md:flex-row w-full my-5 gap-10 ">
          <div className="w-full md:w-1/2 flex flex-col gap-2 text-sm text-gray-800">
            <h3 className="font-semibold text-base mb-2">Item details</h3>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Brand Name</span>
              <span className="font-medium">
                {productSpecifications.brandName}
              </span>
            </div>
            <Separator />

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Specialty</span>
              <span className="font-medium">
                {productSpecifications.specialty}
              </span>
            </div>
            <Separator />

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Diet Type</span>
              <span className="font-medium">
                {productSpecifications.dietType}
              </span>
            </div>
            <Separator />

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Item Form</span>
              <span className="font-medium">
                {productSpecifications.itemForm}
              </span>
            </div>
            <Separator />

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Region of Origin</span>
              <span className="font-medium">
                {productSpecifications.regionOfOrigin}
              </span>
            </div>
            <Separator />

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Manufacturer</span>
              <span className="font-medium">
                {productSpecifications.manufacturer}
              </span>
            </div>
            <Separator />

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Customer Reviews</span>
              <span className="font-medium">
                {productSpecifications.customerReviews.ratingText} (
                {productSpecifications.customerReviews.totalReviews})
              </span>
            </div>
            <Separator />

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Best Sellers Rank</span>
              <span className="font-medium text-right max-w-[60%]">
                {productSpecifications.bestSellersRank}
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-2 text-sm text-gray-800">
            <h3 className="font-semibold text-base mb-2">Measurement</h3>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Item Weight</span>
              <span className="font-medium">
                {productSpecifications.itemWeight}
              </span>
            </div>
            <Separator />

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Item Package Weight</span>
              <span className="font-medium">
                {productSpecifications.itemPackageWeight}
              </span>
            </div>
            <Separator />

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Number of Items</span>
              <span className="font-medium">
                {productSpecifications.numberOfItems}
              </span>
            </div>
            <Separator />

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Unit Count</span>
              <span className="font-medium">
                {productSpecifications.unitCount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl px-2 md:px-4 lg:px-0 mt-5 mx-auto">
        <div className="text-lg mb-5 font-bold">Customer Reviews</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {reviews.map((review, index) => {
            return <ReviewCard review={review} key={review.id} />;
          })}
        </div>
      </div>
      <div className="max-w-6xl mt-5 px-2 md:px-4 lg:px-0  mx-auto">
        <div className="text-lg mb-5 font-bold">Similar Products</div>
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-2">
          {similarProducts.map((product: any, index) => {
            return (
              <ProductCard product={product} key={index} className="h-60" />
            );
          })}
        </div>
      </div>
      <div className="max-w-6xl  mt-5 px-2 md:px-4 lg:px-0 mx-auto">
        <div className="text-lg mb-5 font-bold">Customer Also Viewed</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {customerViewed.map((product: any, index) => {
            return (
              <ProductCard product={product} key={index} className="h-60" />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
