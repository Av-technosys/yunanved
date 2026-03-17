/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useTransition } from "react";
import { getAddresses, saveAddress, deleteAddress } from "@/helper";
// import { tempUserId } from "@/const/globalconst";

import {Breadcrumb} from "@/components/dashboard";
import {AddressList} from "@/components/dashboard";
import {AddressForm} from "@/components/dashboard";

import { useClientSideUser } from "@/hooks/getClientSideUser";

import { AddressListSkeleton } from "./addressSkeleton";

export default function AddressPage() {
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [addresses, setAddresses] = useState<any[]>([]);
  const [form, setForm] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  const {userDetails} = useClientSideUser();

  const tempUserId = userDetails?.id;

  useEffect(() => {
    if (!tempUserId) return;
    loadAddresses();
  }, [tempUserId]);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const data = await getAddresses(tempUserId)

        if (Array.isArray(data)) {
          setAddresses(data)
        } else {
          setAddresses([])
        }
    } catch (error) {
      console.error(error);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return <AddressListSkeleton />;
  }

  return (
    <div className="relative  w-full">


      {/* ADDRESS LIST VIEW */}
      {view === "list" ? (
        addresses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center mt-6">
            <p className="text-lg font-semibold text-gray-700">
              No Address Found
            </p>

            <p className="text-sm text-gray-400 mb-6">
              You haven't added any address yet.
            </p>

            <button
              onClick={handleAdd}
              className="px-6 py-3 rounded-xl bg-[#1D4E4E] text-white hover:bg-[#143a3a]"
            >
              Add Address
            </button>
          </div>
        ) : (
          <AddressList
            addresses={addresses}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )
      ) : (
        /* ADDRESS FORM */
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
