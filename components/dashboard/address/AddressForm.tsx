/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Address = {
  id?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  
};

type Props = {
  mode: "add" | "edit";
  initialData?: Address | null;
  addresses: Address[];
  onCancel: () => void;
  onSave: (data: Address) => void;
};

const emptyForm: Address = {
  id: undefined,
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

export default function AddressForm({
  mode,
  initialData,
  addresses,
  onCancel,
  onSave,
}: Props) {
  const [form, setForm] = useState<Address>(emptyForm);
  const currentDefault = addresses?.find((a) => a.isDefault);
  // 🔁 Sync when editing different address
  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id,
        addressLine1: initialData.addressLine1 ?? "",
        addressLine2: initialData.addressLine2 ?? "",
        city: initialData.city ?? "",
        state: initialData.state ?? "",
        pincode: initialData.pincode ?? "",
        isDefault: initialData.isDefault ?? false,
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const update = (key: keyof Address, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    // Basic validation guard
    if (
      !form.addressLine1 ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      return;
    }

    onSave(form);
  };

  return (
    <Card className="rounded-[24px] border-none shadow-sm p-8 md:p-10">
      {/* HEADER */}
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-[#1D4E4E]">
          {mode === "add" ? "Add New Address" : "Manage Address"}
        </h1>
      </header>

      {/* ADDRESS FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Field label="House / Street">
          <Input
            value={form.addressLine1}
            onChange={(e) =>
              update("addressLine1", e.target.value)
            }
            placeholder="House no, street name"
          />
        </Field>

        <Field label="Apartment / Landmark">
          <Input
            value={form.addressLine2}
            onChange={(e) =>
              update("addressLine2", e.target.value)
            }
            placeholder="Apartment, building, landmark"
          />
        </Field>

        <Field label="City">
          <Input
            value={form.city}
            onChange={(e) =>
              update("city", e.target.value)
            }
          />
        </Field>

        <Field label="State">
          <Input
            value={form.state}
            onChange={(e) =>
              update("state", e.target.value)
            }
          />
        </Field>

        <Field label="Pincode">
          <Input
            value={form.pincode}
            onChange={(e) =>
              update("pincode", e.target.value)
            }
          />
        </Field>
      </div>

      {/* PRIMARY FLAG */}
      <div className="mb-10 flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e) =>
            update("isDefault", e.target.checked)
          }
        />
        <Label>Set as primary delivery address</Label>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={onCancel}
          className="rounded-full"
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          className="rounded-full bg-[#1D4E4E] text-white"
        >
          {mode === "add" ? "Save Address" : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
}

/* Small reusable Field wrapper */
const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label className="text-sm font-semibold text-gray-700">
      {label}
    </Label>
    {children}
  </div>
);