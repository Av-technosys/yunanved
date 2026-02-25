/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useTransition } from "react";
import { getProfile, updateProfile } from "@/helper/index";
import { User, Phone, Mail, Camera, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { tempUserId } from "@/const";
import { useFileUpload } from "@/helper/useFileUpload";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";


export default function ProfilePage() {
  const { upload } = useFileUpload();

  const [form, setForm] = useState<any>(null);
  const [initial, setInitial] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  /* LOAD PROFILE */
  useEffect(() => {
    startTransition(async () => {
      const data = await getProfile(tempUserId);
      setForm(data);
      setInitial(data);
    });
  }, []);

  if (!form) return <div className="p-10 text-center"> <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
    <Loader2
      className="h-12 w-12 text-[#1D4E4E] animate-spin"
      strokeWidth={2.5}
    />
  </div>
  </div>;

  /* SAVE */
  function handleSave() {
    startTransition(async () => {
      await updateProfile(tempUserId, {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
      });
      toast.success("Profile updated");
      setInitial(form);
    });
  }

  /* CANCEL */
  function handleCancel() {
    setForm(initial);
  }

  const handleProfileUpload = async (files: FileList | null) => {
    if (!files) return;

    const file = files[0];

    try {
      const { fileKey } = await upload(file, "profile");

      setForm((prev: any) => ({
        ...prev,
        profileImage: fileKey,
      }));

      await updateProfile(tempUserId, {
        ...form,
        profileImage: fileKey,
      });

      toast.success("Profile image updated");
    } catch (err: any) {
      toast.error("Upload failed");
    }
  };

  const fullName = `${form.firstName} ${form.lastName}`.trim();
  return (
    <div className="w-full relative">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-[13px] text-gray-500 p-2">
        <span>Home</span> <ChevronRight size={12} />
        <span>Account</span> <ChevronRight size={12} />
        <span className="font-medium text-gray-800">Profile</span>
      </nav>

      <main className="bg-white rounded-[24px] p-8 md:p-6 shadow-sm border border-gray-100">

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-2xl font-bold text-[#1D4E4E]">
            Personal Information
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Update your personal details and contact information here
          </p>
        </header>

        {/* Avatar Section */}
        <div className="flex items-center gap-8 mb-12">

          <div className="relative">

            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 shadow-md border border-gray-200">
              {form.profileImage ? (
                <img
                  src={`${NEXT_PUBLIC_S3_BASE_URL}/${form.profileImage}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e: any) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#1D4E4E] text-white text-3xl font-bold">
                  {form.firstName?.[0]}
                  {form.lastName?.[0]}
                </div>
              )}
            </div>

            {/* Upload Trigger */}
            <button
              type="button"
              onClick={() =>
                document.getElementById("profile-upload")?.click()
              }
              className="absolute bottom-0 right-0 p-2 bg-[#1D4E4E] text-white rounded-full border-2 border-white shadow-md hover:scale-105 transition"
            >
              <Camera size={14} />
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              hidden
              id="profile-upload"
              onChange={(e) =>
                handleProfileUpload(e.target.files)
              }
            />
          </div>

          {/* User Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {fullName || "Unnamed User"}
            </h3>

            <p className="text-sm text-gray-400">
              Member since{" "}
              {new Date(form.memberSince).toLocaleDateString()}
            </p>

            <button
              type="button"
              onClick={() =>
                document.getElementById("profile-upload")?.click()
              }
              className="mt-1 text-sm font-semibold text-[#1D4E4E] hover:underline"
            >
              Change Profile Photo
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">

          <Input
            label="First Name"
            icon={<User size={18} />}
            value={form.firstName}
            onChange={(v: any) =>
              setForm({ ...form, firstName: v })
            }
          />

          <Input
            label="Last Name"
            icon={<User size={18} />}
            value={form.lastName}
            onChange={(v: any) =>
              setForm({ ...form, lastName: v })
            }
          />

          <Input
            label="Phone no."
            icon={<Phone size={18} />}
            value={form.phone}
            onChange={(v: any) =>
              setForm({ ...form, phone: v })
            }
          />

          <Input
            label="Email ID"
            icon={<Mail size={18} />}
            value={form.email}
            disabled
            verified
          />

        </div>

        <p className="text-[11px] text-gray-400 italic mb-10">
          Note:- To change your email address please connect to customer support
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-4">

          <button
            onClick={handleCancel}
            className="px-10 py-3 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-10 py-3 rounded-full bg-[#1D4E4E] text-white font-semibold hover:bg-[#153a3a] shadow-lg transition-all disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </main>
    </div>
  );
}

/* INPUT COMPONENT */

function Input({ label, icon, value, onChange, disabled, verified }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[14px] font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>

        <input
          type="text"
          value={value ?? ""}
          disabled={disabled}
          onChange={e => onChange?.(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1D4E4E]/10 focus:border-[#1D4E4E] outline-none transition-all disabled:bg-gray-50"
        />

        {verified && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#28A745] text-white text-[10px] font-bold rounded-md">
            Verified
          </span>
        )}
      </div>
    </div>
  );
}
