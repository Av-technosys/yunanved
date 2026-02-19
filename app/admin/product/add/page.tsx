/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createProduct, saveProductAttributes , getCategories ,  attachProductCategory } from "@/helper/index";;
import { useFileUpload } from "@/helper/useFileUpload";
import { validateImage } from "@/helper/image/validateImage";
import { toast } from "sonner";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GallerySection from "../GallerySection";
import AttributeSection from "../AttributeSection";


type ImageItem = {
  key: string;
  preview: string;
};

type AttributeValue = {
  id?: string;
  value: string;
};

export default function AddProductForm() {


   const router = useRouter();

  const { upload, uploading } = useFileUpload();

const [categories, setCategories] = useState<any[]>([]);
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

const [isInStock, setIsInStock] = useState(true);
  const [banner, setBanner] = useState<ImageItem | null>(null);
  const [gallery, setGallery] = useState<ImageItem[]>([]);

  const bannerRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [priceError, setPriceError] = useState<string | null>(null);

const [productAttributes, setProductAttributes] =
  useState<Record<string, AttributeValue>>({});



  useEffect(() => {
  async function load() {
    const data = await getCategories();
    setCategories(data);
  }
  load();
}, []);
function handleValueChange(attribute: string, value: string, id?: string) {
  setProductAttributes((prev) => ({
    ...prev,
    [attribute]: {
      id: prev[attribute]?.id ?? id,
      value,
    },
  }));
}

  const validatePrices = (form: HTMLFormElement) => {
    const price = Number((form.elements.namedItem("price") as HTMLInputElement).value);
    const stp = Number((form.elements.namedItem("strikethroughPrice") as HTMLInputElement).value);

    if (!stp) {
    setPriceError(null);
    return true;
  }

    if (stp > price) {
      setPriceError("Strike through price must be less than price");
      return false;
    }

    setPriceError(null);
    return true;
  };

const handleBanner = async (file?: File) => {
  if (!file) return;

  try {
    // validate BEFORE upload
    await validateImage(file, {
      maxSizeMB: 2,
      maxWidth: 400,
      maxHeight: 600,
      ratio: 400 / 600,
    });

    const folder = "product";
    const { preview, fileKey } = await upload(file, folder);

    setBanner({
      key: fileKey,
      preview,
    });
    
 toast.success("Image uploaded")
  } catch (err: any) {
    toast.info(err.message); 
  }
};

const handleGallery = async (files: FileList | null) => {
  if (!files) return;

  const folder = "product";

  for (const file of Array.from(files)) {
    try {
      // 🔍 Validate before upload
      await validateImage(file, {
        maxSizeMB: 2,
        maxWidth: 400,
        maxHeight: 600,
        ratio: 400 / 600,
      });

      const { preview, fileKey } = await upload(file, folder);

      setGallery((prev) => [...prev, { key: fileKey, preview }]);
       toast.success("Image uploaded")
    } catch (err: any) {
     toast.info(err.message); 
   
    }
  }
};


  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!validatePrices(e.currentTarget)) return;

  const formData = new FormData(e.currentTarget);

 
  const product = await createProduct(formData);
  const productId = product.id;

   
// attach category
if (selectedCategory) {
  await attachProductCategory(productId, selectedCategory);
}
  const payload = Object.entries(productAttributes)
    .map(([attribute, { value }]) => ({
      attribute,
      value: value.trim(),
    }))
    .filter((a) => a.value.length > 0);

  if (payload.length > 0) {
    await saveProductAttributes(productId, payload);
  }

  router.push("/admin/product");
};


  return (
    <div className="max-w-full ">
     <form onSubmit={handleCreateProduct}>

        <Card className="m-1">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Main product details</CardDescription>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-8">

            <div className="space-y-5">

            <div className="grid md:grid-cols-2 gap-4">
  <div className="space-y-2">
    <Label>Product Name</Label>
    <Input name="name" required />
  </div>

  <div className="space-y-2">
    <Label>SKU</Label>
    <Input
      name="sku"
    />
  </div>
</div>


              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input name="price"  type="number" min={0}    required />
                </div>


                <div className="space-y-2">
                  <Label>Strike through Price</Label>
                  <Input name="strikethroughPrice"  type="number" min={0}    />
                  {priceError && (
                    <p className="text-sm text-destructive">{priceError}</p>
                  )}
                </div>

              </div>


              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea name="description" className="min-h-32" />
              </div>

      <div className="flex items-center justify-between border rounded-lg p-4">
  <div className="space-y-1">
    <p className="font-medium">In Stock</p>
    <p className="text-xs text-muted-foreground">
      Customers can purchase this product
    </p>
  </div>
  <Switch checked={isInStock} onCheckedChange={setIsInStock} />
  <input type="hidden" name="isInStock" value={String(isInStock)} />
</div>


    <div className="space-y-2 pl-1">
  <Label>Category</Label>

  <Select onValueChange={(v) => setSelectedCategory(v)}>
    <SelectTrigger className="h-10">
      <SelectValue placeholder="Select category" />
    </SelectTrigger>

    <SelectContent>
      {categories.map((cat) => (
        <SelectItem key={cat.id} value={cat.id}>
          {cat.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>


            </div>


            <div className="space-y-3">
              <Label>Banner Image</Label>

              <div
                onClick={() => bannerRef.current?.click()}
                className="border-4  max-w-xl border-dashed rounded-xl h-72 flex items-center justify-center cursor-pointer hover:bg-muted/40 relative"
              >
                {!banner && (
                  <div>
                    <div className="p-6 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                      <ImagePlus size={68} className="text-primary" />
                    </div>
                    <p className="mt-3 text-sm font-semibold">Upload images</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                  </div>
                )}

                {banner && (
                  <img src={banner.preview} className="w-full h-full object-contain" />
                )}

                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                    <Loader2 className="animate-spin" />
                  </div>
                )}
              </div>

              <input
                ref={bannerRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleBanner(e.target.files?.[0])}
              />

              {banner && (
                <input type="hidden" name="bannerImage" value={banner.key} />
              )}
            </div>

          </CardContent>
        </Card>

<GallerySection
  gallery={gallery}
  galleryRef={galleryRef}
  handleGallery={handleGallery}
  setGallery={setGallery}
/>


<AttributeSection
  productAttributes={productAttributes}
  handleValueChange={handleValueChange}
/>



        <div className="flex m-6 justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/product")}>
            Cancel
          </Button>
          <Button type="submit">
            Create Product
          </Button>
        </div>

      </form>
    </div>
  );
}
