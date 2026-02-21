/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import AddressCard from "../address/AddressCard";
import { Plus } from "lucide-react";

export default function AddressList({
  addresses,
  onAdd,
  onEdit,
  onDelete,
}: any) {
  return (
    <Card className="rounded-[24px] min-h-screen p-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {addresses.map((addr: any) => (
          <AddressCard
            key={addr.id}
            address={addr}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

        <button
          onClick={onAdd}
          className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed"
        >
          <Plus size={24} />
          Add New Address
        </button>
      </div>
    </Card>
  );
}