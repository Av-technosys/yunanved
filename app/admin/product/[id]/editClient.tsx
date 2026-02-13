/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState, useEffect } from "react";
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

import {
  saveProductAttributes,
  updateProduct,
  getCategories,
  getProductCategory,
  updateProductCategory,
} from "@/helper/index";

import { useFileUpload } from "@/helper/useFileUpload";
import { validateImage } from "@/helper/image/validateImage";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PRODUCT_ATTRIBUTES } from "@/const/productAttribute";
import GallerySection from "../GallerySection";
import AttributeSection from "../AttributeSection";

type ImageItem = { key: string; preview: string };
type AttributeValue = { id?: string; value: string };

export default function EditProduct({ productInfo, media, attributes }: any) {

  const router = useRouter();
  const { upload } = useFileUpload();

  const BASE = process.env.NEXT_PUBLIC_S3_BASE_URL!;
  const toPublic = (key: string | null) => key ? `${BASE}/${key}` : null;


  const [gallery, setGallery] = useState<ImageItem[]>(
    media.map((m: any) => ({
      key: m.mediaURL,
      preview: `${BASE}/${m.mediaURL}`,
    }))
  );

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [bannerKey, setBannerKey] = useState<string | null>(productInfo.bannerImage);
  const [preview, setPreview] = useState<string | null>(toPublic(productInfo.bannerImage));
  const [uploading, setUploading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  const baseAttributes = Object.fromEntries(
    PRODUCT_ATTRIBUTES.flatMap(group =>
      group.elements.map(el => [el, { id: undefined, value: "" }])
    )
  );

  const existingAttributes = Object.fromEntries(
    (attributes || []).map((a: any) => [
      a.attribute,
      { id: a.id, value: a.value }
    ])
  );

  const [productAttributes, setProductAttributes] =
    useState<Record<string, AttributeValue>>({
      ...baseAttributes,
      ...existingAttributes,
    });

  const [isActive, setIsActive] = useState(!productInfo.isDeleted);
  const [priceError, setPriceError] = useState<string | null>(null);



  useEffect(() => {
    async function load() {
      const cats = await getCategories();
      setCategories(cats);

      const current = await getProductCategory(productInfo.id);
      if (current) setSelectedCategory(current.categoryId);
    }
    load();
  }, [productInfo.id]);

  /* ---------------- HANDLERS ---------------- */

  function handleValueChange(attribute: string, value: string, id?: string) {
    setProductAttributes(prev => ({
      ...prev,
      [attribute]: { id: prev[attribute]?.id ?? id, value },
    }));
  }

  const validatePrices = (form: HTMLFormElement) => {
    const price = Number((form.elements.namedItem("price") as HTMLInputElement).value);
    const stp = Number((form.elements.namedItem("strikethroughPrice") as HTMLInputElement).value);

    if (!stp) return true;

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
      await validateImage(file, { maxSizeMB: 2, maxWidth: 400, maxHeight: 600, ratio: 400 / 600 });

      setUploading(true);

      const tempPreview = URL.createObjectURL(file);
      setPreview(tempPreview);

      const { fileKey } = await upload(file, "product");

      setBannerKey(fileKey);
      setPreview(toPublic(fileKey));

      URL.revokeObjectURL(tempPreview);

      toast.success("Banner uploaded");

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };


  const handleGallery = async (files: FileList | null) => {
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        await validateImage(file, { maxSizeMB: 2, maxWidth: 400, maxHeight: 600, ratio: 400 / 600 });

        const { preview, fileKey } = await upload(file, "product");
        setGallery(prev => [...prev, { key: fileKey, preview }]);

        toast.success(`${file.name} uploaded`);

      } catch (err: any) {
        toast.error(`${file.name}: ${err.message}`);
      }
    }
  };


  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePrices(e.currentTarget)) return;

    const formData = new FormData(e.currentTarget);

    gallery.forEach(img => formData.append("existingMedia", img.key));

    await updateProduct(formData);

    if (selectedCategory)
      await updateProductCategory(productInfo.id, selectedCategory);

    const payload = Object.entries(productAttributes)
      .map(([attribute, { value }]) => ({ attribute, value: value.trim() }))
      .filter(a => a.value.length > 0);

    await saveProductAttributes(productInfo.id, payload);

    router.push("/admin/product");
  };


  return (
    <div className="max-w-full">
      <form onSubmit={handleUpdateProduct} className="space-y-6">

        <input type="hidden" name="id" value={productInfo.id} />
        <input type="hidden" name="isActive" value={String(isActive)} />
        {bannerKey && <input type="hidden" name="bannerImage" value={bannerKey} />}

        {/* BASIC INFO */}
        <Card className="m-1">
          <CardHeader>
            <CardTitle>Manage Product</CardTitle>
            <CardDescription>Edit product information</CardDescription>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-10">

            <div className="space-y-5">

              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input name="name" defaultValue={productInfo.name} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input name="price" type="number" defaultValue={productInfo.basePrice} required />
                </div>

                <div className="space-y-2">
                  <Label>StrikethroughPrice</Label>
                  <Input name="strikethroughPrice" type="number" defaultValue={productInfo.strikethroughPrice} />
                  {priceError && <p className="text-sm text-destructive">{priceError}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea name="description" defaultValue={productInfo.description} className="min-h-32" />
              </div>

              <div className="flex items-center justify-between border rounded-lg p-4">
                <Label>Active</Label>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory ?? undefined} onValueChange={setSelectedCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </div>

            {/* BANNER */}
            <div className="space-y-3">
              <Label>Banner Image</Label>
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed rounded-xl h-72 flex items-center justify-center cursor-pointer relative overflow-hidden"
              >
                {!preview && <ImagePlus />}
                {preview && <img src={preview} className="w-full h-full object-contain" />}
                {uploading && <Loader2 className="absolute animate-spin" />}
              </div>

              <input ref={fileRef} type="file" hidden accept="image/*"
                onChange={(e) => handleBanner(e.target.files?.[0])}
              />
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


<div className="flex justify-end gap-4 m-6">

  <Button
    type="button"
    variant="outline"
    onClick={() => router.push("/admin/product")}
  >
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
