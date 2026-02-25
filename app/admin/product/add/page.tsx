/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ImagePlus, Loader2, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/helper/index";
import { useFileUpload } from "@/helper/useFileUpload";
import { validateImage } from "@/helper/image/validateImage";
import { toast } from "sonner";

import GallerySection from "../GallerySection";
import AttributeSection from "../AttributeSection";
import { MultiCategorySelect } from "@/components/multiCategorySelect";

type ImageItem = {
  key: string;
  preview: string;
};

type AttributeValue = {
  id?: string;
  value: string;
};

type Variant = {
  id: string;
  name: string;
  sku: string;
  price: number;
  strikethroughPrice: number;
  description: string;
  banner: ImageItem | null;
  gallery: ImageItem[];
  attributes: Record<string, AttributeValue>;
  isInStock: boolean;
};

export default function AddProductForm() {
  const router = useRouter();
  const { upload, uploading } = useFileUpload();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [variants, setVariants] = useState<Variant[]>([{
    id: crypto.randomUUID(),
    name: "",
    sku: "",
    price: 0,
    strikethroughPrice: 0,
    description: "",
    banner: null,
    gallery: [],
    attributes: {},
    isInStock: true
  }]);

  const [activeIndex, setActiveIndex] = useState(0);

  const bannerRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  const addVariant = () => {
    const newVariant: Variant = {
      id: crypto.randomUUID(),
      name: variants[0]?.name || "", // Default to first variant's name as a base
      sku: "",
      price: variants[0]?.price || 0,
      strikethroughPrice: variants[0]?.strikethroughPrice || 0,
      description: variants[0]?.description || "",
      banner: null,
      gallery: [],
      attributes: { ...variants[0]?.attributes },
      isInStock: true
    };
    setVariants([...variants, newVariant]);
    setActiveIndex(variants.length);
  };

  const removeVariant = (index: number) => {
    if (variants.length === 1) {
      toast.error("At least one variant is required");
      return;
    }
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
    if (activeIndex >= newVariants.length) {
      setActiveIndex(newVariants.length - 1);
    }
  };

  const updateVariant = (index: number, updates: Partial<Variant>) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], ...updates };
    setVariants(newVariants);
  };

  const handleAttributeChange = (attribute: string, value: string) => {
    const currentAttributes = variants[activeIndex].attributes;
    updateVariant(activeIndex, {
      attributes: {
        ...currentAttributes,
        [attribute]: { value }
      }
    });
  };

  const handleBanner = async (file?: File) => {
    if (!file) return;

    try {
      await validateImage(file, {
        maxSizeMB: 2,
        maxWidth: 400,
        maxHeight: 600,
        ratio: 400 / 600,
      });

      const res = await upload(file, "product");
      if (res && res.fileKey) {
        updateVariant(activeIndex, {
          banner: { key: res.fileKey, preview: res.preview }
        });
        toast.success("Image uploaded");
      } else {
        toast.error("Failed to get file key after upload.");
      }
    } catch (err: any) {
      toast.info(err.message);
    }
  };

  const handleGallery = async (files: FileList | null) => {
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        await validateImage(file, {
          maxSizeMB: 2,
          maxWidth: 400,
          maxHeight: 600,
          ratio: 400 / 600,
        });

        const res = await upload(file, "product");
        if (res && res.fileKey) {
          const currentGallery = variants[activeIndex].gallery;
          updateVariant(activeIndex, {
            gallery: [...currentGallery, { key: res.fileKey, preview: res.preview }]
          });
          toast.success("Image uploaded");
        }
      } catch (err: any) {
        toast.info(err.message);
      }
    }
  };

  const setGalleryForActive = (action: React.SetStateAction<ImageItem[]>) => {
    const currentGallery = variants[activeIndex].gallery;
    const nextGallery = typeof action === "function" ? (action as any)(currentGallery) : action;
    updateVariant(activeIndex, {
      gallery: nextGallery
    });
  };

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }

    const formData = new FormData();
    selectedCategories.forEach((catId) => formData.append("category[]", catId));

    const payload = variants.map(v => ({
      name: v.name,
      sku: v.sku,
      description: v.description,
      price: v.price,
      strikethroughPrice: v.strikethroughPrice,
      bannerImage: v.banner?.key,
      media: v.gallery.map(g => g.key),
      isInStock: v.isInStock,
      attributes: Object.entries(v.attributes)
        .map(([attr, val]) => ({ attribute: attr, value: val.value }))
        .filter(a => a.value.trim().length > 0)
    }));

    formData.append("variants", JSON.stringify(payload));

    try {
      await createProduct(formData);
      toast.success("Product and variants created successfully");
      router.push("/admin/product");
    } catch (err) {
      toast.error("Failed to create product");
    }
  };

  const activeVariant = variants[activeIndex];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <form onSubmit={handleCreateProduct}>
        <div className="flex justify-between items-center bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-10 py-4 border-b">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
            <p className="text-muted-foreground">Define your product and its variants.</p>
          </div>
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/product")}>
              Cancel
            </Button>
            <Button type="submit">
              Create Product
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Sidebar - Global Config & Variants List */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <MultiCategorySelect
                  selectedCategories={selectedCategories}
                  onCategoriesChange={setSelectedCategories}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm">Variants</CardTitle>
                <Button type="button" size="sm" variant="ghost" onClick={addVariant}>
                  <Plus size={16} />
                </Button>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-1">
                  {variants.map((v, i) => (
                    <div
                      key={v.id}
                      onClick={() => setActiveIndex(i)}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${activeIndex === i ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                    >
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium truncate">{v.name || "Unnamed Variant"}</span>
                        <span className="text-xs opacity-70">{v.sku || "No SKU"}</span>
                      </div>
                      {variants.length > 1 && (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-destructive-foreground hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeVariant(i);
                          }}
                        >
                          <Trash2 size={14} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Active Variant Editor */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Variant Details: {activeVariant.name || "New Variant"}</CardTitle>
                <CardDescription>Configure specific details for this product variant.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Variant Name</Label>
                    <Input
                      required
                      value={activeVariant.name}
                      onChange={(e) => updateVariant(activeIndex, { name: e.target.value })}
                      placeholder="e.g. Blue Small"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SKU</Label>
                    <Input
                      required
                      value={activeVariant.sku}
                      onChange={(e) => updateVariant(activeIndex, { sku: e.target.value })}
                      placeholder="SKU-123"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      required
                      min={0}
                      value={activeVariant.price}
                      onChange={(e) => updateVariant(activeIndex, { price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Strike through Price</Label>
                    <Input
                      type="number"
                      min={0}
                      value={activeVariant.strikethroughPrice}
                      onChange={(e) => updateVariant(activeIndex, { strikethroughPrice: Number(e.target.value) })}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Switch
                      checked={activeVariant.isInStock}
                      onCheckedChange={(checked) => updateVariant(activeIndex, { isInStock: checked })}
                    />
                    <Label>In Stock</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={activeVariant.description}
                    onChange={(e) => updateVariant(activeIndex, { description: e.target.value })}
                    className="min-h-32"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Banner Image</Label>
                  <div
                    onClick={() => bannerRef.current?.click()}
                    className="border-2 border-dashed rounded-xl h-48 flex items-center justify-center cursor-pointer hover:bg-muted/40 relative overflow-hidden"
                  >
                    {!activeVariant.banner ? (
                      <div className="flex flex-col items-center">
                        <ImagePlus size={32} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground mt-2">Upload Image</span>
                      </div>
                    ) : (
                      <img src={activeVariant.banner.preview} className="w-full h-full object-contain" />
                    )}
                    {uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                        <Loader2 className="animate-spin text-primary" />
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
                </div>
              </CardContent>
            </Card>

            <GallerySection
              gallery={activeVariant.gallery}
              galleryRef={galleryRef}
              handleGallery={handleGallery}
              setGallery={setGalleryForActive}
            />

            <AttributeSection
              productAttributes={activeVariant.attributes}
              handleValueChange={handleAttributeChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
