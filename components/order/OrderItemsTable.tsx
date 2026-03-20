/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "@/components/ui";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";
import { ReturnModal } from "../dashboard/ReturnModal";

export function OrderItemsTable({ orderData }: any) {
  const S3_BASE = NEXT_PUBLIC_S3_BASE_URL;
 
  return (
    <Card className="lg:col-span-12 rounded-[24px] border-none shadow-sm p-8 overflow-hidden">

      {/* Header */}
      <div className="flex justify-between text-sm font-semibold text-gray-400 mb-6 px-4">
        <span className="w-1/2">Product</span>
        <span className="w-[15%] text-center">Quantity</span>
        <span className="w-[15%] text-center">Total</span>
        <span className="w-[20%] text-right">Action</span>
      </div>

      <div className="space-y-6">
        {orderData?.items?.map((item: any) => {
          const returnReq = item.returnRequest;
           
          return (
            <div
              key={item.id}
              className="flex items-center justify-between px-4"
            >
              {/* Product */}
              <div className="w-1/2 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={`${S3_BASE}/${item.productImage}`}
                    className="object-cover h-full w-full"
                    alt="product"
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-[#1D4E4E] truncate max-w-[250px]">
                    {item.product?.name || item.productName}
                  </p>
                  <p className="text-xs text-gray-400 truncate max-w-[250px]">
                    {item.product?.sku || "No SKU"}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="w-[15%] text-center text-gray-600">
                <span className="inline-block">{item.quantity}x</span>
              </div>

              {/* Price */}
              <div className="w-[15%] text-center font-bold text-[#1D4E4E]">
                <span className="inline-block">₹{item.productPrice}</span>
              </div>

              {/* ACTION - Fixed width with consistent alignment */}
              <div className="w-[20%] text-right">
                {orderData.status !== "delivered" ? (
                  <div className="flex justify-end">
                    <span className="text-xs text-gray-400 inline-block">
                      After delivery
                    </span>
                  </div>
                ) : returnReq ? (
                  <div className="flex justify-end">
                    <div className="text-right min-w-[140px]">
                      {returnReq.status === "pending" && (
                        <div>
                          <p className="text-yellow-600 font-medium text-sm">
                            Return requested
                          </p>
                        </div>
                      )}

                      {returnReq.status === "approved" && (
                        <div>
                          <p className="text-blue-600 font-medium text-sm">
                            Approved
                          </p>
                          <p className="text-xs text-gray-500">
                            Refund in process
                          </p>
                        </div>
                      )}

                      {returnReq.status === "refunded" && (
                        <div>
                          <p className="text-green-600 font-medium text-sm">
                            Refunded
                          </p>
                         
                        </div>
                      )}

                      {returnReq.status === "rejected" && (
                        <div>
                          <p className="text-red-600 font-medium text-sm">
                            Return rejected
                          </p>
                          {returnReq.adminReason && (
                            <p className="text-gray-400 text-sm " 
                               title={returnReq.adminReason}>
                              {returnReq.adminReason}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : item.canReturn ? (
                  <div className="flex justify-end">
                    <ReturnModal item={item} />
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <span className="text-xs text-gray-400 inline-block">
                      Return closed
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}