/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { createReturnRequest } from "@/helper";
import { validateImage } from "@/helper/image/validateImage";
import { useFileUpload } from "@/helper/useFileUpload";

export function ReturnModal({ item }: any) {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const { upload } = useFileUpload();

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;

    if (images.length + files.length > 5) {
      toast.error("Max 5 images allowed");
      return;
    }

    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        await validateImage(file, {
          maxSizeMB: 2,
          maxWidth: 1000,
          maxHeight: 1000,
          ratio: 1,
        });

        const { preview, fileKey } = await upload(file, "return");

        setImages((prev) => [...prev, { key: fileKey, preview }]);

      } catch (err: any) {
        toast.error(err.message);
      }
    }

    setUploading(false);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const submitReturn = async () => {
    const finalReason = reason === "Other" ? customReason : reason;

    if (!finalReason) {
      toast.error("Please provide a reason");
      return;
    }

    if (!images.length) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      const res: any = await createReturnRequest({
        orderItemId: item.id,
        reason: finalReason,
        images: images.map((i) => i.key),
      });

      if (res?.success) {
        toast.success("Return request submitted");

         startTransition(() => {
         window.location.reload();
        } );

      } else {
        toast.error(res?.error || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-blue-600 text-sm hover:underline">
          Return
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>
          <AlertDialogTitle>Return Item</AlertDialogTitle>
          <AlertDialogDescription>
            Select reason and upload product images
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* 🔽 Reason */}
        <Select value={reason} onValueChange={setReason}>
          <SelectTrigger>
            <SelectValue placeholder="Select reason" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Damaged product">Damaged product</SelectItem>
            <SelectItem value="Wrong item received">Wrong item received</SelectItem>
            <SelectItem value="Not as expected">Not as expected</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        {/* ✍️ Custom reason */}
        {reason === "Other" && (
          <Textarea
            placeholder="Enter reason"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        )}

        {/* 📸 Upload UI */}
        <div className="mt-4">

          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">

            <span className="text-sm text-gray-500">
              Click to upload images
            </span>

            <span className="text-xs text-gray-400">
              Max 5 images • JPG/PNG • 2MB each
            </span>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleUpload(e.target.files)}
              className="hidden"
            />

          </label>

        </div>

        {/* 🖼 Preview */}
        <div className="flex gap-3 mt-4 flex-wrap">

          {images.map((img, i) => (
            <div key={i} className="relative">

              <img
                src={img.preview}
                className="w-20 h-20 rounded-lg object-cover border"
              />

              {/* ❌ remove */}
              <button
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5"
              >
                ×
              </button>

            </div>
          ))}

        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={uploading}
            onClick={submitReturn}
          >
            {uploading ? "Uploading..." : "Submit Request"}
          </AlertDialogAction>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}