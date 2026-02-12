"use client";

import React, { useRef, useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, ImagePlus, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/helper/index";;
import { useFileUpload } from "@/helper/useFileUpload";



type ImageItem = {
  key: string;
  preview: string;
};

export default function AddProductForm() {

  const router = useRouter();
  // const BASE = process.env.NEXT_PUBLIC_S3_BASE_URL!;

  const { upload, uploading } = useFileUpload();


  const [isActive, setIsActive] = useState(true);
  const [banner, setBanner] = useState<ImageItem | null>(null);
  const [gallery, setGallery] = useState<ImageItem[]>([]);

  const bannerRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [priceError, setPriceError] = useState<string | null>(null);



  const validatePrices = (form: HTMLFormElement) => {
    const price = Number((form.elements.namedItem("price") as HTMLInputElement).value);
    const stp = Number((form.elements.namedItem("strikethroughPrice") as HTMLInputElement).value);

    if (stp >= price) {
      setPriceError("Strike through price must be less than price");
      return false;
    }

    setPriceError(null);
    return true;
  };

  const handleBanner = async (file?: File) => {
    if (!file) return;
    const folder = 'product'
    const { preview, fileKey } = await upload(file, folder);

    setBanner({
      key: fileKey,
      preview,
    });
  };


  const handleGallery = async (files: FileList | null) => {
    if (!files) return;
    const folder = 'product'
    for (const file of Array.from(files)) {
      const { preview, fileKey } = await upload(file, folder);

      setGallery(prev => [...prev, { key: fileKey, preview }]);
    }
  };


  return (
    <div className="max-w-6xl mx-auto p-1">
      <form action={createProduct} onSubmit={(e) => {
        if (!validatePrices(e.currentTarget)) {
          e.preventDefault();
        }
      }} className="space-y-8">


        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Main product details</CardDescription>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-8">

            <div className="space-y-5">

              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input name="name" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input name="price"  type="number" min={0}    required />
                </div>


                <div className="space-y-2">
                  <Label>Strike through Price</Label>
                  <Input name="strikethroughPrice"  type="number" min={0}   required />
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
                  <p className="font-medium">Active</p>
                  <p className="text-xs text-muted-foreground">
                    Visible to customers
                  </p>
                </div>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
                <input type="hidden" name="isActive" value={String(isActive)} />
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
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
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

        <Card>
          <CardHeader>
            <CardTitle>Product Gallery</CardTitle>
            <CardDescription>Additional product images</CardDescription>
          </CardHeader>

          {/* Main Container: Grid layout for side-by-side split */}
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            <div className="lg:col-span-4 w-full">
              <div
                onClick={() => galleryRef.current?.click()}
                className="flex flex-col items-center justify-center border-3 border-dashed border-muted-foreground/20 rounded-xl h-48 hover:bg-muted/50 transition-all cursor-pointer group"
              >
                <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                  <ImagePlus size={32} className="text-primary" />
                </div>
                <p className="mt-3 text-sm font-semibold">Upload images</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <input
              ref={galleryRef}
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={(e) => handleGallery(e.target.files)}
            />

            <div className="lg:col-span-8 w-full">
              {gallery.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((img, i) => (
                    <div key={i} className="relative group aspect-square border rounded-lg overflow-hidden bg-muted">
                      <img
                        src={img.preview}
                        className="h-full w-full object-cover"
                        alt="preview"
                      />

                      <div className="absolute inset-0  opacity-100 transition-opacity flex items-center justify-center">
                        <Button


                          onClick={() => setGallery(prev => prev.filter((_, x) => x !== i))}

                          className="cursor-pointer absolute top-1 right-1 bg-black/60 text-white rounded px-2 py-1 opacity-100"

                        >

                          <X size={14} />

                        </Button>
                      </div>

                      <input type="hidden" name="media" value={img.key} />
                    </div>
                  ))}
                </div>
              ) : (
                /* Placeholder for right side when empty */
                <div className="h-48 flex flex-col items-center justify-center border rounded-xl border-muted bg-muted/10 text-muted-foreground">
                  <p className="text-sm">No images selected</p>
                </div>
              )}
            </div>

          </CardContent>
        </Card>


        <div className="flex justify-end gap-4">
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
