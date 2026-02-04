"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Upload, Plus, ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    const productData = {
      name: e.target.name.value,
      basePrice: e.target.price.value,
      quantity: e.target.quantity.value,
      description: e.target.description.value,
      isActive: isActive,
      bannerImage: preview,
    };
    console.log(productData);
  };
  return (
    <div className="w-full p-1">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900">
            Add Product
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Add your product list it.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Form Fields */}

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="productName"
                    className="text-slate-600 font-medium"
                  >
                    Product Name
                  </Label>
                  <Input
                    id="productName"
                    name="name"
                    placeholder="Enter Category Name"
                    className="h-12 bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="text-slate-600 font-medium"
                    >
                      Product Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      name="price"
                      placeholder="Enter Product Price"
                      className="h-12 bg-slate-50/50 "
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="quantity"
                      className="text-slate-600 font-medium"
                    >
                      Product Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      name="quantity"
                      placeholder="Set Product Quantity"
                      className="h-12 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-slate-600 font-medium"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter Description"
                    className="min-h-[150px] bg-slate-50/50 resize-none"
                  />
                </div>
              </div>

              {/* Right Column: Media & Visibility */}
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium">
                    Category Image
                  </Label>

                  <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleFileChange(e.dataTransfer.files?.[0]);
                    }}
                    className="border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center bg-white hover:bg-slate-50/50 transition-colors cursor-pointer min-h-[220px]"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-40 object-contain"
                      />
                    ) : (
                      <>
                        <ImagePlus className="w-10 h-10 text-slate-400 mb-3" />
                        <p className="text-sm font-medium text-slate-600">
                          Click to upload image or drag & drop
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          SVG, JPG, PNG (max. 2 MB)
                        </p>
                      </>
                    )}
                  </div>

                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleFileChange(e.target.files?.[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-600 font-medium">
                    Visibility Status
                  </Label>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold text-slate-700">
                        Active
                      </p>
                      <p className="text-xs text-slate-400">
                        Product is visible to customers
                      </p>
                    </div>
                    <Switch
                      checked={isActive}
                      onCheckedChange={setIsActive}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-6">
              <Button
                onClick={() => router.push("/admin/product")}
                variant="outline"
                className="px-10 h-12 rounded-full border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                Cancle
              </Button>
              <Button
                type="submit"
                className="px-10 min-w-36 h-12 rounded-full bg-[#2D5A5D] hover:bg-[#234749] text-white flex items-center gap-2"
              >
                Add <Plus className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
