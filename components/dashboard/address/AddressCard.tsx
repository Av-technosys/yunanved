"use client";

import {
  Home,
  Briefcase,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Address = {
  id: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};

type Props = {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
};

export default function AddressCard({
  address,
  onEdit,
  onDelete,
}: Props) {
  const fullAddress = [
    address.addressLine1,
    address.addressLine2,
    address.city,
    address.state,
    address.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={`relative p-5 rounded-2xl border-2 shadow-md transition-all
        ${
          address.isDefault
            ? "border-blue-400 bg-blue-50/40"
            : "border-gray-100 hover:border-blue-400"
        }
      `}
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3">
        {address.isDefault ? (
          <Home size={18} className="text-[#1D4E4E]" />
        ) : (
          <Briefcase size={18} className="text-[#1D4E4E]" />
        )}

        <span className="font-bold text-[#1D4E4E] text-lg">
          {address.isDefault ? "Primary Address" : "Saved Address"}
        </span>
      </div>

      {/* BODY */}
      <div className="text-sm text-gray-600 mb-6">
        <p className="text-gray-800 leading-relaxed">
          {fullAddress}
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center pt-4 border-t">
        <span className="text-[11px] font-bold text-blue-600">
          {address.isDefault ? "Primary Delivery" : ""}
        </span>

        <div className="flex gap-3 text-gray-400">
          <button
            onClick={() => onEdit(address)}
            className="hover:text-blue-500 transition-colors"
            aria-label="Edit address"
          >
            <Pencil size={18} />
          </button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="hover:text-red-500 transition-colors"
                aria-label="Delete address"
              >
                <Trash2 size={18} />
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete address?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="rounded-full bg-red-500 hover:bg-red-600"
                  onClick={() => onDelete(address.id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}