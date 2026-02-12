/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { uploadFileToS3 } from "@/lib/uploadClient";

export function useFileUpload() {
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File, folder: any) => {
    setUploading(true);

    try {
      const preview = URL.createObjectURL(file);
      const { fileKey } = await uploadFileToS3(file , folder);

      return { preview, fileKey };
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading };
}
