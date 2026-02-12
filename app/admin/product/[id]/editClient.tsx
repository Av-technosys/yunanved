/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/helper/index";;
import { useFileUpload } from "@/helper/useFileUpload";

type ImageItem = {
  key: string;
  preview: string;
};
export default function EditProduct({ productInfo, media, attributes }: any) {


  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const BASE = process.env.NEXT_PUBLIC_S3_BASE_URL!;
  const toPublic = (key: string | null) => key ? `${BASE}/${key}` : null;

  const [gallery, setGallery] = useState<ImageItem[]>(
    media.map((m: any) => ({
      key: m.mediaURL,
      preview: `${BASE}/${m.mediaURL}`,
    }))
  );
  const galleryRef = useRef<HTMLInputElement>(null);
  const { upload } = useFileUpload();
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

  const [isActive, setIsActive] = useState(!productInfo.isDeleted);
  const [bannerKey, setBannerKey] = useState<string | null>(productInfo.bannerImage);
  const [preview, setPreview] = useState<string | null>(toPublic(productInfo.bannerImage));
  const [uploading, setUploading] = useState(false);

  /* upload new banner */
  const handleBanner = async (file?: File) => {
    if (!file) return;

    setUploading(true);
    setPreview(URL.createObjectURL(file));
    const folder = 'product'
    const { fileKey } = await upload(file, folder);

    setBannerKey(fileKey);
    setPreview(toPublic(fileKey));
    setUploading(false);
  };



  const handleGallery = async (files: FileList | null) => {
    if (!files) return;
    const folder = "product";

    for (const file of Array.from(files)) {
      const { preview, fileKey } = await upload(file, folder);
      setGallery(prev => [...prev, { key: fileKey, preview }]);
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-1">
      <form action={updateProduct} onSubmit={(e) => {
        if (!validatePrices(e.currentTarget)) {
          e.preventDefault();
        }
      }} className="space-y-6">

        {/* IMPORTANT hidden fields */}
        <input type="hidden" name="id" value={productInfo.id} />
        <input type="hidden" name="isActive" value={String(isActive)} />
        {bannerKey && <input type="hidden" name="bannerImage" value={bannerKey} />}

        <Card>
          <CardHeader>
            <CardTitle>Manage Product</CardTitle>
            <CardDescription>Edit product information</CardDescription>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-10">

            {/* LEFT SIDE */}
            <div className="space-y-5">

              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input
                  name="name"
                  defaultValue={productInfo.name}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    name="price"
                    type="number"
                    defaultValue={productInfo.basePrice}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>StrikethroughPrice</Label>
                  <Input
                    name="strikethroughPrice"
                    type="number"
                    defaultValue={productInfo.strikethroughPrice}
                  />
                  {priceError && (
                    <p className="text-sm text-destructive">{priceError}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  defaultValue={productInfo.description}
                  className="min-h-32"
                />
              </div>

              <div className="flex items-center justify-between border rounded-lg p-4">
                <div>
                  <p className="font-medium">Active</p>
                  <p className="text-xs text-muted-foreground">
                    Visible to customers
                  </p>
                </div>

                <Switch
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
              </div>
            </div>

            {/* RIGHT SIDE — BANNER */}
            <div className="space-y-3">
              <Label>Banner Image</Label>

              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed rounded-xl h-72 flex items-center justify-center cursor-pointer hover:bg-muted/40 relative overflow-hidden"
              >
                {!preview && (
                  <div className="text-muted-foreground text-center">
                    <ImagePlus className="mx-auto mb-2" />
                    Upload image
                  </div>
                )}

                {preview && (
                  <>
                    <img
                      src={preview}
                      className="w-full h-full object-contain"
                    />

                    {uploading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                        <Loader2 className="animate-spin" />
                      </div>
                    )}
                  </>
                )}
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleBanner(e.target.files?.[0])}
              />
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



        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle> Product Attributes</CardTitle>
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push(`/admin/product/${productInfo.id}/attributes?edit=true`)}
            >
              {attributes?.length ? "Edit Attributes" : "Add Attributes"}

            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {attributes.map((attr: any) => (
              <div
                key={attr.id}
                className="grid grid-cols-2 gap-4 items-center "
              >
                <Label className="text-muted-foreground">
                  {attr.attribute}
                </Label>

                <Input
                  value={attr.value ?? ""}
                  readOnly
                  className="bg-muted/40 pointer-events-none"
                />
              </div>
            ))}
          </CardContent>
        </Card>


        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/product")}>
            Cancel
          </Button>

          <Button type="submit">
            Update Product
          </Button>
        </div>

      </form>
    </div>
  );
}
