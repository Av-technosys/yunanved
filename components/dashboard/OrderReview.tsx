/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Calendar, ChevronRight, Loader2, Star, Upload } from "lucide-react";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { useFileUpload } from "@/helper/useFileUpload";
import { createReview } from "@/helper";
import { toast } from "sonner";
import { on } from "events";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";

const orderDetailsReview = ({
  orderDetails,
  setorderDetailsReview,
  onBack,
}: any) => {
  const { upload, uploading } = useFileUpload();
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  // const [previews, setPreviews] = useState<{ [key: string]: string }>({});
  const [previews, setPreviews] = useState<
    { productId: string; preview: string; index: number }[]
  >([]);
  const [fileKey, setFileKey] = useState<
    { productId: string; fileKey: string; index: number }[]
  >([]);
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

  const handleImageChange = async (
    e: any,
    productId: string,
    index: number,
  ) => {
    const file = e.target.files[0];
    if (file) {
      const folder = "review";
      const { preview, fileKey } = await upload(file, folder);
      
      setPreviews((prev) => {
        const filtered = prev.filter(
          (p) => !(p.productId === productId && p.index === index),
        );

        return [...filtered, { productId, preview, index }];
      });

      setFileKey((prev) => [...prev, { productId, fileKey, index }]);
    }
  };

  const handleSubmitReview = async (productVarientId: string) => {
    const reviewData = {
      userId: orderDetails.userId,
      productVarientId,
      rating: ratings[productVarientId] || 0,
      message: comments[productVarientId] || "",
      media: fileKey || [],
    };

    try {
      setLoadingProduct(productVarientId);

      const response = await createReview(reviewData);

      if (response.success) {
        toast.success("Review submitted successfully!");

        setRatings((prev) => ({ ...prev, [productVarientId]: 0 }));
        setComments((prev) => ({ ...prev, [productVarientId]: "" }));
        setFileKey([]);
        setPreviews([]);
      } else {
        toast.error("Failed to submit review");
      }
    } finally {
      setLoadingProduct(null);
    }
  };
  return (
    <>
      <div>
        <nav
          className="flex items-center gap-1 text-[13px] text-gray-500 p-2 cursor-pointer"
          onClick={() => onBack()}
        
        >
          <span>Home</span> <ChevronRight size={12} />
          <span>My orders</span> <ChevronRight size={12} />
          <span>Order Details</span> <ChevronRight size={12} />
          <span className="font-medium text-gray-800">Order Review</span>
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <Card>
          <CardContent>
            <CardTitle className="text-[#235A62] pl-1 font-semibold ">
              Write a Review
            </CardTitle>
            <p className="text-gray-600 pl-1 mt-1 text-xs">
              Share your experience with us
            </p>

            <CardDescription className="my-3">
              <Card
                key={orderDetails.id}
                className="rounded-2xl borderDetails borderDetails-gray-100 shadow-sm hover:shadow-md transition-shadow px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left Section: ID and Timing */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#1D4E4E]/10 text-[#1D4E4E] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      orderDetails
                    </span>
                    <h3 className="font-bold text-gray-900 text-sm tracking-tight">
                      #{orderDetails.id}
                    </h3>
                    {/* <Badge
                    className={`${getStatusColor(orderDetails.status)} capitalize text-[11px] px-2.5 py-0.5 borderDetails-none shadow-none`}
                  >
                    {orderDetails.status}
                  </Badge> */}
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                    <Calendar size={12} />
                    {new Date(orderDetails.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>

                {/* Middle Section: Shipping Brief (Uses your City/Pincode) */}
                <div className="hidden md:flex flex-col borderDetails-l borderDetails-gray-100 pl-6">
                  <p className="text-[10px] uppercase text-gray-400 font-medium tracking-wider">
                    Shipping To
                  </p>
                  {(orderDetails.city || orderDetails.pincode) && (
                    <p className="text-xs font-medium text-gray-700 capitalize">
                      {orderDetails.city && orderDetails.city}
                      {orderDetails.city && orderDetails.pincode && ", "}
                      {orderDetails.pincode && orderDetails.pincode}
                    </p>
                  )}
                </div>

                {/* Right Section: Price and Action */}
                <div className="flex items-center justify-between sm:justify-end gap-8 borderDetails-t sm:borderDetails-t-0 pt-3 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] uppercase text-gray-400 font-medium">
                      Total Amount
                    </p>
                    <p className="text-lg font-bold text-[#1D4E4E]">
                      ₹{orderDetails.totalAmountPaid.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </Card>
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CardTitle className="text-[#235A62] pl-1 font-semibold ">
              Rate Specific Product
            </CardTitle>
            <CardDescription className="my-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {orderDetails.items.map((item: any, index: number) => {
                  const variantId = item.productVarientId || item.productId || item.productVariant?.id;

                  return (
                    <Card
                      key={index}
                      className="max-w-md w-full p-4 rounded-2xl shadow-md"
                    >
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3 items-center ">
                            <div className="w-12 h-12  overflow-hidden  relative rounded-md">
                              <Image
                                src={`${NEXT_PUBLIC_S3_BASE_URL}/${item.productImage}`}
                                alt={item.productName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h2 className="text-lg font-semibold">
                                {item.productName}
                              </h2>
                              <p className="text-sm text-muted-foreground">
                                Quantity : {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="text-lg font-bold">
                            ₹{item.productPrice}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={28}
                              className={`cursor-pointer transition-colors ${star <= (ratings[variantId] || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                                }`}
                              onClick={() =>
                                setRatings((prev) => ({
                                  ...prev,
                                  [variantId]: star,
                                }))
                              }
                            />
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3, 4, 5].map((index: number) => {
                            const currentPreview = previews.find(
                              (p) =>
                                p.productId === item.productId &&
                                p.index === index,
                            );

                            return (
                              <div
                                key={index}
                                className="border-2 border-dashed rounded-xl p-4 text-center relative overflow-hidden"
                              >
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleImageChange(e, item.productId, index)
                                  }
                                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />

                                {currentPreview ? (
                                  <Image
                                    src={currentPreview.preview}
                                    alt={`Preview ${index}`}
                                    width={100}
                                    height={100}
                                    className="object-cover mx-auto rounded-md"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                                    <Upload className="mb-2" />
                                    <p className="text-sm">Upload Image</p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <Textarea
                          placeholder="Your comment"
                          className="min-h-[120px]"
                          value={comments[variantId] || ""}
                          onChange={(e) =>
                            setComments((prev) => ({
                              ...prev,
                              [variantId]: e.target.value,
                            }))
                          }
                        />

                        <Button
                          className="w-full"
                          disabled={loadingProduct === variantId && loadingProduct !== null}
                          onClick={() => handleSubmitReview(variantId)}
                        >
                          {loadingProduct === variantId && loadingProduct !== null
                            ? "Submitting..."
                            : "Submit Review"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default orderDetailsReview;
