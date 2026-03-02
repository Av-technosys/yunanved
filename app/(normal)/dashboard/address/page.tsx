/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useTransition } from "react";
import { getAddresses, saveAddress, deleteAddress } from "@/helper";
import { tempUserId } from "@/const/globalconst";

import Breadcrumb from "@/components/dashboard/address/Breadcrumb";
import AddressList from "@/components/dashboard/address/AddressList";
import AddressForm from "@/components/dashboard/address/AddressForm";
import { Loader2 } from "lucide-react";

export default function AddressPage() {
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [addresses, setAddresses] = useState<any[]>([]);
  const [form, setForm] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    const data = await getAddresses(tempUserId);
    setAddresses(data);
  };

  const handleEdit = (addr: any) => {
    setForm(addr);
    setView("edit");
  };

  const handleAdd = () => {
    setForm(null);
    setView("add");
  };

  const handleSave = (data: any) => {
    startTransition(async () => {
      await saveAddress(tempUserId, data);
      await loadAddresses();
      setView("list");
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteAddress(id);
      await loadAddresses();
    });
  };

  return (
    <div className="w-full">

            {/* 🔥 LOADER OVERLAY */}
      {isPending && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex items-center justify-center w-full h-full">
      <Loader2
        className="h-12 w-12 text-[#1D4E4E] animate-spin"
        strokeWidth={2.5}
      />
    </div>
        </div>
      )}
      <Breadcrumb view={view} />

      {view === "list" ? (
        <AddressList
          addresses={addresses}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <AddressForm
          mode={view}
          initialData={form}
           addresses={addresses}   
          onCancel={() => setView("list")}
          onSave={handleSave}
        />
      )}
    </div>
  );
}