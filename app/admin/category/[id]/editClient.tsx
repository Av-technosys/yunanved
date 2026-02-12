/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { updateCategory } from "@/helper/index";

export default function EditCategory({ categoryInfo }: any) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: categoryInfo.name,
    parent: categoryInfo.parentId ?? "",
    description: categoryInfo.description ?? "",
    isActive: categoryInfo.isActive ?? false,
  });

  const [preview, setPreview] = useState<string | null>(
    categoryInfo.bannerImage ?? null,
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
            Manage Category
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Update category details and visibility.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={updateCategory}>

            {/* CRITICAL: send required values to server action */}
            <input type="hidden" name="id" value={categoryInfo.id} />
            <input type="hidden" name="parentId" value={form.parent ?? ""} />
            <input type="hidden" name="isActive" value={form.isActive ? "true" : "false"} />

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
                    value={form.parent}
                    onValueChange={(value) =>
                      setForm({ ...form, parent: value })
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select parent" />
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
                        src={preview}
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

                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium">
                    Visibility Status
                  </Label>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Active
                      </p>
                      <p className="text-xs text-slate-400">
                        Category is visible to customers
                      </p>
                    </div>
                    <Switch
                      checked={form.isActive}
                      onCheckedChange={(v) => setForm({ ...form, isActive: v })}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                  </div>
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
