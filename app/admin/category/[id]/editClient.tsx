/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateCategory } from "@/helper/index";
import { getAllCategoriesMeta } from "@/helper/category/action";
import { useFileUpload } from "@/helper/useFileUpload";
import { toast } from "sonner";

export default function EditCategory({ categoryInfo }: any) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, uploading } = useFileUpload();



  const [form, setForm] = useState({
    name: categoryInfo.name,
    parent: categoryInfo.parentId ?? "",
    description: categoryInfo.description ?? ""
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [selectedParent, setSelectedParent] = useState<string>(
    categoryInfo.parrentId ?? "",
  );
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategoriesMeta();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const [preview, setPreview] = useState<string | null>(
    categoryInfo.bannerImage ?? null,
  );

  const handleFileChange = async (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (file) {
      const folder = "category";
      const { preview, fileKey } = await upload(file, folder);

      setPreview(fileKey);
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const categoryData = {
      id: categoryInfo.id,
      name: form.name,
      parentId: selectedParent,
      description: form.description,
      bannerImage: preview,
    };

    const response = await updateCategory(categoryData);
    if (response?.success == true) {
      toast.success(response.message ?? "Category updated successfully");
      router.push("/admin/category");
    } else {
      toast.error(response?.message ?? "Failed to update category");
    }
  };

  return (
    <div className="w-full p-1">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900">
            Manage Category
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Update category details and visibility.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => submitHandler(e)}>
            {/* CRITICAL: send required values to server action */}
            <input type="hidden" name="id" value={categoryInfo.id} />
            <input type="hidden" name="parentId" value={selectedParent} />
           

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Left column */}
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium">
                    Category Name
                  </Label>
                  <Input
                    name="name"
                    defaultValue={categoryInfo.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium">
                    Parent Category
                  </Label>
                  <Select
                    value={selectedParent}
                    onValueChange={(value) => setSelectedParent(value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select parent" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium">
                    Description
                  </Label>
                  <Textarea
                    name="description"
                    defaultValue={categoryInfo.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="min-h-[140px] resize-none"
                  />
                </div>
              </div>

              {/* Right column */}
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
                    className="border-2 border-dashed border-slate-200 rounded-xl p-10 flex items-center justify-center bg-white hover:bg-slate-50/50 transition-colors cursor-pointer min-h-[220px]"
                  >
                    {preview ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${preview}`}
                        alt="Category"
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
                    onChange={(e) => handleFileChange(e.target.files?.[0])}
                  />
                </div>

               
              </div>
            </div>

            <div className="flex justify-end gap-4 px-0 pt-10">
              <Button
                type="button"
                onClick={() => router.push("/admin/category")}
                variant="outline"
                className="px-12 h-11 rounded-full"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="px-12 h-11 rounded-full bg-[#2D5A5D] hover:bg-[#234749] text-white"
              >
                Update
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
