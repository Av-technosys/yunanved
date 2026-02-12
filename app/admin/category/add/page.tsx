"use client";

import { useRef, useState } from "react";
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
import { createCategory } from "@/helper/index";;

export default function AddCategoryForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isActive, setIsActive] = useState(true);
  const [parentId, setParentId] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="w-full p-1">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900">
            Add Categories
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Organize your product hierarchy and manage structures.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={createCategory}>

            {/* IMPORTANT: bridge React state → FormData */}
            <input type="hidden" name="parentId" value={parentId} />
            <input type="hidden" name="isActive" value={isActive ? "true" : "false"} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

              {/* Left Column */}
              <div className="space-y-6">

                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium">
                    Category Name
                  </Label>
                  <Input
                    name="name"
                    placeholder="Enter Category Name"
                    className="h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium">
                    Parent Category
                  </Label>
                  <Select onValueChange={setParentId}>
                    <SelectTrigger className="h-11 text-slate-400">
                      <SelectValue placeholder="Select Parent Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium">
                    Description
                  </Label>
                  <Textarea
                    name="description"
                    placeholder="Enter Description"
                    className="min-h-[140px] resize-none"
                  />
                </div>

              </div>

              {/* Right Column */}
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

                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium">
                    Visibility Status
                  </Label>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold text-slate-700">
                        Active
                      </p>
                      <p className="text-xs text-slate-400">
                        Category is visible to customers
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

            <div className="flex justify-end gap-4 px-0 pt-10">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/category")}
                className="px-12 h-11 rounded-full border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="px-12 h-11 rounded-full bg-[#2D5A5D] hover:bg-[#234749] text-white"
              >
                Add
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
