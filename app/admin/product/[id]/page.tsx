"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, ImagePlus } from "lucide-react";

/**
 * Mock fetched product
 * (replace with API / server data later)
 */
const PRODUCT_DATA = {
  name: "Organic Wheat Atta",
  price: 250,
  quantity: 40,
  description: "Premium quality organic wheat atta.",
  image:
    "https://dummyimage.com/400x300/cccccc/000000&text=Product+Image",
  isActive: true,
};

export default function ManageProductForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: PRODUCT_DATA.name,
    price: PRODUCT_DATA.price,
    quantity: PRODUCT_DATA.quantity,
    description: PRODUCT_DATA.description,
    isActive: PRODUCT_DATA.isActive,
  });

  const [preview, setPreview] = useState<string | null>(
    PRODUCT_DATA.image
  );

  const handleFileChange = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="w-full p-1">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900">
            Manage Product
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Update product details and visibility.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-slate-600 font-medium">
                  Product Name
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="h-12 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-600 font-medium">
                    Product Price
                  </Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: Number(e.target.value) })
                    }
                    className="h-12 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-600 font-medium">
                    Product Quantity
                  </Label>
                  <Input
                    type="number"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        quantity: Number(e.target.value),
                      })
                    }
                    className="h-12 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-600 font-medium">
                  Description
                </Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="min-h-[150px] bg-slate-50/50 resize-none"
                />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div className="space-y-1.5">
                <Label className="text-slate-600 font-medium">
                  Product Image
                </Label>

                <div
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFileChange(e.dataTransfer.files?.[0]);
                  }}
                  className="border-2 border-dashed border-slate-200 rounded-xl p-10 flex items-center justify-center bg-white hover:bg-slate-50/50 cursor-pointer min-h-[220px]"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Product"
                      className="max-h-40 object-contain"
                    />
                  ) : (
                    <ImagePlus className="w-10 h-10 text-slate-400" />
                  )}
                </div>

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    handleFileChange(e.target.files?.[0])
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-600 font-medium">
                  Visibility Status
                </Label>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      Active
                    </p>
                    <p className="text-xs text-slate-400">
                      Product is visible to customers
                    </p>
                  </div>
                  <Switch
                    checked={form.isActive}
                    onCheckedChange={(v) =>
                      setForm({ ...form, isActive: v })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-4 pt-6">
          <Button variant="outline" className="px-10 h-12 rounded-full">
            Cancel
          </Button>
          <Button className="px-10 h-12 rounded-full bg-[#2D5A5D] text-white">
            Update 
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
